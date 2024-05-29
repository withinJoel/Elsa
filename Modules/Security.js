//////////////////////////////////////////////////////////////////////Matrix
const characters = "@#!$%&*+?/ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const numRows = 20;
const numCols = 50;
let matrix = [];

for (let row = 0; row < numRows; row++) {
  let rowChars = [];
  for (let col = 0; col < numCols; col++) {
    rowChars.push(characters[Math.floor(Math.random() * characters.length)]);
  }
  matrix.push(rowChars.join(" "));
}

const matrixLoop = setInterval(() => {
  console.clear();
  for (let row = 0; row < numRows; row++) {
    console.log(matrix[row]);
    matrix[row] = characters[Math.floor(Math.random() * characters.length)] + matrix[row].slice(0, -1);
  }
}, 100);
//////////////////////////////////////////////////////////////////////Stop from saving this document via Ctrl + S
document.addEventListener('keydown', function (event) {
  // Check if the Ctrl key and the 's' key are pressed simultaneously
  if (event.ctrlKey && event.key === 's') {
    // Prevent the default action (saving the page)
    event.preventDefault();
  }
  if (event.ctrlKey && event.shiftKey && event.key === 'j') {
    // Prevent the default action (saving the page)
    event.preventDefault();
  }
});
//////////////////////////////////////////////////////////////////////Disable Right click
document.addEventListener('contextmenu', function (event) {
  event.preventDefault();
});
////////////////////////////////////////////////////////////////////Developer Tools
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.shiftKey && event.key === 'J') {
    event.preventDefault();
  }
});
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.shiftKey && event.key === 'C') {
    event.preventDefault();
  }
});
document.addEventListener('keydown', function (event) {
  if (event.key === 'F12') {
    event.preventDefault();
  }
});
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.shiftKey && event.key === 'I') {
    event.preventDefault();
  }
});
//////////////////////////////////////////////////////////////////////View Page Source
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.key === 'u') {
    event.preventDefault();
  }
});
//////////////////////////////////////////////////////////////////////Disable Browser Console
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.shiftKey && event.key === 'K') {
    event.preventDefault();
  }
});
//////////////////////////////////////////////////////////////////////Disable Browser Inspector
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.shiftKey && event.key === 'I') {
    event.preventDefault();
  }
});
//////////////////////////////////////////////////////////////////////Disable Console Data
(function () {
  var defaultMessage = 'Access to Sources panel is disabled.';

  // Override some properties of the window object
  Object.defineProperties(window, {
    '$_': {
      get: function () {
        console.error(defaultMessage);
      }
    },
    '$$': {
      get: function () {
        console.error(defaultMessage);
      }
    },
    'document': {
      get: function () {
        console.error(defaultMessage);
      }
    }
    // Add other properties as needed
  });
})();
window.console = {
  log: function () {
    originalConsole.log('Logging is disabled.');
  },
  error: function () {
    originalConsole.error('Error logging is disabled.');
  },
  warn: function () {
    originalConsole.warn('Warning logging is disabled.');
  },
  info: function () {
    originalConsole.info('Info logging is disabled.');
  }
  // You can add other console methods as needed
};
//////////////////////////////////////////////////////////////////////Additional Measures
console.time = function () { console.warn('Console timing is disabled for safety purposes.'); };
console.timeEnd = function () { console.warn('Console timing end is disabled for safety purposes.'); };
console.group = function () { console.warn('Console grouping is disabled for safety purposes.'); };
console.groupCollapsed = function () { console.warn('Console collapsed grouping is disabled for safety purposes.'); };
console.groupEnd = function () { console.warn('Console group end is disabled for safety purposes.'); };
console.table = function () { console.warn('Console table is disabled for safety purposes.'); };
console.clear = function () { console.warn('Console clear is disabled for safety purposes.'); };
// Override console.log, console.error, console.warn, and console.info
console.log = function () { console.warn('Console logging is disabled for safety purposes.'); };
console.error = function () { console.warn('Console error logging is disabled for safety purposes.'); };
console.warn = function () { console.warn('Console warning logging is disabled for safety purposes.'); };
console.info = function () { console.warn('Console info logging is disabled for safety purposes.'); };