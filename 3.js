const { readSimpleInput }  = require("./read_input.js");

let inputs = readSimpleInput("./3.txt");

// un nombre peut-il être à côté de deux symboles ? auquel cas il ne faut pas le compter en double

function isSymbol(char) {
    return Number.isNaN(parseInt(char)) && char !== ".";
}

function isNumber(char) {
    return !Number.isNaN(parseInt(char, 10));
}

function getNumber(x, y) {
    const line = inputs[y];
    let start = x;
    let end = x;

    while(isNumber(line[start-1]) && start >= 0) {
        start--;
    }

    while(isNumber(line[end+1]) && end < line.length) {
        end++;
    }

    return { num: parseInt(line.substring(start, end + 1), 10), start, y };
}

function getNumberArround(x, y) {
    const positionsToCheck = [{x: 1, y: 0}, {x: 1, y: -1}, {x: 0, y: -1}, {x: -1, y: -1}, {x: -1, y: 0}, {x: -1, y: 1}, {x: 0, y: 1}, {x: 1, y: 1}];
    const numbers = [];

    positionsToCheck.forEach(move => {
        if(isNumber(inputs[y + move.y][x + move.x])) {
            const number = getNumber(x + move.x, y + move.y);
            
            if(!numbers.some(num => num.start === number.start && num.y === number.y)) {
                numbers.push(number);
            };            
        }
    });

    return numbers.map(number => number.num);
}

let result = 0;

for(let y=0; y<inputs.length; y++) {
    for(let x=0; x<inputs[y].length; x++) {
        if(isSymbol(inputs[y][x])) {
            result = getNumberArround(x, y).reduce((acc, current) => acc + current, result);
        }
    }
}

console.log(result);

///////////////////////////////////////////////////////////////////////////////////////////////////

result = 0;

for(let y=0; y<inputs.length; y++) {
    for(let x=0; x<inputs[y].length; x++) {
        if(isSymbol(inputs[y][x])) {
            const numbers = getNumberArround(x, y);
            
            if(numbers.length === 2) {
                result += numbers[0] * numbers[1];
            }
        }
    }
}

console.log(result);