
# Build Script

- can be run from the command line
- Compiles your JS and Sass from the project src/ folder
- concatenates JS, Sass, CSS, and .liquid files from original theme files
- concatenates everything together, and places it in your theme/assets folder
- has two modes: production and development
- is configurable
- Runs on Node v5.8

## Before you start

Make sure you're running Node v5.8 using NVM, and that there is no node_modules/ file in your project dir. If there is, delete it.

## Installation

1. go to project directory
2. use node v5.8
3. delete `node_modules/` dir, if exists
4. drop `Gulpfile.js` and `package.json` into project root
5. create src/ folder and subfolders if they don't exist
6. run `sudo npm install` from project root

## Commands

- `gulp styles`: compiles stylesheets
- `gulp scripts`: compiles JS
- `gulp images`: compresses images in assets folder
- `gulp watch`: watches for changes in src folder, then compiles CSS and/or JS
- `gulp`: runs all four commands above, in sequence
- `gulp compile`: runs a production compile of stylesheets and JS, and compresses images

## Compiling Source JS and Sass

- this is the simple part that we're used to
- place your files under src/js and src/scss, respectively
- JS compiles in this order:
	- `/src/js/vendor/*`
	- `/src/js/lib/*`
	- `/src/js/directives/*`
	- `/src/js/app/*`
	- `/src/js/main.js`
- CSS compiles in the order you define it in your main Scss file, located here:
	- `/src/scss/${pkg.stylesheetName}.scss`

## Compiling Original Theme JS and Sass

- theme JS and Sass can be .liquid files and so must be separated
- theme JS and CSS files will be compiled regardless of the following file types:
	- `.css`
	- `.css.liquid`
	- `.scss`
	- `.scss.liquid`
	- `.js`
	- `.js.liquid`
- these still get automatically compiled with the rest of our CSS and JS
- place theme JS files in:
	- `/src/js/vendor/theme/`
- place theme CSS files in:
	- `/src/scss/vendor/theme/`
- do _not_ call the theme css files from your main sass file

## Ordering Theme JS and Sass files

We don't have much control over the order in which the theme JS and Sass files are compiled -- they're just compiled alphabetically.

To make sure a file is compiled before the others, just prefix it with an underscore. This is a good way to specify dependencies. For example:

In `/src/js/vendor/theme`:

- `_some.jquery.plugin.js`
- `_some.other.dependency.js`
- `theme.js.liquid`

(the same goes for the theme css files)

## Production vs. Development Compiles

The build script compiles our code differently depending on the environment it's run in.

**Development Compiles:**

- are beautified
- have sourcemaps
- are autoprefixed

**Production Compiles:**

- are minified/mangled
- have no sourcemaps
- have comments and debugging stripped out
- are "blessed"
- are autoprefixed

## Configuration

- configure your build in `/package.json`
- name your output Javascript file using the "javascriptName" property
	- this will compile to `/theme/assets/${javascriptName}.js.liquid`
- name your output Css file using the "stylesheetName" property
	- this will compile to `/theme/assets/${stylesheetName}.scss.liquid`
- to run the build in production mode: set the "environment" variable to "production"

## Dat's It

Dig into Gulpfile.js if you're interested in seeing exactly what it does -- there are comments.