# Simple Switch

[![npm version](https://badge.fury.io/js/a-simple-switch.svg)](https://badge.fury.io/js/a-simple-switch)

Simple, accessible, performant implementation of the Switch UI element.

<center>
![Demo gif of switch in both material and normal mode](https://user-images.githubusercontent.com/6314286/27013778-fe0c7776-4ea7-11e7-8420-0cd532d3fec6.gif)<br />
*Above shows both the normal and 'material' mode available for the switch*
</center>

**Features:**

  - Vanilla JS/CSS: doesn't require any outside library to function
  - Accessible: works properly with screenreaders and the ARIA spec
  - Performant: uses proper layering and transitioning to ensure high performance

---

  - [Statistics](#statistics)
  - [Installation](#installation)
    - [Installing the Javascript](#installing-the-javascript)
    - [Installing the CSS](#installing-the-css)
    - [Installing the SASS](#installing-the-sass)
  - [Creating a Simple Switch](#creating-a-simple-switch)
    - [Automatically Creating Switches](#automatically-creating-switches)
    - [Manually Creating Switches](#manually-creating-switches)

## Statistics

Below are the gzipped sizes of the source files. All measured using an Apache
server and Google Chrome.

| File | Size (after gzip) |
| ---- | ----------------- |
| `SimpleSwitch.css` | 860 bytes |
| `SimpleSwitch.min.js` | 1.6 kilobytes |

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

### Manually Creating Switches

You may also manually instantiate a switch, which may be useful for
lazily-loaded UI elements or parts of the page. The `Switch` class which handles
upgrading and controlling Switches is available under the `SimpleSwitch`
namespace. There are a few different parameters, outlined below.

**Parameters:**

| Name | Index | Value | Default Value | Required? | Description |
| ---- | ----- | ----- | ------------- | --------- | ----------- |
| Element | `element` | HTMLElement | `null` | Yes* | This is the checkbox HTMLElement that will be upgraded to a Switch. Required if the `selector` parameter is not set |
| Selector | `selector` | String | `null` | Yes* | This is the CSS selector that specifies the checkbox HTMLElement that will be upgraded to a Switch. Required if the `element` parameter is not set |
| Material Style | `material` | Boolean | `false` | No | If set, will set the Switch to have an alternative style that matches the [Material.io spec](https://material.io/guidelines/components/selection-controls.html#selection-controls-switch) for Switches |

*Example:*

HTML:
```HTML
<input type="checkbox" name="my-checkbox" id="my-checkbox" />
```

Javascript:
```Javascript
var myCheckbox = document.getElementById("my-checkbox");

new SimpleSwitch.Switch({
    element: myCheckbox,
    material: true
});
```
