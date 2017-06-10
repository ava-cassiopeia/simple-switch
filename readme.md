# Simple Switch

Simple, accessible, performant implementation of the Switch UI element.

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
| `SimpleSwitch.css` | 785 bytes |
| `SimpleSwitch.min.js` | 1.4 kilobytes |

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

*Example:*

```HTML
<input type="checkbox" name="my-checkbox" data-type="simple-switch" />
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
namespace, and takes one parameter, `element`, which is a direct reference to
the HTMLElement checkbox to be upgraded.

*Example:*

```HTML
<input type="checkbox" name="my-checkbox" id="my-checkbox" />
```

```Javascript
var myCheckbox = document.getElementById("my-checkbox");

new SimpleSwitch.Switch({
    element: myCheckbox
});
```
