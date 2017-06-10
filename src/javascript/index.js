import {SimpleSwitch} from "./SimpleSwitch.js";

export {SimpleSwitch};

export var init = function() {
    var x, _switch, switches = document.querySelectorAll("[data-type='simple-switch']");

    for(x = 0; x < switches.length; x++) {
        _switch = switches[x];

        new SimpleSwitch({
            element: _switch
        });
    }
};
