/**
 * Wrapper class that handles upgrading a standard HTMLElement checkbox into a
 * SimpleSwitch.
 */
export class Switch {

  static readonly CHECKED_CLASS_NAME = "on";
  static readonly FOCUSED_CLASS_NAME = "focus";
  static readonly DISABLED_CLASS_NAME = "_simple-switch_disabled";

  checked: boolean;
  disabled: boolean = false;

  readonly element: HTMLInputElement;
  readonly isMaterial: boolean;
  readonly matchSizeToFont: boolean;

  private track?: HTMLButtonElement;
  private handle?: HTMLSpanElement;
  private observer?: MutationObserver;

  constructor(config: SimpleSwitchConfig) {
    this.element = config.element! || document.querySelector(config.selector!);
    this.isMaterial =
      typeof config.material !== 'undefined' ? config.material : false;
    this.checked = this.element.checked;
    this.matchSizeToFont =
      typeof config.matchSizeToFont !== 'undefined'
        ? config.matchSizeToFont : false;

    // Override from property
    if (this.element.dataset.material
      && this.element.dataset.material === "true") {
      this.isMaterial = true;
    }

    // Actually create the elements that make up the Switch
    this.setup();
    // Create a back reference for accessing via JS
    // @ts-ignore: This is intentionally modifying the DOM representation here.
    this.element["_simple-switch-ref"] = this;
  }

  /**
   * Toggles the state of the Switch. Also takes care of making sure the
   * wrapped checkbox is also updated.
   */
  toggle() {
    this.checked = this.track!.classList.toggle(Switch.CHECKED_CLASS_NAME);
    this.syncState();
  }

  /**
   * Creates the elements that match up the Switch.
   */
  private setup() {
    this.track = document.createElement("button");
    this.handle = document.createElement("span");

    this.element.classList.add("_simple-switch-checkbox");
    this.track.classList.add("_simple-switch-track");
    this.handle.classList.add("handle");

    if (this.isMaterial) {
      this.track.classList.add("_material");
    }

    if (this.checked) {
      this.track.classList.add(Switch.CHECKED_CLASS_NAME);
    }

    // Syncronize disabled state
    this.checkboxDisabled(!!this.element.disabled);

    // The track itself, despite being a button, shouldn't be tabbed to.
    // Instead, when the original checkbox gains focus, this code will
    // update the track. This is so that screenreaders still read the
    // Switch as a checkbox.
    this.track.setAttribute("tabindex", "-1");

    this.bind();

    this.track.appendChild(this.handle);
    this.element.insertAdjacentElement('afterend', this.track);

    this.updateSize();
  }

  /**
   * Updates the size of the Switch to match the inherited font size. Only
   * works on browsers that support CSS variables.
   */
  private updateSize() {
    if (!this.matchSizeToFont) return;

    const _style = window.getComputedStyle(this.track!);
    // @ts-ignore: font-size is known to exist
    const inheritedFontSize = _style['font-size'];

    this.track!.style.setProperty('--simple-switch_size', inheritedFontSize);
  }

  /**
   * Takes care of binding all relevant events from the checkbox so that the
   * Switch can update itself when those events happen.
   */
  private bind() {
    this.track!.addEventListener(
      "click", this.handleTrackClick.bind(this), false);
    this.element.addEventListener(
      "focus", this.handleElementFocus.bind(this), false);
    this.element.addEventListener(
      "blur", this.handleElementBlur.bind(this), false);
    this.element.addEventListener(
      "click", this.handleElementClick.bind(this), false);

    // Bind changes to the attributes
    this.observer = new MutationObserver(this.handleMutation.bind(this));
    this.observer.observe(this.element, { attributes: true });
  }

  /**
   * Called automatically when the wrapped checkbox gains focus.
   */
  private checkboxFocused(e: FocusEvent) {
    this.track!.classList.add(Switch.FOCUSED_CLASS_NAME);
  }

  /**
   * Called automatically when the wrapped checkbox loses focus.
   */
  private checkboxBlurred(e: FocusEvent) {
    this.track!.classList.remove(Switch.FOCUSED_CLASS_NAME);
  }

  /**
   * Called automatically when the Switch track is clicked.
   */
  private trackClicked(e: MouseEvent) {
    this.toggle();
  }

  /**
   * Called automatically when the wrapped checkbox is clicked.
   */
  private checkboxToggled(e: MouseEvent) {
    this.toggle();
  }

  /**
   * Called automatically when the wrapped checkbox is disabled.
   */
  private checkboxDisabled(disabled: boolean) {
    this.disabled = disabled;

    if (this.disabled) {
      this.track!.classList.add(Switch.DISABLED_CLASS_NAME);
    } else {
      this.track!.classList.remove(Switch.DISABLED_CLASS_NAME);
    }
  }

  /**
   * Manages syncing the state between the Switch and the wrapped checkbox.
   */
  private syncState() {
    this.element.checked = this.checked;
    this.dispatchEvent();
  }

  /**
   * Dispatches relevant events for the element changing, trying to emulate
   * standard <input> elements as much as possible.
   */
  private dispatchEvent() {
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
    const changeEvent = new Event("change");
    this.element.dispatchEvent(changeEvent);
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event
    const inputEvent = new Event("input");
    this.element.dispatchEvent(inputEvent);
  }

  private handleTrackClick(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault();
      return;
    }
    this.trackClicked(e);
  }

  private handleElementFocus(e: FocusEvent) {
    this.checkboxFocused(e);
  }

  private handleElementBlur(e: FocusEvent) {
    this.checkboxBlurred(e);
  }

  private handleElementClick(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault();
      return;
    }

    this.checkboxToggled(e);
  }

  private handleMutation(mutations: MutationRecord[]) {
    mutations.forEach((mutation) => {
      if (mutation.type !== "attributes") {
        return;
      }
      // Check the modified attributeName is "disabled"
      if (mutation.attributeName === "disabled") {
        // @ts-ignore: target is definitely an HTMLElement here, not a Node.
        const disabled = !!mutation.target.attributes["disabled"];
        this.checkboxDisabled(disabled);
      }
    });
  }

}

/**
 * Config passed through to the constructor of a Switch.
 */
export interface SimpleSwitchConfig {
  /**
   * The HTMLElement representing the checkbox to upgrade. Either this or the
   * selector field MUST be present.
   */
  readonly element?: HTMLInputElement;
  /**
   * The CSS selector that specifies the checkbox to be upgraded. Either this or
   * the element field MUST be present.
   */
  readonly selector?: string;
  /**
   * Optional. Defaults to false. If true, will render the new Switch in a
   * Material Design-inspired look.
   */
  readonly material?: boolean;
  /**
   * Optional. Defaults to false. If true, will attempt to figure out the
   * implied font size for the Switch, and match its size to that font size.
   */
  readonly matchSizeToFont?: boolean;
}
