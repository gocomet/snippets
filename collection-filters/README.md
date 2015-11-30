
# Collection Filters

Some low-level, high-powered collection filters. The admin panel for these is very technical, but does things most other filters can't.

## Features

**Granular Tag Filtering**

Control exactly which tags your Filter Groups contain, and in which order they appear

**Granular Filtering by Collection**

Control exactly which Collections use which Filter Groups

## Dependencies

Requires jQuery, but only for the UI, which is not needed for the logic to function

## Installation

(Note: do each step for both stores)

1. add settings found in `config/settings_schema.json` into theme's `settings_schema.json`
2. configure settings as needed
3. ensure jquery, if needed, is being loaded on the page
4. place `snippets/collection-filters.liquid` into your project's `snippets/` directory
5. include `collection-filters.liquid` from your `collection.liquid` template
6. include the sass in `assets/collection-filters.scss` into your stylesheet by your preferred method