export class Switch {

    constructor(config) {
        this.element = config.element || document.querySelector(config.selector);
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

        this.updateSize();
    }

    /**
     * Updates the size of the Switch to match the inherited font size.
     */
    updateSize() {
        const _style = window.getComputedStyle(this.track);
        const inheritedFontSize = _style['font-size'];

        this.track.style.setProperty('--simple-switch_size', inheritedFontSize);
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
        this.track.classList.add(Switch.FOCUSED_CLASS_NAME);
    }

    checkboxBlurred(e) {
        this.track.classList.remove(Switch.FOCUSED_CLASS_NAME);
    }

    trackClicked(e) {
        this.toggle();
    }

    checkboxToggled(e) {
        this.toggle();
    }

    toggle() {
        this.checked = this.track.classList.toggle(Switch.CHECKED_CLASS_NAME);

        this.element.checked = this.checked;
    }

    static get CHECKED_CLASS_NAME() {
        return "on";
    }

    static get FOCUSED_CLASS_NAME() {
        return "focus";
    }

}
