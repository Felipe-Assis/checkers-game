import { Board, Move } from "../utils/types";
import {validateMove} from "../utils/gameLogic";

// Basic AI to select a random valid move
export function getAIMove(board: Board, color: "red" | "black"): Move {
    const validMoves: Move[] = [];

    board.forEach((row, rowIndex) =>
        row.forEach((square, colIndex) => {
            if (square.piece && square.piece.color === color) {
                // Check all possible moves for this piece
                const directions = color === "red" ? [-1] : [1]; // Red moves up, Black moves down
                directions.forEach((dir) => {
                    const move1: Move = { from: { row: rowIndex, col: colIndex }, to: { row: rowIndex + dir, col: colIndex + 1 } };
                    const move2: Move = { from: { row: rowIndex, col: colIndex }, to: { row: rowIndex + dir, col: colIndex - 1 } };

                    if (validateMove(board, move1, color)) validMoves.push(move1);
                    if (validateMove(board, move2, color)) validMoves.push(move2);
                });
            }
        })
    );

    // Pick a random move
    return validMoves[Math.floor(Math.random() * validMoves.length)];
}
