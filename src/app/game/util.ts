import { player } from "./type";
import { checkLine } from "./helper";

export function updateStatesOnMove(
    move: number[],
    player: player,
    BoardState: number[][]
) : number[][] {
    
    const newBoardState = BoardState.map((v) => v.map(v => v))
    newBoardState[move[0]][move[1]] = player
    if (checkLine(newBoardState[move[0]])) {
        newBoardState[move[0]] = Array(9).fill(player)
    }
    return newBoardState
}
