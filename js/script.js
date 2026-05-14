let display = document.getElementById('display');
let historyDiv = document.getElementById('history');
let currentInput = "0";

function updateDisplay() {
    display.innerText = currentInput;
}

function append(val) {
    if (val === '.') {
        let parts = currentInput.split(/[\+\-\×\÷\*\/]/);
        let lastNumber = parts[parts.length - 1];

        if (lastNumber.includes('.')) return;
    }

    if (currentInput === "0" || currentInput === "Error") {
        if (val === '.') {
            currentInput = "0.";
        } else if (['+', '-', '×', '÷'].includes(val)) {
            currentInput = "0" + val; 
        } else {
            currentInput = val; 
        }
    } else {
        currentInput += val;
    }

    updateDisplay();
}

function clearAll() {
    currentInput = "0";
    historyDiv.innerText = "";
    updateDisplay();
}

function deleteLast() {
    if (currentInput === "Error" || currentInput.length <= 1) {
        currentInput = "0";
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

function calculate() {
    try {
        if (currentInput === "0") return;

        let calculation = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
        
        let result = eval(calculation);
        
        if (!Number.isInteger(result)) {
            result = Math.round(result * 100000000) / 100000000;
        }
        
        historyDiv.innerText = currentInput + " =";
        currentInput = result.toString();
        updateDisplay();
    } catch (e) {
        currentInput = "Error";
        updateDisplay();
    }
}

function toggleSign() {
    if (currentInput !== "0" && currentInput !== "Error") {
        
        if (currentInput.startsWith('-')) {
            currentInput = currentInput.slice(1);
        } else {
            currentInput = '-' + currentInput;
        }
        updateDisplay();
    }
}