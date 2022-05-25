describe("SimpleSwitch", function() {
    it("should be available globally", function() {
        assert(!!window.SimpleSwitch);
    });

    it("should have an init() function", function() {
        assert(!!window.SimpleSwitch.init
            && typeof window.SimpleSwitch.init === 'function');
    });

    it("should make the Switch class available", function() {
        assert(!!window.SimpleSwitch.Switch);
    });

    it("should have a toggle() function", function () {
        assert(!!window.SimpleSwitch.toggle)
    })
});

describe("Switch instance", function() {
    let dynamicSwitch = null;
    let dynamicCheckbox = null;

    beforeEach("generate dynamic switch", function() {
        const dynamicSwitchContainer
            = document.getElementById("dynamic-switch-container");

        // clear old Switch code, if any
        dynamicSwitchContainer.innerHTML = "";

        // create checkbox
        dynamicCheckbox = document.createElement("input");
        dynamicCheckbox.type = "checkbox";

        // create Switch
        dynamicSwitch = new SimpleSwitch.Switch({
            element: dynamicCheckbox
        });
    });

    it("should have an initial state that matches the element's state", function() {
        assert(dynamicSwitch.checked === dynamicCheckbox.checked);
    });

    it("should change checked state when the checkbox is clicked", function() {
        // grab the old state
        const oldState = dynamicCheckbox.checked;

        // click the actual checkbox
        dynamicCheckbox.click();

        // verify the Switch state is appropriate
        assert(dynamicSwitch.checked === (!oldState));
        assert(dynamicSwitch.checked === dynamicCheckbox.checked);
    });

    it("should be toggled via the toggle function", function() {
        // grab the old state
        const oldState = dynamicCheckbox.checked

        // Toggle the switch via JS
        SimpleSwitch.toggle(dynamicCheckbox)

        // verify the Switch state is appropriate
        assert(dynamicSwitch.checked === (!oldState))
        assert(dynamicSwitch.checked === dynamicCheckbox.checked)


        // Set the switch to off
        SimpleSwitch.toggle(dynamicCheckbox, false)

        // verify the Switch state is appropriate
        assert(dynamicSwitch.checked === false)
        assert(dynamicSwitch.checked === dynamicCheckbox.checked)


        // Set the switch to on
        SimpleSwitch.toggle(dynamicCheckbox, true)

        // verify the Switch state is appropriate
        assert(dynamicSwitch.checked === true)
        assert(dynamicSwitch.checked === dynamicCheckbox.checked)
    })
});
