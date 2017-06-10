export class SimpleSwitch {

    constructor(config) {
        this.element = config.element;
        this.checked = false;

        this.setup();
    }

    setup() {
        this.track = document.createElement("button");
        this.handle = document.createElement("span");

        this.element.classList.add("_simple-switch-checkbox");
        this.track.classList.add("_simple-switch-track");
        this.handle.classList.add("handle");

        this.track.setAttribute("tabindex", -1);

        this.bind();

        this.track.appendChild(this.handle);
        this.element.insertAdjacentElement('afterend', this.track);
    }

    bind() {
        this.track.addEventListener("click", function(e) {
            this.trackClicked(e);
        }.bind(this), false);

        this.element.addEventListener("focus", function(e) {
            this.checkboxFocused(e);
        }.bind(this), false);

        this.element.addEventListener("blur", function(e) {
            this.checkboxBlurred(e);
        }.bind(this), false);

        this.element.addEventListener("click", function(e) {
            this.checkboxToggled(e);
        }.bind(this), false);
    }

    checkboxFocused(e) {
        this.track.classList.add("focus");
    }

    checkboxBlurred(e) {
        this.track.classList.remove("focus");
    }

    trackClicked(e) {
        this.toggle();
    }

    checkboxToggled(e) {
        this.toggle();
    }

    toggle() {
        this.checked = this.track.classList.toggle("on");

        this.element.checked = this.checked;
    }

}
