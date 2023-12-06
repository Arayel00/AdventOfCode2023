const { readSimpleInput }  = require("./read_input.js");

let inputs = readSimpleInput("./3.txt");

function isSymbol(char) {
    return Number.isNaN(parseInt(char)) && char !== ".";
}