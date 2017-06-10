# Simple Switch

Simple, accessible, performant implementation of the Switch UI element.

**Features:**

  - Vanilla JS/CSS: doesn't require any outside library to function
  - Accessible: works properly with screenreaders and the ARIA spec
  - Performant: uses proper layering and transitioning to ensure high performance

---

  - [Installation](#installation)
  - [Creating a Simple Switch](#creating-a-simple-switch)
    - [Automatically Creating Switches](#automatically-creating-switches)
    - [Manually Creating Switches](#manually-creating-switches)

## Installation

To install the Switch code, simply import the Javascript and CSS files present
into your page as needed. Make sure to place the Javascript code at the bottom
of the `<body>` tag.

## Creating a Simple Switch

There are two ways to create a Simple Switch. On page load, the Simple Switch
code will automatically detect checkboxes that are flagged as switches, and
upgrade them, *or* you may manually instantiate a switch. See below for more
details.

### Automatically Creating Switches

To have a switch be automatically upgraded, simply add the `data-type` attribute
to any checkbox-type input that you want upgraded, and set that attribute to the
value of `simple-switch`.

*Example:*

```HTML
<input type="checkbox" name="my-checkbox" data-type="simple-switch" />
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
