
# Homepage Slideshow

A customizable homepage slideshow

## Customizable Features

- Checkbox to enable/disable slideshow
- Up to four slideshow items (but more can be easily added)
- Checkbox to enable/disable individual slides
- Slide background image
- Slide heading
- Slide text
- Slide button text / URL

## Dependencies

- Slick Slider (js and scss)
- Foundation Grid

## Installation

1. add settings found in `config/settings_schema.json` into theme's `settings_schema.json`
2. configure settings as needed
3. place `snippets/hp-slideshow.liquid` into your project's `snippets/` directory
4. include `hp-slideshow.liquid` from your `index.liquid` template
5. drop `assets/jquery.hp-slideshow.js` into `src/js/lib/`
6. drop `assets/_hp-slideshow.scss` into `src/scss/snippets/`