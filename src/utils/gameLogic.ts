import { Board, Piece, Move } from "./types";

export function initializeBoard(): Board {
    const board: Board = Array.from({ length: 8 }, (_, row) =>
        Array.from({ length: 8 }, (_, col) => ({
            isDark: (row + col) % 2 !== 0,
            piece: undefined,
        }))
    );

    // Place red pieces (top 3 rows)
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 8; col++) {
            if ((row + col) % 2 !== 0) {
                board[row][col].piece = { id: `r-${row}-${col}`, color: "red", isKing: false, position: { row, col } };
            }
        }
    }

    // Place black pieces (bottom 3 rows)
    for (let row = 5; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if ((row + col) % 2 !== 0) {
                board[row][col].piece = { id: `b-${row}-${col}`, color: "black", isKing: false, position: { row, col } };
            }
        }
    }

    return board;
}

export function validateMove(board: Board, move: Move, playerColor: "red" | "black"): boolean {
    const { from, to } = move;
    const piece = board[from.row]?.[from.col]?.piece;

    // Log key details
    console.log(`Validating move from (${from.row}, ${from.col}) to (${to.row}, ${to.col}) for ${playerColor}`);
    console.log(`Piece at source:`, piece);

    if (!piece || piece.color !== playerColor) {
        console.log("Invalid: No piece at source or wrong color.");
        return false;
    }

    if (to.row < 0 || to.row >= 8 || to.col < 0 || to.col >= 8) {
        console.log("Invalid: Destination out of bounds.");
        return false;
    }

    const rowDiff = to.row - from.row;
    const colDiff = Math.abs(to.col - from.col);

    if (Math.abs(rowDiff) === 1 && colDiff === 1 && !board[to.row][to.col]?.piece) {
        console.log("Valid: Simple diagonal move.");
        return true;
    }

    if (Math.abs(rowDiff) === 2 && colDiff === 2) {
        const jumpedRow = from.row + rowDiff / 2;
        const jumpedCol = from.col + (to.col - from.col) / 2;
        const jumpedPiece = board[jumpedRow]?.[jumpedCol]?.piece;

        if (jumpedPiece && jumpedPiece.color !== playerColor && !board[to.row][to.col]?.piece) {
            console.log("Valid: Jump move.");
            return true;
        }
    }

    console.log("Invalid: No matching move pattern.");
    return false;
}


export function makeMove(board: Board, move: Move): Board {
    console.log("Applying Move:", move);
    console.log("Board Before Move:", board);
    const newBoard = JSON.parse(JSON.stringify(board)) as Board;
    const { from, to } = move;

    const piece = newBoard[from.row]?.[from.col]?.piece;
    if (!piece) {
        console.error("No piece at source position.");
        return board; // Return original board if invalid
    }

    // Move piece
    newBoard[from.row][from.col].piece = undefined;
    newBoard[to.row][to.col].piece = piece;

    // Handle captures
    if (Math.abs(to.row - from.row) === 2) {
        const jumpedRow = from.row + (to.row - from.row) / 2;
        const jumpedCol = from.col + (to.col - from.col) / 2;
        newBoard[jumpedRow][jumpedCol].piece = undefined;
    }

    // Promote to king if necessary
    if (!piece.isKing && (to.row === 0 || to.row === 7)) {
        piece.isKing = true;
    }

    console.log("Board After Move:", newBoard);
    return newBoard;
}

