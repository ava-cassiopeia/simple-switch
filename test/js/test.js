describe("SimpleSwitch", function() {
    it("should be available globally", function() {
        assert(!!window.SimpleSwitch);
    });

    it("should have an init() function", function() {
        assert(!!window.SimpleSwitch.init && typeof window.SimpleSwitch.init === 'function');
    });
});

describe("Switch instance", function() {
    let inputElement = document.getElementById("simple-switch-test-input");
    let testSwitch = new SimpleSwitch.Switch({
        element: inputElement
    });

    it("should have an initial state that matches the element's state", function() {
        assert(testSwitch.checked === inputElement.checked);
    });
});
