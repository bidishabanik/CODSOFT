const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const themeToggle = document.querySelector(".theme-toggle");
const specialChars = ["%", "*", "/", "-", "+", "="];
const operators = ["*", "/", "-", "+", "%"];
let output = "";
let lastInputWasOperator = false;
let lastInputWasEquals = false;

// Theme management
const toggleTheme = (e) => {
  e.stopPropagation(); // Prevent event bubbling
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('calculatorTheme', isDark ? 'dark' : 'light');
};

const savedTheme = localStorage.getItem('calculatorTheme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
}

const safeEval = (expression) => {
  try {

    const sanitized = expression.replace(/[^0-9+\-*/.()%\s]/g, '');
    

    let processedExpression = sanitized;
    

    if (/\/\s*0(?!\d)/.test(processedExpression) || /%\s*0(?!\d)/.test(processedExpression)) {
      throw new Error("Division by zero");
    }
    

    const result = new Function('return ' + processedExpression)();
    

    if (!isFinite(result)) {
      throw new Error("Invalid calculation");
    }
    
    return result;
  } catch (error) {
    throw new Error("Error");
  }
};


const formatNumber = (num) => {
  if (num.toString().length > 12) {
    if (Math.abs(num) >= 1e12 || (Math.abs(num) < 1e-6 && num !== 0)) {
      return parseFloat(num.toPrecision(6)).toExponential();
    }
    return parseFloat(num.toPrecision(12));
  }
  return num;
};


const isValidInput = (btnValue) => {

  if (operators.includes(btnValue) && lastInputWasOperator) {
    return false;
  }
  

  if (btnValue === ".") {
    const lastNumber = output.split(/[+\-*/%]/).pop();
    if (lastNumber.includes(".")) {
      return false;
    }
  }
  

  if (output === "" && operators.includes(btnValue) && btnValue !== "-") {
    return false;
  }
  
  return true;
};

const calculate = (btnValue) => {
  try {
    if (btnValue === "=" && output !== "") {
      if (lastInputWasOperator) {

        output = output.slice(0, -1);
      }
      
      const result = safeEval(output);
      output = formatNumber(result).toString();
      lastInputWasEquals = true;
      lastInputWasOperator = false;
    } else if (btnValue === "AC") {
      output = "";
      lastInputWasOperator = false;
      lastInputWasEquals = false;
    } else if (btnValue === "DEL") {
      if (output.length > 0) {
        const lastChar = output.slice(-1);
        output = output.slice(0, -1);
        lastInputWasOperator = operators.includes(lastChar);
        lastInputWasEquals = false;
      }
    } else {

      if (lastInputWasEquals && !operators.includes(btnValue)) {
        output = "";
        lastInputWasEquals = false;
      }
      

      if (lastInputWasEquals && operators.includes(btnValue)) {
        lastInputWasEquals = false;
      }
      

      if (!isValidInput(btnValue)) {
        return;
      }
      

      if (lastInputWasOperator && operators.includes(btnValue)) {
        output = output.slice(0, -1) + btnValue;
      } else {
        output += btnValue;
      }
      
      lastInputWasOperator = operators.includes(btnValue);
    }
  } catch (error) {
    output = "Error";
    display.classList.add('error');
    setTimeout(() => display.classList.remove('error'), 1000);
    lastInputWasOperator = false;
    lastInputWasEquals = false;
  }
  
  display.value = output;
};


const handleKeyboard = (e) => {
  e.preventDefault();
  
  const key = e.key;
  const keyMap = {
    'Enter': '=',
    'Escape': 'AC',
    'Backspace': 'DEL',
    'Delete': 'AC',
    '.': '.',
    '+': '+',
    '-': '-',
    '*': '*',
    'x': '*',
    'X': '*',
    '/': '/',
    '%': '%',
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9'
  };
  
  if (keyMap[key]) {

    const buttonValue = keyMap[key];
    const button = document.querySelector(`button[data-value="${buttonValue}"]`);
    if (button) {
      button.classList.add('active');
      setTimeout(() => button.classList.remove('active'), 150);
    }
    
    calculate(buttonValue);
  }
};


buttons.forEach((button) => {
  if (button.hasAttribute('data-value')) {
    button.addEventListener("click", (e) => {
      calculate(e.target.dataset.value);
      // Remove focus after a short delay to let the focus animation show briefly
      setTimeout(() => {
        e.target.blur();
      }, 200);
    });
  }
});

if (themeToggle) {
  themeToggle.addEventListener("click", (e) => {
    toggleTheme(e);
    // Remove focus after a short delay
    setTimeout(() => {
      e.target.blur();
    }, 200);
  });
}

document.addEventListener("keydown", handleKeyboard);


display.addEventListener("click", () => display.focus());