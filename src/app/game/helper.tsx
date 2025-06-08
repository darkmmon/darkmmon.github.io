export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
export function checkLine(array: number[]) {
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (array[a] && array[a] === array[b] && array[a] === array[c]) {
            return array[a];
        }
    }
    return null;
}

// return index if have a good move
export function semiCheckLine(array: number[]) {
    lines.sort((_a, _b) => 0.5 - Math.random());
    // 1. find blocking chance
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        const line = [array[a], array[b], array[c]];
        const nearWin =
            line.filter((v) => v === 2).length === 2 &&
            typeof line.find((v) => v == 0) == "undefined";
        if (nearWin) {
            return line.findIndex((v) => v == 0) + 1;
        }
    }
    // 2. create potential line chance
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        const line = [array[a], array[b], array[c]];
        if (
            typeof line.find((v) => v == 1) == "undefined" &&
            typeof line.find((v) => v == 2) != "undefined"
        ) {
            return line.findIndex((v) => v == 0) + 1;
        }
    }
    // if fail to find then just pick centre
    return getRandomInt(1, 9);
}

export function potentialLineCheck(boxState: number[]) {
    const completeLine = boxState.map((value, index) => {
        if (value == 0) {
            const newBoxState = boxState.slice();
            newBoxState[index] = 2;
            if (checkLine(newBoxState) != null) {
                return index + 1;
            }
        }
    });
    for (const i of completeLine) {
        if (i != null) {
            return i;
        }
    }

    return 0;
}
