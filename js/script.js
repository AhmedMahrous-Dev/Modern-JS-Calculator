let display = document.getElementById('display');
let historyDiv = document.getElementById('history');
let currentInput = "0";

function updateDisplay() {
    display.innerText = currentInput;
}

function append(val) {
    // منع تكرار النقطة العشرية
    if (val === '.' && currentInput.includes('.')) return;
    
    if (currentInput === "0" || currentInput === "Error") {
        currentInput = val;
    } else {
        currentInput += val;
    }
    updateDisplay();
}

// مسح كل شيء (AC)
function clearAll() {
    currentInput = "0";
    historyDiv.innerText = "";
    updateDisplay();
}

// مسح آخر خانة فقط (DEL)
function deleteLast() {
    if (currentInput === "Error" || currentInput.length <= 1) {
        currentInput = "0";
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

function toggleSign() {
    if (currentInput !== "0" && currentInput !== "Error") {
        currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput;
        updateDisplay();
    }
}

function calculate() {
    try {
        if (currentInput === "0") return;
        
        let expression = currentInput;
        let result = eval(expression);
        
        // التعامل مع الأرقام العشرية الطويلة
        if (!Number.isInteger(result)) {
            result = Math.round(result * 100000000) / 100000000;
        }
        
        historyDiv.innerText = expression + " =";
        currentInput = result.toString();
        updateDisplay();
    } catch (e) {
        currentInput = "Error";
        updateDisplay();
    }
}