const display = document.querySelector(".display");
let lastOperation = false;
let lastStringIsOperation = false;

function append(char) {
    if (lastOperation) {
        display.value = '';
        lastOperation = false;
    }

    // Check if the last character is an operator
    if (isNaN(display.value[display.value.length - 1]) && display.value.length >= 1) {
        lastStringIsOperation = true;
    }

    // Prevent multiple operators in a row
    if (lastStringIsOperation && isNaN(char)) {
        lastStringIsOperation = isNaN(char); // Update flag before returning
        return;
    }

    display.value += char;
    lastStringIsOperation = isNaN(char); // Update flag if the character is an operator

    adjustFontSize(); // Adjust font size after appending
}

function operate() {
    try {
        let expression = display.value.replace(/÷/g, '/').replace(/x/g, '*');
        const result = eval(expression);
        display.value = result;
        lastOperation = true;
        adjustFontSize(); // Adjust font size after operation
    } catch (error) {
        setTimeout(() => alert('ERROR!'), 10);
        lastOperation = true;
    }
}

function clearD() {
    display.value = "";
    lastOperation = false;
    lastStringIsOperation = false;
    adjustFontSize(); // Adjust font size after clearing
}

function adjustFontSize() {
    const maxLength = 10; // Maximum number of characters before resizing
    const minFontSize = 20; // Minimum font size in pixels
    const maxFontSize = 50; // Maximum font size in pixels

    const length = display.value.length;
    const newSize = Math.max(minFontSize, maxFontSize - (length - maxLength) * 2);

    display.style.fontSize = `${newSize}px`;
}

