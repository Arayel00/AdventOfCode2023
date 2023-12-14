const { readSimpleInput }  = require("./read_input.js");

let inputs = readSimpleInput("./4.txt");

// inputs = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
// Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
// Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
// Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
// Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
// Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`.split("\n");

function countWiningNumber(txtData) {
    const [winningNumbers, myNumbers] = txtData.split(":")[1].replaceAll("  ", " ").split("|").map(numberList => numberList.trim().split(" ").map(number => parseInt(number)));
    return myNumbers.filter(num => winningNumbers.includes(num)).length;
}

let result = inputs.map(line => {
    const countWiningNumbers = countWiningNumber(line);
    if(countWiningNumbers === 0) return 0;
    return 2**(countWiningNumbers-1);
}).reduce((acc, current) => acc + current, 0);

console.log(result);

////////////////////////////////////////

result = inputs.reduce((acc, current, i) => {
    const countWiningNumbers = countWiningNumber(current);
    const currentCardCopies = (acc[i] ?? 0);
    const currentCard = 1;

    let value = { 
        ...acc,
        score: acc.score + currentCard + currentCardCopies,
    }

    if(countWiningNumbers === 0) return value;

    for(let a = 0; a < countWiningNumbers; a++) {
        const nextExistingCopies = value[i+a+1] ?? 0;
        value[i+a+1] = nextExistingCopies + currentCard + currentCardCopies;
    }

    return value;
}, { score: 0 }).score;

console.log(result);