
# Geo IP

Comet Geo IP is a way to easily implement a sister store. Just drop the relevant files into both stores, configure the settings, and away you go.

## Features

**Geo IP Redirect**

Will detect user's country using Geo-IP and redirect to the appropriate configured site.

**Whitelist**

You can "whitelist" URL paths on a store -- this will allow users to see certain pages when they would otherwise be redirected. Useful for linking all sister sites to one blog, or one app landing page, etc.

**Store Switcher**

Provides a store switcher to override the Geo IP, allowing the user to select the store they want to shop on.

## Dependencies

Requires jQuery. Also requires jquery.cookie.js if you want to use the Store Switcher feature.

## Installation

(Note: do each step for both stores)

1. add settings found in `config/settings_schema.json` into theme's `settings_schema.json`
2. configure settings as needed
3. ensure jquery, and jquery.cookie.js if needed, are being loade on the page
4. place all the files under `snippets/` into your project's `snippets/` directory
5. include `geo-ip-redirect.liquid` in `<head>` tag, after jquery
6. include `geo-ip-redirect-cover.liquid` in `<body>` tag, directly after it opens
7. if you're using the store switcher, include `geo-ip-redirect-switcher.liquid` wherever you want it on the page

## Configuration

Carefully follow the instructions in the Theme Settings for the configuration. The general rule is: the sister sites will need matching information.

**For example**

- You have two sites: North America and Europe.
- The Primary Domain field is `my-na-store.com`
- The Secondary Domain field is `my-eu-store.com`
- These settings should be the same on both stores

The only two settings that _can_ be different are:

- This Store Is the Primary Store
- Redirect To Root

## Finally

We keep track of which clients use our Geo-IP service; when you implement this feature for a client, be sure to update our GeoIP doc!