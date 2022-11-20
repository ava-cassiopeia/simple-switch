# Simple Switch

[![npm version](https://badge.fury.io/js/a-simple-switch.svg)](https://badge.fury.io/js/a-simple-switch)
[![Build](https://github.com/ava-cassiopeia/simple-switch/actions/workflows/test.yml/badge.svg?branch=master)](https://github.com/ava-cassiopeia/simple-switch/actions/workflows/test.yml)

Simple, accessible, performant implementation of the Switch UI element.

![Demo gif of switch in both material and normal mode](https://user-images.githubusercontent.com/6314286/27511703-357cf59c-58e8-11e7-81b7-cf87b1a0408a.gif)<br />
*Above shows both the normal and 'material' mode available for the switch*

**Features:**

- Vanilla JS/CSS: doesn't require any outside library to function
- Accessible: works properly with screenreaders and the ARIA spec
- Performant: uses proper layering and transitioning to ensure high performance

---

- [Installation](#installation)
  - [Installing the Javascript](#installing-the-javascript)
  - [Installing the CSS](#installing-the-css)
  - [Installing the SASS](#installing-the-sass)
- [Creating a Simple Switch](#creating-a-simple-switch)
  - [Automatically Creating Switches](#automatically-creating-switches)
  - [Manually Creating Switches](#manually-creating-switches)
- [SASS Variables](#sass-variables)
- [Controlling the switch via JavaScript](#controlling-the-switch-via-javascript)
- [Contributing](#contributing)

## Installation

To install the Switch code, you will need to in some way include the Simple
Switch Javascript and CSS into your page/build. Please follow the relevant
instructions below for more information.

To get the latest minified/production ready files, please see the
[releases page](https://github.com/aeolingamenfel/simple-switch/releases).

### Installing the Javascript

The Javascript is available as a NPM package, buildable through Webpack, or as
a minified/uglified file that can be directly imported into the page.

The minified Javascript file is available on the
[releases page](https://github.com/aeolingamenfel/simple-switch/releases),
within the release `.zip` file, under `js/`.

---

Alternatively, the Webpack package can be installed by running:

```
npm i --save a-simple-switch
```

And then importing it into your webpack build by saying:

```Javascript
import * as SimpleSwitch from "a-simple-switch";
```

### Installing the CSS

You can install the CSS by downloading the compiled CSS file from the
[releases page](https://github.com/aeolingamenfel/simple-switch/releases),
under `css/`.

### Installing the SASS

You can import the relevant SASS file into your SASS build by either downloading
the latest release from the
[releases page](https://github.com/aeolingamenfel/simple-switch/releases) and
grabbing the SASS file from the `sass/` directory in the release, *or* you may
directly import it from the source code:

```SASS
@import "path/to/SimpleSwitch/src/sass/SimpleSwitch.scss";
```

## Creating a Simple Switch

There are two ways to create a Simple Switch. On page load, the Simple Switch
code will automatically detect checkboxes that are flagged as switches, and
upgrade them, *or* you may manually instantiate a switch. See below for more
details.

### Automatically Creating Switches

To have a switch be automatically upgraded, simply add the `data-type` attribute
to any checkbox-type input that you want upgraded, and set that attribute to the
value of `simple-switch`. Then, at the end of your `<body>` tag, simply call
`SimpleSwitch.init()` to initialize all of the switches marked as noted above.

In addition, the Switch has an additional "material" mode, which can be toggled
per switch using the `data-material` attribute.

*Example:*

Standard Switch:

```HTML
<input type="checkbox" name="my-checkbox" data-type="simple-switch" />
```

Material Switch:

```HTML
<input type="checkbox" name="my-checkbox" data-type="simple-switch" data-material="true" />
```

Javascript Setup:

```HTML
<!-- ^^ Rest of your page above ^^ -->
    <script type="text/javascript">
        SimpleSwitch.init();
    </script>
</body>
```

### Parameters

There are a few different parameters that can be provided to configure SimpleSwitch:

**Parameters:**

| Name | Index | Value | Default Value | Required? | Description |
| ---- | ----- | ----- | ------------- | --------- | ----------- |
| Element | `element` | HTMLElement | `null` | Yes* | This is the checkbox HTMLElement that will be upgraded to a Switch. Required if the `selector` parameter is not set |
| Selector | `selector` | String | `null` | Yes* | This is the CSS selector that specifies the checkbox HTMLElement that will be upgraded to a Switch. Required if the `element` parameter is not set |
| Material Style | `material` | Boolean | `false` | No | If set, will set the Switch to have an alternative style that matches the [Material.io spec](https://material.io/guidelines/components/selection-controls.html#selection-controls-switch) for Switches |
| Update Size from Font | `matchSizeToFont` | Boolean | `false` | No | If set, will cause the Switch to attempt to match its size to the font size of the containing element |

### Manually Creating Switches

You may also manually instantiate a switch, which may be useful for
lazily-loaded UI elements or parts of the page. The `Switch` class which handles
upgrading and controlling Switches is available under the `SimpleSwitch`
namespace.

*Example:*

HTML:

```HTML
<input type="checkbox" name="my-checkbox" id="my-checkbox" />
```

Javascript:

```Javascript
let myCheckbox = document.getElementById("my-checkbox");

new SimpleSwitch.Switch({
    element: myCheckbox,
    material: true
});
```

## SASS Variables

If you have chosen to include the SASS version of the styles for the Switch
into your project, there are a number of variables available to you to override
to customize the look and feel of the Switch. See more information about these
below.

| Name | Value | Default Value | Description |
| ---- | ----- | ------------- | ----------- |
| `$simple-switch_color` | Color | `#f44336` | Determines the color of the Switch, which isn't visible until the user has checked/switched "on" the switch |
| `$simple-switch_focus-color` | Color | `#03A9F4` | Determines the color that the outline around the Switch will be, where the outline only appears when the Switch gains focus |
| `$simple-switch_focus-ring-size` | Size Unit (px) | `7px` | On the Material version of the Switch, determines how much larger the radius of the focus ring is than the handle of the Switch |
| `$simple-switch_handle-color` | Color | `#fff` | Determines the color of the Switch's handle |
| `$simple-switch_outline-size` | Size Unit (px) | `3px` | Determines how thick the outline around the Switch's track is, both for the focus ring and the padding around the actual handle of the Switch |
| `$simple-switch_size` | Size Unit (px) | `12px` | By default, the Switch matches its size to the inherited `font-size` of the Switch, so that it can match any label/text next to it in terms of size. However, on older browsers that don't support CSS Variables, this is the fallback that the CSS goes to |
| `$simple-switch_switch-speed` | Timing Unit | `250ms` | The amount of time it takes the Switch animation to finish moving between the "on" and "off" state |
| `$simple-switch_tray-color` | Color | `#ccc` | The color of the tray of the Switch |

## Controlling the switch via JavaScript

The switch can be toggled via JavaScript:

```js
  SimpleSwitch.toggle(checkboxElement);
```

It can also be set specifically to on or off:

```js
  SimpleSwitch.toggle(checkboxElement, true);

  SimpleSwitch.toggle(checkboxElement, false);
```

## Contributing

Feel free to send pull requests, issues, feature requests, etc. There is no
SLA for responses on this repo, but I trying to respond to issues and PRs in a
timely manner.

When sending PRs please follow the Google TypeScript style guide
([style guide link](https://google.github.io/styleguide/tsguide.html)) and try
to add test coverage where possible.

Most of the codebase and NPM commands (like `npm test`) should work
out-of-the-box, but you will need Chrome installed to run headless tests.
