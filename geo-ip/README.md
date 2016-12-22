
# Geo IP

Demac Geo IP is a way to easily implement a sister store or (stores). Just drop the relevant files into both stores, configure the settings, and away you go.

## Features

Supports up to 3 sites by default. You can easily add more -- by editing the snippets and making the for loops loop through more items.

**Geo IP Redirect**

Will detect user's country using Geo-IP and redirect to the appropriate configured site.

**Whitelist**

You can "whitelist" URL paths on the primary site -- this will allow users to see certain pages when they would otherwise be redirected. Useful for linking all sister sites to one blog, or one app landing page, etc.

The whitelist field accepts a comma-separated list of Regular Expressions -- if you don't know how to use those, talk to someone who does.

**Store Switcher**

Provides a store switcher to override the Geo IP, allowing the user to select the store they want to shop on.

## Dependencies

Requires jQuery and jquery.cookie.js

## Installation

(Note: do each step for both stores)

1. add settings found in `config/settings_schema.json` into theme's `settings_schema.json`
2. configure settings as needed
3. ensure jquery, and jquery.cookie.js if needed, are being loade on the page
4. place all the files under `snippets/` into your project's `snippets/` directory
5. include `geoip-redirect-meta.liquid` in `<head>` tag, near the top
6. include `geoip-redirect-script.liquid` in `<head>` tag, after jquery
7. include `geoip-redirect-cover.liquid` in `<body>` tag, directly after it opens
8. if you're using the store switcher, include `geoip-redirect-switcher.liquid` wherever you want it on the page

## Configuration

Carefully follow the instructions in the theme settings for the configuration. All sites need the same configuration for the GeoIP to work properly.

**For example**

- You have two sites: Canada and US
- The Primary Domain field is `my-store.com`
- The Altenate Domain field is `my-store.ca`
- The Primary Hash field is `US`
- The Alternate Hash field is `CA`
- These settings should be the same on both stores

## Finally

We keep track of which clients use our Geo-IP service; when you implement this feature for a client, be sure to update our GeoIP doc!
