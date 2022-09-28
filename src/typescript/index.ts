import {Switch, SimpleSwitchConfig} from "./switch";

// Export the Switch class so that users of this code can create new Switches by
// calling new SimpleSwitch.Switch()
export {Switch};

/**
 * Finds all Switches within the existing HTML (at the time this is called)
 * and attempts to initialize them using the given options.
 */
export function init(options: SimpleSwitchConfig = {}) {
  const switches = document.querySelectorAll(
    "[data-type='simple-switch']:not(._simple-switch-checkbox)");

  for (const _switch of switches) {
    new Switch({
      element: _switch as HTMLInputElement,
      ...options,
    });
  }
}

/**
 * Toggles the given switch element.
 */
export function toggle(
  element: HTMLInputElement, newState: boolean|undefined = undefined) {
  if (typeof newState === "undefined" || !!element.checked !== newState) {
    // @ts-ignore: This is set up in the Switch construction.
    const ref = element["_simple-switch-ref"] as Switch;
    ref.toggle();
  }
}
