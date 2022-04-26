import {Switch} from "./Switch.js";

// Export the Switch class so that users of this code can create new Switches by
// calling new SimpleSwitch.Switch()
export {Switch};

// Takes care of finding Switches within the site code.
export var init = function(options={}) {
    var x, _switch,
        switches = document.querySelectorAll(
            "[data-type='simple-switch']:not(._simple-switch-checkbox)"
        );

    for(x = 0; x < switches.length; x++) {
        _switch = switches[x];

        new Switch({
            element: _switch,
            ...options
        });
    }
};

// Toggles the switch element.
//   element is the checkbox element that SimpleSwitch is connected to
//   newState is optional. If given, it sets the switch to that state (as opposed to toggling it from its current value)
export const toggle = function (element, newState = undefined) {
    if (typeof newState === "undefined" || !!element.checked !== newState) {
        element["_simple-switch-ref"].toggle()
    }
}
