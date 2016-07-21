/**
 * Gulpfile.js
 *
 * This Gulpfile uses Node v5.8!
 * Be sure your NVM is switched
 * to the correct node version
 *
 * (this file is written in ES6 -- it must be run in scrict mode)
 */
'use strict';

/**
 * load dependencies
 *
 * project settings
 * and npm modules
 */
let pkg				= require('./package.json');
let gulp			= require('gulp');
let gulpif 			= require('gulp-if');
let srcmaps 		= require('gulp-sourcemaps');
let sass 			= require('gulp-sass');
let autoprefixer 	= require('gulp-autoprefixer');
let cssbeautify 	= require('gulp-cssbeautify');
let cleancss		= require('gulp-clean-css');
let bless 			= require('gulp-bless');
let jshint 			= require('gulp-jshint');
let concat 			= require('gulp-concat');
let stripDebug 		= require('gulp-strip-debug');
let uglify 			= require('gulp-uglify');
let order 			= require('gulp-order');
let convert			= require('gulp-utf8-convert');
let headerfooter 	= require('gulp-headerfooter');
let imagemin 		= require('gulp-imagemin');
let pngquant 		= require('imagemin-pngquant');
let isProduction 	= pkg.environment === 'production';

/**
 * script constants
 */

// output filenames
const STYLESHEET_NAME 	= 'css_shop';
const JS_NAME 			= 'js_shop';

// relative paths
const DIR_GLOB 			= '**/*';
const SRC_PATH 			= 'src/';
const TEMP_PATH 		= 'tmp/';
const DEST_PATH 		= 'theme/assets';
const SCSS_PATH 		= SRC_PATH + 'scss/'; 
const JS_PATH 			= SRC_PATH + 'js/';

// ordered js globs
const SRC_JS = [
	JS_PATH + 'polyfills/*.js',
	JS_PATH + 'vendor/*.js',
	JS_PATH + 'lib/*.js',
	JS_PATH + 'directives/*.js',
	JS_PATH + 'app/*.js',
	JS_PATH + 'main.js'
];
const THEME_JS = [
	JS_PATH + 'vendor/theme/*.js',
	JS_PATH + 'vendor/theme/*.js.liquid'
];

// ordered scss globs
const THEME_SCSS = [
	SCSS_PATH + 'vendor/theme/*.css',
	SCSS_PATH + 'vendor/theme/*.css.liquid',
	SCSS_PATH + 'vendor/theme/*.scss',
	SCSS_PATH + 'vendor/theme/*.scss.liquid'
];

// image globs
const THEME_IMGS = [
	DEST_PATH + '/*.jpg',
	DEST_PATH + '/*.jpeg',
	DEST_PATH + '/*.png',
	DEST_PATH + '/*.gif',
	DEST_PATH + '/*.svg'
];

/**
 * gulp srcStyles task
 *
 * `gulp srcStyles`
 *
 * compile sass
 * from src folder
 *
 * used by `styles` task
 */
gulp.task('srcStyles', function() {
	
	return gulp.src(`${SCSS_PATH}${STYLESHEET_NAME}.scss`)
		
		// if we're not in production mode, prepare to output sass sourcemaps
		.pipe(gulpif(!isProduction, srcmaps.init()))

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
	    .pipe(gulpif(isProduction, cleancss({ compatibility: 'IE8' })))

	    // if we _are_ in production mode, bless our css (for full IE 9 support) and compress it
	    .pipe(gulpif(isProduction, bless({
	    	
	    	compress:true,
	    	force:true
	    
	    })))

	    // write the css file to our specified destination
	    .pipe(gulp.dest(`${TEMP_PATH}css`));
});

/** 
 * themeStyles task
 *
 * copy theme stylesheet over to tmp folder
 * to be concatenated into one final .liquid file
 *
 * used by `styles` task
 */
gulp.task('themeStyles', function() {

	return gulp.src(THEME_SCSS)

		.pipe(concat('theme.scss.liquid'))

		.pipe(gulp.dest(`${TEMP_PATH}css`));

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
	
	return gulp.src([`${TEMP_PATH}css/theme.scss.liquid`, `${TEMP_PATH}css/${STYLESHEET_NAME}.css`])

		.pipe(concat(`${STYLESHEET_NAME}.scss.liquid`))

		.pipe(headerfooter.header('@charset "utf-8";\n'))

		.pipe(convert({
			encNotMatchHandle: function(file) {
				console.log(file);
			}
		}))

		.pipe(gulp.dest(DEST_PATH));

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

	return gulp.src(THEME_JS)

		// take theme js/liquid files
		// concatenate into one
		// move into temp folder
		// to be further concatenated with our own files
		.pipe(concat('theme.js.liquid'))

		// output theme js to temp location to be concatenated
		// by scripts task
		.pipe(gulp.dest(`${TEMP_PATH}js`));

});

/**
 * gulp srcScripts task
 *
 * `gulp srcScripts`
 *
 * concatenate our source scripts together
 */
gulp.task('srcScripts', function() {
	
	return gulp.src(SRC_JS)
		
		// automatically order our scripts so that they'll compile and run properly
		.pipe(order(SRC_JS, {
			base: './'
		}))

		// js hinting for code standards
		.pipe(jshint())
		.pipe(jshint.reporter('default'))

		// if we're not in production mode, prepare to output sass sourcemaps
		.pipe(gulpif(!isProduction, srcmaps.init()))

		// concatenate all our js files into one file named js_shop.js
		.pipe(concat(JS_NAME + '.js'))

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
		.pipe(gulp.dest(`${TEMP_PATH}js`));

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

	return gulp.src([`${TEMP_PATH}js/theme.js.liquid`, `${TEMP_PATH}js/${JS_NAME}.js`])

		// final file name
		.pipe(concat(`${JS_NAME}.js.liquid`))

		// wrap entire script in IIFE
		.pipe(headerfooter('(function(){\n', '\n})();'))

		// output our js to our specified destination
		.pipe(gulp.dest(DEST_PATH));

});

/**
 * gulp images task
 *
 * `gulp images`
 *
 * compress all images in theme assets folder
 */
gulp.task('images', function() {

	return gulp.src(THEME_IMGS)

		.pipe(imagemin({
			
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		
		}))
		
		.pipe(gulp.dest(DEST_PATH));

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
	
		`${SRC_PATH}${DIR_GLOB}.css`,
		`${SRC_PATH}${DIR_GLOB}.css.liquid`,
		`${SRC_PATH}${DIR_GLOB}.scss`,
		`${SRC_PATH}${DIR_GLOB}.scss.liquid`
	
	], ['styles']);
	
	gulp.watch([
	
		`${SRC_PATH}${DIR_GLOB}.js`,
		`${SRC_PATH}${DIR_GLOB}.js.liquid`
	
	], ['scripts']);

});

/**
 * gulp compile task
 *
 * `gulp compile`
 *
 * compiles all scss, js, and compresses images
 * useful for forcing a production compile
 */
gulp.task('compile', function() {

	isProduction = true;
	gulp.start('styles', 'scripts', 'images');

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
	
	gulp.start('styles', 'scripts', 'images');
	gulp.start('watch');

});
