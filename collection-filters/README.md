
# Collection Filters

Some low-level, high-powered collection filters. The admin panel for these is very technical, but does things most other filters can't.

## TODO:

Need to have two options for front-end filters:

1. supports multiple filters at a time
2. supports only one filter at a time

We have the first, which is more complex; we need to roll out a simpler solution for the second option, just to have in the pocket.

## Features

**Automatic Tag Filtering**

Auto-populate your Filter Groups using tag prefixes. For example: `Brand Name_Toms`, `Color_Beige`, `Size_12`

**Granular Filtering by Collection**

Control exactly which Collections use which Filter Groups, and in which order

## Dependencies

Requires jQuery

## Installation

(Note: do each step for both stores)

1. add settings found in `config/settings_schema.json` into theme's `settings_schema.json`
2. configure settings as needed
3. ensure jQuery is being loaded on the page
4. place `snippets/collection-filters.liquid` into your project's `snippets/` directory
5. include `collection-filters.liquid` from your `collection.liquid` template
6. include the sass in `assets/collection-filters.scss` into your stylesheet by your preferred method

