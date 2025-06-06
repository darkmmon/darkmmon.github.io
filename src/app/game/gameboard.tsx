"use client";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

function checkLine(array: number[]) {
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
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (array[a] && array[a] === array[b] && array[a] === array[c]) {
            return array[a];
        }
    }
    return null;
}

function GameSquare({
    value,
    enabled,
    onClick,
    squareCoordinate,
}: {
    value: number;
    enabled: boolean;
    onClick: (coord: string) => void;
    squareCoordinate: string;
}) {
    const colors = ["white", "blue", "red", "gray"];
    const color = colors[value];
    return (
        <Box
            width={"min(5vw, 5vh)"}
            sx={{
                aspectRatio: 1 / 1,
                borderRadius: 1,
                bgcolor: color,
            }}
            onClick={() => {
                if (enabled) onClick(squareCoordinate);
            }}
        />
    );
}

function GameBox({
    boxValue,
    handleBoxUpdate,
    boxNumber,
    updateHistory,
    player,
    updatePlayer,
    enabled,
    updateEnabledBox,
}: {
    boxValue: number;
    handleBoxUpdate: (v: number) => void;
    boxNumber: number;
    updateHistory: (v: string) => void;
    player: number;
    updatePlayer: () => void;
    enabled: boolean;
    updateEnabledBox: (v: number) => void;
}) {
    const handleClick = (i: number, coord: string) => {
        const na = squareValues.slice();
        na[i] = player;
        const boxv = checkLine(na);
        if (boxv) {
            handleBoxUpdate(boxv);
        }
        setSquareValues(na);

        // update history and player order
        updateHistory(coord);
        updatePlayer();
        updateEnabledBox(i)
    };
    const [squareValues, setSquareValues] = useState(Array(9).fill(0));

    const checkClickable = (enable: boolean, value: number) => {
        if (value === 0 && enabled) return true;
        return false;
    };

    if (boxValue === 0) {
        return (
            <Grid
                container
                minWidth={"30%"}
                minHeight={"30%"}
                spacing={2}
                sx={{ aspectRatio: 1 / 1 }}
            >
                {[...Array(9).keys()].map((i) => (
                    <Grid size={4} key={i}>
                        <GameSquare
                            value={squareValues[i]}
                            enabled={checkClickable(enabled, squareValues[i])}
                            onClick={(coord) => handleClick(i, coord)}
                            squareCoordinate={boxNumber.toString() + i}
                        />
                    </Grid>
                ))}
            </Grid>
        );
    } else if (boxValue === 1 || boxValue === 2) {
        const colors = ["white", "blue", "red"];
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

export default function Gameboard({playerCount} : {playerCount: number}) {
    const [history, setHistory] = useState("");
    const [player, setPlayer] = useState(1);
    const [boxValues, setBoxValues] = useState<number[]>(Array(9).fill(0));
    const [enabledBox, setEnabledBox] = useState(0);
    const handleBoxUpdate = (v: number, i: number) => {
        setBoxValues((a) => {
            const na = a.slice();
            na[i] = v;
            return na;
        });
    };

    function updateHistory(newMove: string) {
        setHistory(history + newMove);
    }
    function updatePlayer() {
        setPlayer(player === 1 ? 2 : 1);
    }

    function randomMove

    useEffect(() => {
        if (playerCount == 1 && player == 2) {
            randomMove()
        } 
    }, [playerCount, player])

    useEffect(() => {
        console.log(history)
        console.log(enabledBox);
        console.log(boxValues);
        if (enabledBox !== 0 && boxValues[enabledBox-1]!==0) {
            updateEnabledBox(enabledBox-1)
        }
    }, [enabledBox,boxValues, updateEnabledBox, history]);
    function updateEnabledBox(index: number) {
        if (boxValues[index] === 0) {
            setEnabledBox(index+1)
        } else {
            setEnabledBox(0)
        }
    }

    return (
        <Grid
            container
            width={"100%"}
            height={"100%"}
            rowSpacing={"5%"}
            columnSpacing={"5%"}
            className="gameboard"
        >
            {[...Array(9).keys()].map((i) => (
                <Grid size={4} key={i}>
                    <GameBox
                        boxValue={boxValues[i]}
                        handleBoxUpdate={(v) => handleBoxUpdate(v, i)}
                        boxNumber={i}
                        updateHistory={updateHistory}
                        player={player}
                        updatePlayer={updatePlayer}
                        enabled={enabledBox === i + 1 || enabledBox === 0}
                        updateEnabledBox={updateEnabledBox}
                    />
                </Grid>
            ))}
        </Grid>
    );
}
