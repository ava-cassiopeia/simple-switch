/**
 * Wrapper class that handles upgrading a normal checkbox into a SimpleSwitch.
 */
export class Switch {

    /**
     * Constructor for a new Switch.
     *
     * @param {Object} config The configuration information for the new Switch.
     *
     * @param {HTMLElement} config.element The HTMLElement object repesenting
     *  the checkbox to upgrade. Either this or config.selector MUST be
     *  specified.
     *
     * @param {String} config.selector The CSS selector that specifies the
     *  checkbox to be upgraded. Either this or the config.element MUST be
     *  specified.
     *
     * @param {Boolean} config.material Defaults to false. If true, will render
     *  the new Switch in a Material Design-inspired look.
     *
     * @param {Boolean} config.matchSizeToFont Defaults to false. If true, will
     *  attempt to figure out the impled font size for the Switch, and match
     *  its size to that font size.
     */
    constructor(config) {
        // set/get basic properties from config or defaults
        this.element = config.element
            || document.querySelector(config.selector);
        this.isMaterial = typeof config.material !== 'undefined'
            ? config.material : false;
        this.checked = !!this.element.checked;
        this.matchSizeToFont = typeof config.matchSizeToFont !== 'undefined' ?
            config.matchSizeToFont : false;

        // override from property
        if(this.element.dataset.material
            && this.element.dataset.material === "true") {
            this.isMaterial = true;
        }

        // actually create the elements that make up the Switch
        this.setup();

        this.element["_simple-switch-ref"] = this
    }

    /**
     * Creates the elements that make up the Switch.
     */
    setup() {
        this.track = document.createElement("button");
        this.handle = document.createElement("span");

        this.element.classList.add("_simple-switch-checkbox");
        this.track.classList.add("_simple-switch-track");
        this.handle.classList.add("handle");

        if(this.isMaterial) {
            this.track.classList.add("_material");
        }

        if(this.checked) {
            this.track.classList.add(Switch.CHECKED_CLASS_NAME);
        }

        this.checkboxDisabled(!!this.element.disabled);

        // The track itself, despite being a button, shouldn't be tabbed to.
        // Instead, when the original checkbox gains focus, the Javascript will
        // update the track. This is so that screenreaders still read the
        // Switch as a checkbox.
        this.track.setAttribute("tabindex", -1);

        this.bind();

        this.track.appendChild(this.handle);
        this.element.insertAdjacentElement('afterend', this.track);

        this.updateSize();
    }

    /**
     * Updates the size of the Switch to match the inherited font size. Only
     * works on browsers that support CSS variables for now.
     */
    updateSize() {
        if(!this.matchSizeToFont) {
            return;
        }

        const _style = window.getComputedStyle(this.track);
        const inheritedFontSize = _style['font-size'];

        this.track.style.setProperty('--simple-switch_size', inheritedFontSize);
    }

    /**
     * Takes care of binding all relevant events from the checkbox so that the
     * Switch can update itself when those events happen.
     */
    bind() {
        this.track.addEventListener("click", this.handleTrackClick.bind(this), false);
        this.element.addEventListener("focus", this.handleElementFocus.bind(this), false);
        this.element.addEventListener("blur", this.handleElementBlur.bind(this), false);
        this.element.addEventListener("click", this.handleElementClick.bind(this), false);

        /** @private */
        // Bind changes to the attributes
        this.observer = new MutationObserver(this.handleMutation.bind(this));
        this.observer.observe(this.element, { attributes: true });
    }

    /**
     * Called automatically when the wrapped checkbox gains focus.
     *
     * @param {FocusEvent} e The focus event object.
     */
    checkboxFocused(e) {
        this.track.classList.add(Switch.FOCUSED_CLASS_NAME);
    }

    /**
     * Called automatically when the wrapped checkbox loses focus.
     *
     * @param {BlurEvent} e The blur event object.
     */
    checkboxBlurred(e) {
        this.track.classList.remove(Switch.FOCUSED_CLASS_NAME);
    }

    /**
     * Called automatically when the Switch track is clicked.
     *
     * @param {ClickEvent} e The click event object.
     */
    trackClicked(e) {
        this.toggle();
    }

    /**
     * Called automatically when the wrapped checkbox is clicked.
     *
     * @param {ClickEvent} e The click event object.
     */
    checkboxToggled(e) {
        this.toggle();
    }

    /**
     * Called automatically when the wrapped checkbox is disabled.
     *
     * @param {Boolean} disabled Whether the checkbox is now disabled
     */
    checkboxDisabled(disabled) {
        this.disabled = disabled;

        if (this.disabled) {
            this.track.classList.add(Switch.DISABLED_CLASS_NAME);
        } else {
            this.track.classList.remove(Switch.DISABLED_CLASS_NAME);
        }
    }

    /**
     * Toggles the state of the Switch. Also takes care of making sure the
     * wrapped checkbox is also updated.
     */
    toggle() {
        this.checked = this.track.classList.toggle(Switch.CHECKED_CLASS_NAME);

        this.syncState();
    }

    /**
     * Manages syncing the state between the Switch and the wrapped checkbox.
     */
    syncState() {
        this.element.checked = this.checked;
        this.dispatchEvent();
    }

    /**
     * Dispatches relevant events for the element changing, trying to emulate
     * natural <input> elements as much as possible.
     * @private
     */
    dispatchEvent() {
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
        const changeEvent = new Event("change");
        this.element.dispatchEvent(changeEvent);
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event
        const inputEvent = new Event("input");
        this.element.dispatchEvent(inputEvent);
    }

    handleTrackClick(e) {
        if (this.disabled) {
            e.preventDefault();
            return;
        }
        this.trackClicked(e);
    }

    handleElementFocus(e) {
        this.checkboxFocused(e);
    }

    handleElementBlur(e) {
        this.checkboxBlurred(e);
    }

    handleElementClick(e) {
        if (this.disabled) {
            e.preventDefault();
            return;
        }

        this.checkboxToggled(e);
    }

    handleMutation(mutations) {
        mutations.forEach((mutation) => {
            if (mutation.type !== "attributes") {
                return;
            }
            // Check the modified attributeName is "disabled"
            if (mutation.attributeName === "disabled") {
                const disabled = !!mutation.target.attributes["disabled"];
                this.checkboxDisabled(disabled);
            }
        });
    }

    static get CHECKED_CLASS_NAME() {
        return "on";
    }

    static get FOCUSED_CLASS_NAME() {
        return "focus";
    }

    static get DISABLED_CLASS_NAME() {
        return "_simple-switch_disabled";
    }
}
