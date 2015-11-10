
# Geo IP

Comet Geo IP is a way to easily implement a sister store. Just drop the relevant files into both stores, configure the settings, and away you go.

## Features

### Geo IP Redirect

Will detect user's country using Geo-IP and redirect to the appropriate configured site.

### Store Switcher

Provides a store switcher to override the Geo IP, allowing the user to select the store they want to shop on.

## Dependencies

Requires jQuery. Also requires jquery.cookie.js if you want to use the Store Switcher feature.

## IMPORTANT NOTE

This is not fully tested yet. Test it out first before slapping it into a project

## Installation

(Note: do each step for both stores)

1. add settings found in `config/settings_schema.json` into theme's `settings_schema.json`
2. configure settings as needed
3. place all the files under `snippets/` into your project's `snippets/` directory
4. include `geo-ip-redirect.liquid` in `<head>` tag, after jquery
5. include `geo-ip-redirect-cover.liquid` in `<body>` tag, directly after it opens
6. if you're using the store switcher, include `geo-ip-redirect-switcher.liquid` wherever you want it on the page

## TODO

Test