describe("SimpleSwitch", function() {
    it("should be available globally", function() {
        assert(!!window.SimpleSwitch);
    });

    it("should have an init() function", function() {
        assert(!!window.SimpleSwitch.init && typeof window.SimpleSwitch.init === 'function');
    });

    it("should make the Switch class available", function() {
        assert(!!window.SimpleSwitch.Switch);
    });
});

describe("Switch instance", function() {
    const checkedInputElement = document.getElementById("simple-switch-input-checked");
    const uncheckedInputElement = document.getElementById("simple-switch-input-unchecked");

    let testSwitchChecked = new SimpleSwitch.Switch({
        element: checkedInputElement
    });

    let testSwitchUnchecked = new SimpleSwitch.Switch({
        element: uncheckedInputElement
    });

    it("should have an initial state that matches the element's state", function() {
        assert(checkedInputElement.checked === testSwitchChecked.checked
            && uncheckedInputElement.checked === testSwitchUnchecked.checked);
    });
});
