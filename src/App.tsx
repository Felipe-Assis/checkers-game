import React, { useState } from "react";
import { initializeBoard, makeMove, validateMove } from "./utils/gameLogic";
import Board from "./components/Board";
import { getAIMove } from "./components/AI";
import { Board as BoardType, Move } from "./utils/types";

const App: React.FC = () => {
  const [board, setBoard] = useState<BoardType>(initializeBoard());
  const [selectedPiece, setSelectedPiece] = useState<{ row: number; col: number } | null>(null); // Track selected piece
  const [playerColor] = useState<"red" | "black">("red");
  const [aiColor] = useState<"red" | "black">("black");
  const [playerTurn, setPlayerTurn] = useState<"red" | "black">("red");

  const handleMove = (move: Move) => {
    if (validateMove(board, move, playerColor)) {
      const updatedBoard = makeMove(board, move);
      setBoard(updatedBoard);

      // AI Turn
      const aiMove = getAIMove(updatedBoard, aiColor);
      setBoard(makeMove(updatedBoard, aiMove));
    }
  };

  const handleSquareClick = (row: number, col: number) => {
    const square = board[row][col];

    if (selectedPiece) {
      // Attempt to create a move
      const move: Move = { from: selectedPiece, to: { row, col } };

      if (validateMove(board, move, playerTurn)) {
        // Move is valid
        const updatedBoard = makeMove(board, move);
        setBoard(updatedBoard); // Update board state
        setSelectedPiece(null); // Deselect piece
        setPlayerTurn(playerTurn === "red" ? "black" : "red"); // Switch turn

        // Trigger AI move after player's turn (if AI's turn)
        if (playerTurn === "red") {
          setTimeout(() => {
            const aiMove = getAIMove(updatedBoard, "black");
            if (aiMove) {
              setBoard(makeMove(updatedBoard, aiMove)); // Make AI move
              setPlayerTurn("red");
            }
          }, 500); // AI delay for better UX
        }
      } else {
        console.log("Invalid move"); // Log invalid move attempts
        setSelectedPiece(null); // Deselect the piece on invalid move
      }
    } else if (square.piece && square.piece.color === playerTurn) {
      // Select a piece if no piece is selected
      setSelectedPiece({ row, col });
    }
  };


  return (
      <div>
        <h1>Checkers Game</h1>
        <Board board={board} onMove={handleMove} onSquareClick={handleSquareClick} selectedPiece={selectedPiece} />
      </div>
  );
};

export default App;
