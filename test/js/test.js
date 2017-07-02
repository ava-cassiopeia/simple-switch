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

    it("should fail", function() {
        throw new Error("Yay, an error!");
    });
});
