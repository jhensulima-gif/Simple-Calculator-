const display = document.getElementById('display');

// Append value to display
function appendToDisplay(value) {
    if (display.value === '0' && value !== '.') {
        display.value = value;
    } else {
        display.value += value;
    }
}

// Clear display
function clearDisplay() {
    display.value = '0';
}

// Delete last character
function deleteLastChar() {
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = '0';
    }
}

// Calculate result
function calculateResult() {
    try {
        // Replace × with * and − with - for calculation
        const expression = display.value.replace(/×/g, '*').replace(/−/g, '-');
        const result = eval(expression);
        
        // Check if result is a valid number
        if (isNaN(result) || !isFinite(result)) {
            display.value = 'Error';
        } else {
            // Round to 10 decimal places to avoid floating point errors
            display.value = Math.round(result * 10000000000) / 10000000000;
        }
    } catch (error) {
        display.value = 'Error';
    }
}

// Allow keyboard input
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        event.preventDefault();
        appendToDisplay(key === '*' ? '×' : key === '-' ? '−' : key);
    } else if (key === '.') {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        event.preventDefault();
        calculateResult();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLastChar();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});

