"use client";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { getRandomInt } from "./1p/page";

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
            width={"min(5vw, 5vh)"}
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
    handleClick: (box:number, square:number) => void
}) {
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
                            onClick={(squareNumber) => handleClick(boxNumber, squareNumber)}
                            squareNumber={i}
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

export default function Gameboard({playerCount, moveEngine} : {playerCount: number, moveEngine?: () => number[]}) {
    const [history, setHistory] = useState("");
    const [player, setPlayer] = useState(1);
    const [boxValues, setBoxValues] = useState<number[]>(Array(9).fill(0));
    const [enabledBox, setEnabledBox] = useState(0);
    const [squareValues, setSquareValues] = useState([...Array(9)].map(_=>Array(9).fill(0)));
    const handleBoxWinUpdate = (player: number, box: number) => {
        setBoxValues((a) => {
            const na = a.slice();
            na[box] = player;
            return na;
        });
    };
    

    function updateHistory(newMove: string) {
        setHistory(history + newMove);
    }
    function updatePlayer() {
        setPlayer(player === 1 ? 2 : 1);
    }
    function handleClick(box: number, square: number) {
        const na = squareValues.slice();
        na[box][square] = player;

        // calculate box win
        const boxWinPlayer = checkLine(na[box]);
        if (boxWinPlayer) {
            handleBoxWinUpdate(boxWinPlayer, box);
        }
        setSquareValues(na);

        // update history and player order
        updateHistory(box.toString()+square);
        updatePlayer();
        updateEnabledBox(square)
    }

    // handle one player auto move
    useEffect(() => {
        if (playerCount == 1 && player == 2 && moveEngine) {
            let [box, square] = moveEngine()
            if (enabledBox!=0) {
                box = enabledBox-1
            }
            // if move engine give invalid move, random pick another avail square
            while (squareValues[box][square] != 0){
                box = getRandomInt(1,9)
                square = getRandomInt(1,9)
                if (enabledBox!=0) {
                    box = enabledBox-1
                }
            }
            handleClick(box, square)
        } 
    }, [playerCount, player, moveEngine])

    // handle edge case where the move would disable the target box while that box's enable is updated
    useEffect(() => {
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
                        boxNumber={i}
                        squareValues={squareValues[i]}
                        enabled={enabledBox === i + 1 || enabledBox === 0}
                        handleClick={handleClick}
                    />
                </Grid>
            ))}
        </Grid>
    );
}
