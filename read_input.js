const fs = require('fs');

function readSimpleInput(fineName) {
    return fs.readFileSync(fineName, "utf8").trim().split("\n");
}

function readPairOfRange(fileName) {
    return readSimpleInput(fileName).map(
        pairOfRange => 
            pairOfRange.split(",").map(range => {
                const rangeTab = range.split("-");
                return { start: Number.parseInt(rangeTab[0]), end: Number.parseInt(rangeTab[1])};
    }))
}

module.exports = {
	readSimpleInput,
    readPairOfRange,
};
