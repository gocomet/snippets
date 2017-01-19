# Desktop Newsletter Popup

A desktop newsletter popup.

## Dependencies

- Klaviyo form snippet (included inside this snippets folder @ /klaviyo-form)
- Use whatever form works for the project's ESP
- `src/js/main.js` is a file we use in Themeleon to initialize scripts and pass theme settings into them 
- Magnific Popup.  This is installed on Themeleon but may not be included in whatever theme you are using.

## Installation

1. place `snippets/newsletter-popup-desktop.liquid` into your project's snippets folder
2. place the contents of `layout/theme.liquid` into your project's `theme.liquid` file
3. place the contents of `config/settings_schema.json` into your project's `settings_schema.json` file
4. place `src/js/directives/desktopnewsletter.init.js` into your project's `src/js/directives` folder
5. place the contents of `src/js/main.js` into your project's `src/js/main.js` file
6. place `src/scss/snippets/_newsletter-popup-desktop.scss` into your project's `src/scss/snippets` folder - be sure @import it in `src/scss/css_shop.scss` as well!