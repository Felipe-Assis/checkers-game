import React from "react";
import { Board as BoardType, Move } from "../utils/types";
import Piece from "./Piece";
import "../styles/Board.css";

interface BoardProps {
    board: BoardType;
    onMove: (move: Move) => void;
    onSquareClick: (row: number, col: number) => void; // Pass click events to the parent
    selectedPiece: { row: number; col: number } | null; // Track selected piece
}

const Board: React.FC<BoardProps> = ({ board,  onSquareClick, selectedPiece, onMove }) => {
    return (
        <div className="board">
            {board.map((row, rowIndex) =>
                row.map((square, colIndex) => (
                    <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`square ${square.isDark ? "dark" : "light"} ${
                            selectedPiece?.row === rowIndex && selectedPiece?.col === colIndex ? "selected" : ""
                        }`}
                        onClick={() => onSquareClick(rowIndex, colIndex)}
                    >
                        {square.piece && <Piece color={square.piece.color} isKing={square.piece.isKing} />}
                    </div>
                ))
            )}
        </div>
    );
};

export default Board;
