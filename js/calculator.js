// js/calculator.js

// DADOS DA CALCULADORA
let calcData = {
    display: '0',
    expression: '0',
    firstNum: null,
    operator: null,
    waitingForSecond: false
};

// FUNÇÕES DA CALCULADORA
function initCalculator() {
    console.log("Inicializando calculadora...");
    
    // Elementos da calculadora
    const calculator = document.getElementById('calculator');
    const openCalcBtns = document.querySelectorAll('.open-calc-btn'); // Seleciona TODOS os botões
    const closeCalcBtn = document.getElementById('close-calc');
    const minimizeCalcBtn = document.getElementById('minimize-calc');
    
    if (!calculator || openCalcBtns.length === 0) {
        console.error("Elementos da calculadora não encontrados!");
        return;
    }
    
    // Abrir calculadora - para TODOS os botões
    openCalcBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log("Abrindo calculadora...");
            calculator.classList.add('active');
        });
    });
    
    // Fechar calculadora
    closeCalcBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        calculator.classList.remove('active');
    });
    
    // Minimizar calculadora
    let minimized = false;
    minimizeCalcBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const buttons = calculator.querySelector('.calc-buttons');
        const display = calculator.querySelector('.calc-display');
        
        if (!minimized) {
            buttons.style.display = 'none';
            display.style.display = 'none';
            calculator.style.height = '60px';
            minimized = true;
        } else {
            buttons.style.display = 'grid';
            display.style.display = 'block';
            calculator.style.height = 'auto';
            minimized = false;
        }
    });
    
    console.log("Calculadora inicializada com múltiplos botões!");
}

function calcNumber(num) {
    if (calcData.waitingForSecond) {
        calcData.display = num.toString();
        calcData.waitingForSecond = false;
    } else {
        calcData.display = calcData.display === '0' ? num.toString() : calcData.display + num;
    }
    calcData.expression = calcData.display;
    updateCalcDisplay();
}

function calcOperator(op) {
    if (calcData.firstNum === null) {
        calcData.firstNum = parseFloat(calcData.display);
    } else if (calcData.operator && !calcData.waitingForSecond) {
        calcData.firstNum = calcCalculate();
        calcData.display = calcData.firstNum.toString();
    }
    calcData.operator = op;
    calcData.waitingForSecond = true;
    calcData.expression = `${calcData.firstNum} ${getOperatorSymbol(op)}`;
    updateCalcDisplay();
}

function calcEquals() {
    if (calcData.operator && calcData.firstNum !== null) {
        const result = calcCalculate();
        calcData.display = result.toString();
        calcData.expression = `${calcData.firstNum} ${getOperatorSymbol(calcData.operator)} ${calcData.display} =`;
        calcData.firstNum = null;
        calcData.operator = null;
        calcData.waitingForSecond = true;
        updateCalcDisplay();
    }
}

function calcClear() {
    calcData.display = '0';
    calcData.expression = '0';
    calcData.firstNum = null;
    calcData.operator = null;
    calcData.waitingForSecond = false;
    updateCalcDisplay();
}

function calcClearEntry() {
    calcData.display = '0';
    calcData.expression = '0';
    updateCalcDisplay();
}

function calcBackspace() {
    if (calcData.display.length > 1) {
        calcData.display = calcData.display.slice(0, -1);
    } else {
        calcData.display = '0';
    }
    calcData.expression = calcData.display;
    updateCalcDisplay();
}

function calcDecimal() {
    if (!calcData.display.includes('.')) {
        calcData.display += '.';
        calcData.expression = calcData.display;
        updateCalcDisplay();
    }
}

function calcSqrt() {
    calcData.display = Math.sqrt(parseFloat(calcData.display)).toString();
    calcData.expression = `√(${calcData.display})`;
    updateCalcDisplay();
}

function calcPower() {
    calcData.display = Math.pow(parseFloat(calcData.display), 2).toString();
    calcData.expression = `(${calcData.display})²`;
    updateCalcDisplay();
}

function calcPercent() {
    calcData.display = (parseFloat(calcData.display) / 100).toString();
    calcData.expression = `${calcData.display}%`;
    updateCalcDisplay();
}

function calcPi() {
    calcData.display = Math.PI.toString();
    calcData.expression = 'π';
    updateCalcDisplay();
}

function calcPlusMinus() {
    calcData.display = (-parseFloat(calcData.display)).toString();
    calcData.expression = calcData.display;
    updateCalcDisplay();
}

function calcCalculate() {
    const a = calcData.firstNum;
    const b = parseFloat(calcData.display);
    
    switch(calcData.operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        default: return b;
    }
}

function getOperatorSymbol(op) {
    switch(op) {
        case '+': return '+';
        case '-': return '−';
        case '*': return '×';
        case '/': return '÷';
        default: return op;
    }
}

function updateCalcDisplay() {
    const calcExpression = document.getElementById('calc-expression');
    const calcResult = document.getElementById('calc-result');
    
    if (calcExpression) calcExpression.textContent = calcData.expression;
    if (calcResult) calcResult.textContent = calcData.display;
}

// Exporta para Node.js (se necessário)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calcData,
        initCalculator,
        calcNumber,
        calcOperator,
        calcEquals,
        calcClear,
        calcClearEntry,
        calcBackspace,
        calcDecimal,
        calcSqrt,
        calcPower,
        calcPercent,
        calcPi,
        calcPlusMinus,
        calcCalculate,
        getOperatorSymbol,
        updateCalcDisplay
    };
}