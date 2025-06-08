"use client";

import Image from "next/image";
import Gameboard from "../gameboard";
import {
    potentialLineCheck,
    semiCheckLine,
    getRandomInt,
} from "../helper";

function randomMove(BoardState: number[][], nextMove: number) {
    let box = nextMove;
    if (nextMove == 0) {
        box = getRandomInt(1, 9);
    }
    let square = getRandomInt(1, 9);
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
        square = semiCheckLine(boxState);
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
            square = semiCheckLine(boxState.v);
            if (square != 0) return [box, square];
        });
        // if nothing then return a random valid move
        return randomMove(BoardState, nextMove);
    }
    // this should not be reached
    return [box, square];
}

export default function Home() {
    return (
        <div className="grid grid-rows-[1fr_20px] items-center justify-items-center min-h-screen p-8 gap-16">
            <main className="flex h-[min(95vh,95vw)] w-[min(95vh,95vw)] flex-col items-center sm:items-start">
                <Gameboard playerCount={1} moveEngine={oneStepMove} />
            </main>
            <footer className="row-start-2 flex gap-[24px] flex-wrap items-center justify-center">
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/file.svg"
                        alt="File icon"
                        width={16}
                        height={16}
                    />
                    Learn
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/window.svg"
                        alt="Window icon"
                        width={16}
                        height={16}
                    />
                    Examples
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/globe.svg"
                        alt="Globe icon"
                        width={16}
                        height={16}
                    />
                    Go to nextjs.org →
                </a>
            </footer>
        </div>
    );
}
