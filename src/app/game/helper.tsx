import { player } from "./type";

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

function semiCheckLine(array: number[], player: player) : number[] {
    const a = [...array]
    const wonPlayer = checkLine(a)
    let potentialSquare : number[] = []
    if (wonPlayer) return [1,2,3,4,5,6,7,8,9];
    for (let i = 0; i < 9; i++) {
        if (a[i] == 0) {
            a[i] = player
            if (checkLine(a)) {
                potentialSquare.push(i)
            }
            a[i] = 0
        }
    }
    return potentialSquare
}

// TODO: this need refactor lol
// return index if have a good move
export function semiFindLine(array: number[]) {
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

// give +ve value if player 1 is winning
export function evaluator(BoardState: number[][], nextMove: number, player: player) {
    // util values for easier computation
    const boxState = BoardState.map(Box => Box.every((v) => v==Box[0]) ? Box[0] : 0)
    let score = 0
    // 0. add extra score if player can go freely
    if (nextMove == 0) {
        score += player == 1 ? 20 : -20
    }

    // 1. Winning or Losing the game
    const winner = checkLine(boxState)
    if (winner == 1) {
        return Number.POSITIVE_INFINITY
    } else if (winner == 2) {
        return Number.NEGATIVE_INFINITY
    }

    // 2. count winning boxes
    const boxWeight = 100
    score += boxWeight * tictactoeEvaluator(boxState)

    // 3. extra score for two boxes connected 
    score += boxWeight * semiCheckLine(boxState, 1).length 
    score -= boxWeight * semiCheckLine(boxState, 2).length

    // 4. count square level
    const squareWeight = 5
    for (let i = 0; i < 9; i++) {
        if (boxState[i] == 0) {
            score += squareWeight * tictactoeEvaluator(BoardState[i])
        }
    }

    // 5. extra score for two square connected
    for (let i = 0; i < 9; i++) {
        if (boxState[i] == 0) {
            score += squareWeight * semiCheckLine(BoardState[i], 1).length
            score += squareWeight * semiCheckLine(BoardState[i], 2).length
        }
    }

    return score
}

function tictactoeEvaluator(box: number[]) {
    // give points based on individual square only
    const gridWeight = [1,2,1,2,4,2,1,2,1]
    let score = 0
    for (let i = 0; i < 9; i++) {
        score += box[i] == 1 ? gridWeight[i] : box[i] == 2 ? -gridWeight[i] : 0
    }
    return score 
}