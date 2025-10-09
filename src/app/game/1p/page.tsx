"use client";

import Image from "next/image";
import Gameboard from "../gameboard";
import { potentialLineCheck, semiFindLine, getRandomInt, evaluator } from "../helper";
import {player} from '../type'

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

function oneStepMove(BoardState: number[][], nextMove: number) {
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
    return BoardState[move].reduce((acc, cur) => (acc && (cur !== 0)), true) ? 0 : move
}

function minimax(BoardState: number[][], nextMove: number, depth: number, player: player){
    if (depth <= 0) {
        return evaluator(BoardState, nextMove, player) 
    }
    let bestMove = 0
    let bestMoveValue = 0
    if (nextMove != 0) {
        for (let i = 0; i < 9; i++) {
            if (BoardState[nextMove][i] !== 0) {
                return;
            } else {
                let newBoardState = [...BoardState];
                // TODO: this should be action function(check box complete, blablabla) 
                // instead of direct manip
                newBoardState[nextMove][i] = player;
                const moveValue = minimax(newBoardState, checkNextMove(newBoardState, i), depth-1, player == 1 ? 2: 1);
            }
        }
    }
}

export default function Home() {
    return (
        <div className="grid grid-rows-[1fr_20px] items-center justify-items-center min-h-screen p-8 gap-16">
            <main className="flex w-[min(95vh,95vw)] flex-col items-center sm:items-start">
                <Gameboard playerCount={1} moveEngine={oneStepMove} />
            </main>
        </div>
    );
}
