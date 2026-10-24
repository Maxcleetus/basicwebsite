
const display = document.getElementById("display");

function appendValue(value) {
    if (display.value === "Error") {
        display.value = "0";
    }

    if (display.value === "0") {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    display.value = "0";
}

function deleteLast() {
    if (display.value === "Error") {
        display.value = "0";
        return;
    }

    display.value = display.value.slice(0, -1) || "0";
}

function calculate() {
    try {
        const expression = display.value;

        // Allow only numbers and basic arithmetic operators.
        if (!/^[0-9+\-*/.()\s]+$/.test(expression)) {
            throw new Error("Invalid expression");
        }

        const result = Function('"use strict"; return (' + expression + ')')();

        if (typeof result !== "number" || !Number.isFinite(result)) {
            throw new Error("Invalid result");
        }

        display.value = String(
            Math.round((result + Number.EPSILON) * 1e10) / 1e10
        );
    } catch {
        display.value = "Error";
    }
}
