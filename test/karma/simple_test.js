describe("SimpleSwitch", () => {
  afterEach(async () => {
    await this.cleanupTestingSwitches();
  });

  it("should be available in the browser", () => {
    expect(SimpleSwitch).toBeTruthy();
  });

  it("should have an init() function", () => {
    expect(SimpleSwitch.init).toBeTruthy();
    expect(typeof SimpleSwitch.init).toEqual("function");
  });

  it("should make the Switch class available", () => {
    expect(SimpleSwitch.Switch).toBeTruthy();
  });

  it("should attach correctly", async () => {
    const {simpleSwitch} = await createSwitch();
    expect(simpleSwitch).toBeTruthy();
  });

  describe(".Switch", () => {
    describe("instance", () => {
      it("should match initial element state", async () => {
        const {simpleSwitch, checkboxElement} = await createSwitch();
        expect(simpleSwitch.checked).toEqual(checkboxElement.checked);
      });
  
      it("should update when clicked", async () => {
        const {simpleSwitch, checkboxElement} = await createSwitch();
  
        expect(simpleSwitch.checked).toBe(false);
        expect(checkboxElement.checked).toBe(false);
        checkboxElement.click();
        await waitForAnimationFrame();
        expect(simpleSwitch.checked).toBe(true);
        expect(checkboxElement.checked).toBe(true);
      });
  
      it("should update when disabled", async () => {
        const {simpleSwitch, checkboxElement} = await createSwitch();
  
        expect(simpleSwitch.disabled).toBe(false);
        expect(checkboxElement.disabled).toBe(false);
        checkboxElement.disabled = true;
        await waitForAnimationFrame();
        expect(simpleSwitch.disabled).toBe(true);
        expect(checkboxElement.disabled).toBe(true);
      });
    });
  
    describe(".toggle()", () => {
      it("should toggle the element state", async () => {
        const {simpleSwitch, checkboxElement} = await createSwitch();
        expect(simpleSwitch.checked).toEqual(checkboxElement.checked);
        simpleSwitch.toggle();
        expect(simpleSwitch.checked).toBe(true);
        expect(simpleSwitch.checked).toEqual(checkboxElement.checked);
      });
    });
  });

  describe(".toggle()", () => {
    it("toggles the given Switch element", async () => {
      const {simpleSwitch, checkboxElement} = await createSwitch();

      expect(simpleSwitch.checked).toBe(false);
      SimpleSwitch.toggle(checkboxElement);
      await waitForAnimationFrame();
      expect(simpleSwitch.checked).toBe(true);
    });

    it("toggles the given Switch element to false", async () => {
      const {simpleSwitch, checkboxElement} = await createSwitch();

      expect(simpleSwitch.checked).toBe(false);
      SimpleSwitch.toggle(checkboxElement, false);
      await waitForAnimationFrame();
      expect(simpleSwitch.checked).toBe(false);
    });

    it("toggles the given Switch element to true", async () => {
      const {simpleSwitch, checkboxElement} = await createSwitch();

      expect(simpleSwitch.checked).toBe(false);
      SimpleSwitch.toggle(checkboxElement, true);
      await waitForAnimationFrame();
      expect(simpleSwitch.checked).toBe(true);
    });
  });

  describe(".init()", () => {
    it("inits all simple switches on the page", async () => {
      // create inner element
      const checkboxElementProto = document.createElement("input");
      checkboxElementProto.type = "checkbox";
      checkboxElementProto.setAttribute("data-type", "simple-switch");
      checkboxElementProto.classList.add("testing-checkbox");
      document.body.appendChild(checkboxElementProto);
      await waitForAnimationFrame();

      // verify inner element has not been init'd yet
      const checkboxElement = document.querySelector(".testing-checkbox");
      expect(checkboxElement.classList.contains("_simple-switch-checkbox"))
        .toBe(false);
      expect(checkboxElement["_simple-switch-ref"]).toBeFalsy();

      // actually initialize
      SimpleSwitch.init();
      await waitForAnimationFrame();

      // verify inner element is now init'd
      expect(checkboxElement.classList.contains("_simple-switch-checkbox"))
        .toBe(true);
      expect(checkboxElement["_simple-switch-ref"]).toBeTruthy();
    });
  });
});

async function createSwitch() {
  // First create the core element
  const checkboxElement = document.createElement("input");
  checkboxElement.type = "checkbox";
  checkboxElement.classList.add("testing-checkbox");

  document.body.appendChild(checkboxElement);
  await waitForAnimationFrame();

  const simpleSwitch = new SimpleSwitch.Switch({
    selector: ".testing-checkbox",
  });

  return {checkboxElement, simpleSwitch};
}

async function cleanupTestingSwitches() {
  const switches = document.querySelectorAll(".testing-checkbox");

  for (const switchEl of switches) {
    switchEl.remove();
  }

  await waitForAnimationFrame();
}

function waitForAnimationFrame() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      resolve();
    });
  });
}
