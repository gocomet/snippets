# Mobile Newsletter Popup

A mobile newsletter popup that complies with Googles standards.  Modified for Shopify from @alex's Magento verion by @jess

## Dependencies

- Klaviyo form snippet (included inside this snippets folder @ /klaviyo-form)
- Use whatever form works for the project's ESP

## Installation

1. place `snippets/newsletter-popup-mobile.liquid` into your project's snippets folder
2. place the contents of `layout/theme.liquid` into your project's `theme.liquid` file
3. place the contents of `config/settings_schema.json` into your project's `settings_schema.json` file
4. place `src/js/directives/mobilenewsletter.init.js` into your project's `src/js/directives` folder
5. place `src/scss/snippets/_newsletter-popup-mobile.scss` into your project's `src/scss/snippets` folder - be sure @import it in `src/scss/css_shop.scss` as well!