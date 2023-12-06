const { readSimpleInput }  = require("./read_input.js");

let inputs = readSimpleInput("./1.txt");

const isNumber = char => !Number.isNaN(parseInt(char, 10));

const result = inputs
.map(word => parseInt(word.split('').find(isNumber) + word.split('').findLast(isNumber), 10))
.reduce((acc, current) => acc + current);

console.log(result);