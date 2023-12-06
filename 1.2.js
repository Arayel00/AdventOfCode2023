const { readSimpleInput }  = require("./read_input.js");

const data = readSimpleInput("./1.txt");

let regex = /\d/g;

let getFirstAndLastNum = word => {
    occurences = word.match(regex);
    return parseInt(occurences[0] + occurences[occurences.length-1], 10);
};

let result = data
    .map(getFirstAndLastNum)
    .reduce((acc, cur) => acc + cur, 0);

console.log(result);

// -------------------------------------------------------------------------------

const litteralNumbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

function reverseString(word) {
    return word.split("").reverse().join("");
}

const regex1 = new RegExp(`(?:${litteralNumbers.join("|")}|\\d)`, "g");
const regex2 = new RegExp(`(?:${litteralNumbers.map(reverseString).join("|")}|\\d)`, "g"); 

const getNumberFromWord = num => {
    switch(num) {
        case 'one': return "1";
            break;
        case 'two': return "2";
            break;
        case 'three': return "3";
            break;
        case 'four': return "4";
            break;
        case 'five': return "5";
            break;
        case 'six': return "6";
            break;
        case 'seven': return "7";
            break;
        case 'eight': return "8";
            break;
        case 'nine': return "9";
            break;
    }
};

getFirstAndLastNum = word => {
    const fisrtAndLast = [word.match(regex1)[0], reverseString(reverseString(word).match(regex2)[0])];
    let numBuild = "";

    for(let occ of fisrtAndLast) {
        if(Number.isNaN(parseInt(occ, 10))) {
            numBuild += getNumberFromWord(occ);
        } else {
            numBuild += occ;
        }
    }
    return parseInt(numBuild, 10);
};

result = data
    .map(getFirstAndLastNum)
    .reduce((acc, cur) => acc + cur, 0);

console.log(result);