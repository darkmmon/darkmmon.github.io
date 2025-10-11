"use client";

import Gameboard from "../gameboard";
import { potentialLineCheck, semiFindLine, getRandomInt, evaluator, checkLine } from "../helper";
import {player} from '../type'
import { updateStatesOnMove } from "../util";

function randomMove(BoardState: number[][], nextMove: number) {
    let box = nextMove;
    if (nextMove == 0) {
        box = getRandomInt(1, 9);
    }
    let square = getRandomInt(1, 9);
    console.log(box, square);
    while (BoardState[box][square] != 0) {
        if (nextMove == 0) {
            box = getRandomInt(1, 9);
        }
        square = getRandomInt(1, 9);
    }

    return [box, square];
}

function _oneStepMove(BoardState: number[][], nextMove: number) {
    let box = nextMove;
    let square: number = 0;
    if (nextMove != 0) {
        // forced box
        box = nextMove;
        const boxState = BoardState[nextMove - 1];
        // check if the box can be taken
        square = potentialLineCheck(boxState);
        if (square != 0) return [box, square];
        // if not, then find a "good" move
        square = semiFindLine(boxState);
        console.log(square);
        if (square != 0) return [box, square];
    } else {
        // prevent error, remove occupied box
        const fixedBoardState = BoardState.map((value, index) => {
            if (value.every((v) => v == value[0])) {
                return { i: index, v: value, skipped: true };
            } else {
                return { i: index, v: value, skipped: false };
            }
        });
        // free move
        // check if any box can be taken

        fixedBoardState.forEach((boxState) => {
            if (boxState.skipped) return;
            square = potentialLineCheck(boxState.v);
            if (square != 0) return [box, square];
        });
        // if not, then find a "good" move
        fixedBoardState.forEach((boxState) => {
            if (boxState.skipped) return;
            square = semiFindLine(boxState.v);
            if (square != 0) return [box, square];
        });
        // if nothing then return a random valid move
        return randomMove(BoardState, nextMove);
    }
    // this should not be reached
    return [box, square];
}



// return next move destination
function checkNextMove(BoardState: number[][], move: number){
    return BoardState[move].reduce((acc, cur) => (acc && (cur !== 0)), true) ? 0 : move+1
}

function minimax(BoardState: number[][], nextMove: number, depth: number, player: player){
    // early return in case of both winning before depth
    const boxState = BoardState.map(Box => Box.every((v) => v==Box[0]) ? Box[0] : 0)
    const winner = checkLine(boxState)
    if (winner == 1) {
        return {value: Number.POSITIVE_INFINITY, move: [1,1]}
    } else if (winner == 2) {
        return {value: Number.POSITIVE_INFINITY, move: [1,1]}
    }
    
    if (depth <= 0) {
        return {value: evaluator(BoardState, nextMove, player), move: [1,1]}
    }
    let bestMove : number[] = [1,1]
    let bestMoveValue = player == 1 ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY
    const moveidx = nextMove-1
    if (nextMove != 0) {
        for (let i = 0; i < 9; i++) {
            if (BoardState[moveidx][i] !== 0) {
                continue
            } else {
                // // pass empty array into update states, since we don't care box state here
                const newBoardState = updateStatesOnMove([moveidx, i], player, BoardState)
                const moveValue = minimax(newBoardState, checkNextMove(newBoardState, i), depth-1, player == 1 ? 2: 1).value;
                // if (depth == 3) {

                //     console.log('bestMove updated', [nextMove, i+1], moveValue)
                // }
                if (player == 1 ? moveValue > bestMoveValue : moveValue < bestMoveValue) {
                    bestMove = [nextMove, i+1]
                    bestMoveValue = moveValue
                }
            }
        }
    } else {
        for (let j = 0; j < 9; j++) {
            if (boxState[j] != 0) continue
            for (let i = 0; i < 9; i++) {
            // console.log("nextstep is 0", i,j, BoardState)
            if (BoardState[j][i] !== 0) {
                continue
            } else {
                // pass empty array into update states, since we don't care box state here
                const newBoardState = updateStatesOnMove([j, i], player, BoardState)
                const moveValue = minimax(newBoardState, checkNextMove(newBoardState, i), depth-1, player == 1 ? 2: 1).value;
                if (player == 1 ? moveValue > bestMoveValue : moveValue < bestMoveValue) {
                    bestMove = [j+1, i+1]
                    bestMoveValue = moveValue
                }
            }
        }
        }
    }
    return {value: bestMoveValue, move: bestMove}
}

function minimaxEngine(boardState: number[][], nextMove: number){
    console.log("engine receive", boardState, nextMove)
    const result = minimax(boardState, nextMove, 4, 2)
    console.log("final", result)
    return result.move
}


export default function Home() {
    return (
        <div className="grid grid-rows-[1fr_20px] items-center justify-items-center min-h-screen p-8 gap-16">
            <main className="flex w-[min(95vh,95vw)] flex-col items-center sm:items-start">
                <Gameboard playerCount={1} moveEngine={minimaxEngine} />
            </main>
        </div>
    );
}
