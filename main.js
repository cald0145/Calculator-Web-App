const keys = document.querySelectorAll(".key");
const display_input = document.querySelector(".display .input");
const display_output = document.querySelector(".display .output");
// Retrieving elements with the query selector

let input = "";
/* Initializing a variable named input and assigning an empty string to it, 
this variable will hold the input entered by the user */

for (let key of keys) {
  const value = key.dataset.key;

/* Inside the loop the code retrieves the value attribute from the current key element using key.dataset.key
this value represents the type of operation or action associated with the key */

/* Here it enters a loop that iterates over each element in the keys nodelist, 
which was obtained before using document.querySelectorAll(".key") */


// An event listener is added to each key element so that when a key is clicked, the associated callback function is executed
  key.addEventListener("click", () => {
    if (value == "clear") {
        input = "";
        display_input.innerHTML = "";
        display_output.innerHTML = "";
    } else if (value == "backspace") {
        input = input.slice(0, -1);
        display_input.innerHTML = CleanInput(input);
    } else if (value == "=") {
        let result = eval(PrepareInput(input));
//The callback function contains several conditional statements to handle different scenarios based on the value of the clicked key
        display_output.innerHTML = CleanOutput(result);
    } else if (value == "brackets") {
      if (
          input.indexOf("(") == -1 ||
          input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") < input.lastIndexOf(")")
      ) {
          input += "(";
      } else if (
          input.indexOf("(") != -1 && 
          input.indexOf(")") == -1 ||
          input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") > input.lastIndexOf(")")
      ) {
        input += ")";
      }
      display_input.innerHTML = CleanInput(input);
    } else {
        if (ValidateInput(value)) {
          input += value;
      display_input.innerHTML = CleanInput(input);
        }
    }
  })
}
/* CleanInput takes the input as an argument, splits it into an array of characters, and iterates over each character
it replaces the operators with HTML elements wrapped in spans to create cleaner operators
the updated array is then joined back into a string and returned */
function CleanInput(input) {
  let input_array = input.split('');
  let input_array_length = input_array.length;

  for (let i = 0; i < input_array_length; i++) {
    if (input_array[i] == '*') {
        input_array[i] = ` <span class='operator'>x</span> `;
    } else if (input_array[i] == '/') {
        input_array[i] = ` <span class='operator'>÷</span> `;
    } else if (input_array[i] == '+') {
      input_array[i] = ` <span class='operator'>+</span> `;
    } else if (input_array[i] == '-') {
      input_array[i] = ` <span class='operator'>-</span> `;
    } else if (input_array[i] == '(') {
      input_array[i] = `<span class='brackets'>(</span>`;
    } else if (input_array[i] == ')') {
      input_array[i] = `<span class='brackets'>)</span>`;
    } else if (input_array[i] == '%') {
      input_array[i] = `<span class='percent'>%</span>`;
    }
  }
  return input_array.join('');
}
/* CleanOutput takes the output as an argument and it converts the output to a string, 
splits it into the whole number part and the decimal part if present, 
and then adds commas as thousand separators to the whole number part */
function CleanOutput (output) {
  let output_string = output.toString();
  let decimal = output_string.split('.')[1];
  output_string = output_string.split('.')[0];

  let output_array = output_string.split('');

  if (output_array.length > 3) {
      for (let i = output_array.length - 3; i > 0; i -= 3) {
        output_array.splice(i, 0, ',');
      }
  }

  if (decimal) {
      output_array.push('.');
      output_array.push(decimal);
  }

  return output_array.join('');
}

function ValidateInput (value) {
  let last_input = input.slice(-1);
  let operators = ['+', '-', '*', '/'];

  if (value == '.' && last_input == '.') {
    return false;
  }

  if (operators.includes(value)) {
      if (operators.includes(last_input)) {
        return false;
      } else {
        return true;
      }
  }
  return true;
}

function PrepareInput (input) {
  let input_array = input.split('');

  for (let i = 0; i < input_array.length; i++) {
      if (input_array[i] == '%') {
          input_array[i] = '/100';
      }
  }

  return input_array.join('');
}