import { Board, Move } from "../utils/types";
import {validateMove} from "../utils/gameLogic";

// Basic AI to select a random valid move
export function getAIMove(board: Board, color: "red" | "black"): Move | null {
    const validMoves: Move[] = [];

    board.forEach((row, rowIndex) =>
        row.forEach((square, colIndex) => {
            if (square.piece && square.piece.color === color) {
                console.log(`Checking moves for piece at (${rowIndex}, ${colIndex})`);
                const directions = color === "red" ? [-1] : [1];
                directions.forEach((dir) => {
                    const move1: Move = { from: { row: rowIndex, col: colIndex }, to: { row: rowIndex + dir, col: colIndex + 1 } };
                    const move2: Move = { from: { row: rowIndex, col: colIndex }, to: { row: rowIndex + dir, col: colIndex - 1 } };

                    if (validateMove(board, move1, color)) validMoves.push(move1);
                    if (validateMove(board, move2, color)) validMoves.push(move2);
                });
            }
        })
    );

    console.log(`AI (${color}) valid moves:`, validMoves);

    return validMoves.length > 0 ? validMoves[Math.floor(Math.random() * validMoves.length)] : null;
}


