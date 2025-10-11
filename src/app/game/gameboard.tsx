"use client";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useEffect, useState, useCallback } from "react";
import { getRandomInt } from "./helper";
import { checkLine } from "./helper";
import { Stack } from "@mui/material";
import {player } from './type'

function GameSquare({
    value,
    enabled,
    onClick,
    squareNumber,
}: {
    value: number;
    enabled: boolean;
    onClick: (squareNumber: number) => void;
    squareNumber: number;
}) {
    const colorValue = enabled ? 0 : value ? value : 3;
    const colors = ["white", "blue", "red", "gray"];
    const color = colors[colorValue];
    return (
        <Box
            width={"100%"}
            height={"100%"}
            sx={{
                aspectRatio: 1 / 1,
                borderRadius: 1,
                bgcolor: color,
            }}
            onClick={() => {
                if (enabled) onClick(squareNumber);
            }}
        />
    );
}

function GameBox({
    boxValue,
    boxNumber,
    squareValues,
    enabled,
    handleClick,
}: {
    boxValue: number;
    boxNumber: number;
    squareValues: number[];
    enabled: boolean;
    handleClick: (box: number, square: number) => void;
}) {
    const checkClickable = (enable: boolean, value: number) => {
        if (value === 0 && enabled) return true;
        return false;
    };

    if (boxValue === 0) {
        return (
            <Grid
                container
                width={"100%"}
                height={"100%"}
                spacing={2}
                sx={{ aspectRatio: 1 / 1 }}
                alignItems="center"
                justifyContent="space-evenly"
            >
                {[...Array(9).keys()].map((i) => (
                    <Grid size={4} key={i}>
                        <GameSquare
                            value={squareValues[i]}
                            enabled={checkClickable(enabled, squareValues[i])}
                            onClick={(squareNumber) =>
                                handleClick(boxNumber, squareNumber)
                            }
                            squareNumber={i}
                        />
                    </Grid>
                ))}
            </Grid>
        );
    } else {
        const colors = ["white", "blue", "red", "grey"];
        const color = colors[boxValue];
        return (
            <Box
                width={"100%"}
                sx={{
                    aspectRatio: 1 / 1,
                    borderRadius: 1,
                    bgcolor: color,
                }}
            />
        );
    }
}

export default function Gameboard({
    playerCount,
    moveEngine,
}: {
    playerCount: number;
    moveEngine?: (gameState: number[][], nextMove: number) => number[];
}) {
    const [history, setHistory] = useState("");
    const [player, setPlayer] = useState<player>(1);
    const [boxValues, setBoxValues] = useState<number[]>(Array(9).fill(0));
    const [enabledBox, setEnabledBox] = useState(0);
    const [squareValues, setSquareValues] = useState<number[][]>(
        [...Array(9)].map((_a) => Array(9).fill(0))
    );
    const [winner, setWinner] = useState<number | null>(null);
    const handleBoxWinUpdate = useCallback((player: number, box: number) => {
        setBoxValues((a) => {
            const na = a.slice();
            na[box] = player;
            return na;
        });
        setSquareValues((a) => {
            const na = a.slice();
            na[box] = Array(9).fill(player);
            return na;
        });
    }, []);

    const updateHistory = useCallback((newMove: string) => {
        setHistory((prevHistory) => prevHistory + newMove);
    }, []);

    const updatePlayer = useCallback(() => {
        setPlayer((prevPlayer) => (prevPlayer === 1 ? 2 : 1));
    }, []);
    const updateEnabledBox = useCallback(
        (index: number) => {
            if (boxValues[index] === 0) {
                setEnabledBox(index + 1);
            } else {
                setEnabledBox(0);
            }
        },
        [boxValues]
    );
    const handleClick = useCallback(
        (box: number, square: number) => {
            const na = squareValues.slice();
            na[box][square] = player;

            // calculate box win
            const boxWinPlayer = checkLine(na[box]);
            const boxDraw = na[box].every(v => v)
            if (boxWinPlayer) {
                handleBoxWinUpdate(boxWinPlayer, box);
            } else if (boxDraw) {
                handleBoxWinUpdate(3, box)
            } else {
                setSquareValues(na);
            }

            // update history and player order
            updateHistory((box + 1).toString() + (square + 1) + "/ ");
            updatePlayer();
            updateEnabledBox(square);

            const winner = checkLine(boxValues.map((v, idx) => (idx == box && boxWinPlayer) ? boxWinPlayer : v));
            if (winner !== null) {
                console.log(`Game over, winner: ${winner}`);
                setWinner(winner);
            }
            if (boxValues.every((value) => value !== 0)) {
                console.log("Game over, draw");
                setWinner(0);
        }
        },
        [
            boxValues, 
            squareValues,
            player,
            updateHistory,
            updatePlayer,
            updateEnabledBox,
            handleBoxWinUpdate,
        ]
    );

    // handle one player auto move
    useEffect(() => {
        if (playerCount == 1 && player == 2 && moveEngine && !winner) {
            const newenabledBox = enabledBox !== 0 && boxValues[enabledBox - 1] !== 0 ? 0 : enabledBox
            console.log("effect",squareValues, newenabledBox)
            let [box, square] = moveEngine(squareValues, newenabledBox);
            if (newenabledBox != 0) {
                box = newenabledBox;
            }
            console.log(box, square);
            // if move engine give invalid move, random pick another avail square
            while (squareValues[box - 1][square - 1] != 0) {
                box = getRandomInt(1, 9);
                square = getRandomInt(1, 9);
                if (newenabledBox != 0) {
                    box = newenabledBox;
                }
            }

            handleClick(box - 1, square - 1);
        }
    }, [
        boxValues,
        winner,
        playerCount,
        player,
        moveEngine,
        squareValues,
        enabledBox,
        handleClick,
    ]);

    // handle edge case where the move would disable the target box while that box's enable is updated
    useEffect(() => {
        if (enabledBox !== 0 && boxValues[enabledBox - 1] !== 0) {
            updateEnabledBox(0);
        }
    }, [enabledBox, boxValues, updateEnabledBox, history]);

    return winner !== null ? (
        <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            padding={0}
            height={"100%"}
        >
            <h1
                style={{
                    fontSize: "2rem",
                    color:
                        winner === 0 ? "gray" : winner === 1 ? "blue" : "red",
                }}
            >
                Game over, winner: {winner} 
            </h1>
            <p>
                history : {history}
            </p>
        </Stack>
    ) : (
        <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            padding={0}
            height={"100%"}
        >
            <Grid
                container
                width={"100%"}
                height={"100%"}
                spacing={5}
                className="gameboard"
                sx={{ bgcolor: "black" }}
            >
                {[...Array(9).keys()].map((i) => (
                    <Grid size={4} key={i}>
                        <GameBox
                            boxValue={boxValues[i]}
                            boxNumber={i}
                            squareValues={squareValues[i]}
                            enabled={enabledBox === i + 1 || enabledBox === 0}
                            handleClick={handleClick}
                        />
                    </Grid>
                ))}
            </Grid>
            <Box width={"100%"}>
                <p style={{ textWrap: "stable" }}>History: {history}</p>
            </Box>
        </Stack>
    );
}
