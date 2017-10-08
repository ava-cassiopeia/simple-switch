import {Switch} from "./Switch.js";

export {Switch};

export var init = function() {
    var x, _switch,
        switches = document.querySelectorAll("[data-type='simple-switch']");

    for(x = 0; x < switches.length; x++) {
        _switch = switches[x];

        new Switch({
            element: _switch
        });
    }
};
