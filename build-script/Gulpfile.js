/**
 * Gulpfile.js
 *
 * This Gulpfile uses Node v5.8!
 * Be sure your NVM is switched
 * to the correct node version
 */

/**
 * load dependencies
 *
 * project settings
 * and npm modules
 */
var pkg				= require('./package.json');
var gulp 			= require('gulp');
var gulpif 			= require('gulp-if');
var srcmaps 		= require('gulp-sourcemaps');
var sass 			= require('gulp-sass');
var autoprefixer 	= require('gulp-autoprefixer');
var cssbeautify 	= require('gulp-cssbeautify');
var cssminify		= require('gulp-minify-css');
var bless 			= require('gulp-bless');
var jshint 			= require('gulp-jshint');
var concat 			= require('gulp-concat');
var stripDebug 		= require('gulp-strip-debug');
var uglify 			= require('gulp-uglify');
var order 			= require('gulp-order');
var convert			= require('gulp-utf8-convert');
var headerfooter = require('gulp-headerfooter');

/**
 * script vars
 */
var isProduction = pkg.environment === 'production';
var pathToSrc = 'src/';
var pathToTmp = 'tmp/';
var pathToDest = 'theme/assets';
var pathToScss = pathToSrc + 'scss/'; 
var pathToJs = pathToSrc + 'js/';

var srcJs = [
	pathToJs + 'vendor/*.js',
	pathToJs + 'lib/*.js',
	pathToJs + 'directives/*.js',
	pathToJs + 'app/*.js',
	pathToJs + 'main.js'
];

var themeJs = [
	pathToJs + 'vendor/theme/*.js',
	pathToJs + 'vendor/theme/*.js.liquid'
];

var themeScss = [
	pathToScss + 'vendor/theme/*.css',
	pathToScss + 'vendor/theme/*.css.liquid',
	pathToScss + 'vendor/theme/*.scss',
	pathToScss + 'vendor/theme/*.scss.liquid'
];

/**
 * gulp srcStyles task
 *
 * `gulp srcStyles`
 *
 * compile sass
 * from src folder
 */
gulp.task('srcStyles', function() {
	
	return gulp.src(pathToScss + pkg.stylesheetName + '.scss')
		
		// if we're not in production mode, prepare to output sass sourcemaps
		.pipe(gulpif(!isProduction, srcmaps .init()))

		// compile node-sass (faster), regardless of environment
		.pipe(sass({
			errLogToConsole: true
		}))

		// again, if we're not in production mode, output sourcemap
		.pipe(gulpif(!isProduction, srcmaps.write()))

		// autoprefix our output css for full browser support
	    .pipe(autoprefixer('last 8 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))

	    // if we're not in production mode, beautify our css so it's nice and readable (for debugging)
	    .pipe(gulpif(!isProduction, cssbeautify()))

	    // if we _are_ in production mode,
	    // and in case bless won't run,
	    // compress the css
	    .pipe(gulpif(isProduction, cssminify()))

	    // if we _are_ in production mode, bless our css (for full IE 9 support) and compress it
	    .pipe(gulpif(isProduction, bless({
	    	
	    	compress:true,
	    	force:true
	    
	    })))

	    // write the css file to our specified destination
	    .pipe(gulp.dest('tmp/css'));
});

/** 
 * themeStyles task
 *
 * copy theme stylesheet over to tmp folder
 * to be concatenated into one final .liquid file
 */
gulp.task('themeStyles', function() {

	return gulp.src(themeScss)

		.pipe(concat('theme.scss.liquid'))

		.pipe(gulp.dest('tmp/css'));

});

/**
 * gulp styles task
 *
 * `gulp styles`
 *
 * concatenate our sass with theirs
 * use .liquid file extension just in case
 */
gulp.task('styles', ['srcStyles', 'themeStyles'], function() {
	
	return gulp.src(['tmp/css/theme.scss.liquid', 'tmp/css/' + pkg.stylesheetName + '.css'])

		.pipe(concat(pkg.stylesheetName + '.scss.liquid'))

		.pipe(headerfooter.header('@charset "utf-8";\n'))

		.pipe(convert({
			encNotMatchHandle: function(file) {
				console.log(file);
			}
		}))

		.pipe(gulp.dest(pathToDest));

});

/**
 * gulp themeScripts task
 *
 * `gulp themeScripts`
 *
 * concatenate theme scripts
 * which may use liquid
 */
gulp.task('themeScripts', function() {

	return gulp.src(themeJs)

		// take theme js/liquid files
		// concatenate into one
		// move into temp folder
		// to be further concatenated with our own files
		.pipe(concat('theme.js.liquid'))

		// output theme js to temp location to be concatenated
		// by scripts task
		.pipe(gulp.dest('tmp/js'));

});

/**
 * gulp srcScripts task
 *
 * `gulp srcScripts`
 *
 * concatenate our source scripts together
 */
gulp.task('srcScripts', function() {
	
	return gulp.src(srcJs)
		
		// js hinting for code standards
		.pipe(jshint())
		.pipe(jshint.reporter('default'))

		// automatically order our scripts so that they'll compile and run properly
		.pipe(order(srcJs))

		// if we're not in production mode, prepare to output sass sourcemaps
		.pipe(gulpif(!isProduction, srcmaps.init()))

		// concatenate all our js files into one file named js_shop.js
		.pipe(concat(pkg.javascriptName + '.js'))

		// again, if we're not in production mode, output sourcemap
		.pipe(gulpif(!isProduction, srcmaps.write()))

		// if we are in production mode,
		// strip out our console.logs and debugger statements
		.pipe(gulpif(isProduction, stripDebug()))

		// uglify or beatify our js,
		// depending on environment (production or develop)
		.pipe(uglify({
			
			mangle: isProduction,
			compress: isProduction,
			
			output: {
			
				beautify: !isProduction
			
			},
			
			preserveComments: !isProduction
		
		}))

		// output our js to our specified destination
		.pipe(gulp.dest(pathToDest));

});

/**
 * gulp scripts task
 *
 * `gulp scripts`
 *
 * concatenate our source scripts with our theme scripts
 * we do this because the theme scripts might be written in liquid
 * and our source scripts aren't
 * append .liquid file extension either way
 */
gulp.task('scripts', ['srcScripts', 'themeScripts'], function() {

	return gulp.src(['tmp/js/theme.js.liquid', 'tmp/js/' + pkg.javascriptName + '.js'])

		// final file name
		.pipe(concat(pkg.javascriptName + '.js.liquid'))

		// output our js to our specified destination
		.pipe(gulp.dest(pathToDest));

});

/**
 * gulp watch task
 *
 * `gulp watch`
 *
 * watches source folder for changes
 * and compiles scripts or styles onchange
 */
gulp.task('watch', function() {

	gulp.watch([
	
		pathToSrc + '**/*.css',
		pathToSrc + '**/*.css.liquid',
		pathToSrc + '**/*.scss',
		pathToSrc + '**/*.scss.liquid'
	
	], ['styles']);
	
	gulp.watch([
	
		pathToSrc + '**/*.js',
		pathToSrc + '**/*.js.liquid'
	
	], ['scripts']);

});

/**
 * gulp default task
 *
 * `gulp`
 *
 * compiles scripts and styles
 * then watches src folder
 */
gulp.task('default', function() {
	
	gulp.start('styles', 'scripts');
	gulp.start('watch');

});