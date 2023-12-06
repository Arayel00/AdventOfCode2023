const { readSimpleInput }  = require("./read_input.js");

let inputs = readSimpleInput("./2.txt");

const RED = 12;
const GREEN = 13;
const BLUE = 14;

class Game {
    constructor(id, tirages) {
        this.id = id;
        this.tirages = tirages;
    }
}

class Tirage {
    constructor(blue, red, green) {
        this.blue = blue;
        this.red = red;
        this.green = green;
    }
}

function buildGame(rawGame) {
    const data = rawGame.split(":");
    const gameId = parseInt(data[0].split(" ")[1]);
    const tirages = data[1].split(";").map(buildTirageFromRawtxt);

    return new Game(gameId, tirages);
}

function buildTirageFromRawtxt(rawTirages) {
    const colors = rawTirages.split(",");
    // let blue = 0;
    // let red = 0;
    // let green = 0;

    // colors.forEach(color => {
    //     const data = color.trim().split(" ");
    //     switch(data[1]) {
    //         case "blue": blue += parseInt(data[0]);
    //             break;
    //         case "red": red += parseInt(data[0]);
    //             break;
    //         case "green": green += parseInt(data[0]);
    //             break;
    //     }
    // });

    const { blue, red, green } = colors.reduce((acc, color) => {
        const data = color.trim().split(' ');
        return { ...acc, [data[1]]: acc[data[1]] + data[0] };
      }, { blue: 0, red: 0, green: 0 });

    return new Tirage(blue, red, green);
}

function isGameValid(game) {
    for(let tirage of game.tirages) {
        if(tirage.blue > BLUE || tirage.red > RED || tirage.green > GREEN) {
            return false;
        }
    }
    return true;
}

let result = inputs
    .map(buildGame)
    .filter(isGameValid)
    .reduce((acc, cur) => acc + cur.id, 0);

console.log(result);

////////////////////////////////////////////////////////////////////////////

function getMinimalSetPower(game) {
    const minBlue = Math.max(...game.tirages.map(tirage => tirage.blue));
    const minRed = Math.max(...game.tirages.map(tirage => tirage.red));
    const minGreen = Math.max(...game.tirages.map(tirage => tirage.green));

    return minBlue * minRed * minGreen;
}

result = inputs
    .map(buildGame)
    .map(getMinimalSetPower)
    .reduce((acc, cur) => acc + cur, 0);

console.log(result);