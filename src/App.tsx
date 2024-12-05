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
  const [currentTurn, setCurrentTurn] = useState<"red" | "black">("red");



  const handlePlayerMove = (move: Move) => {
    if (validateMove(board, move, playerColor)) {
      const updatedBoard = makeMove(board, move);
      setBoard(updatedBoard);
      setSelectedPiece(null);
      setCurrentTurn(aiColor); // Pass turn to AI
      triggerAIMove(updatedBoard); // Let the AI play
    } else {
      console.log("Invalid move");
      setSelectedPiece(null); // Deselect invalid move
    }
  };

  const triggerAIMove = (currentBoard: BoardType) => {
    setTimeout(() => {
      const aiMove = getAIMove(currentBoard, aiColor);
      console.log(`AI Move Generated:`, aiMove);
      if (aiMove) {
        const updatedBoard = makeMove(currentBoard, aiMove);
        console.log("Board after AI Move:", updatedBoard);
        setBoard(updatedBoard); // Apply state update
        console.log("State Updated: AI move applied.");
        setCurrentTurn(playerColor); // Switch back to player's turn
      } else {
        console.log("AI has no valid moves. Skipping turn.");
        setCurrentTurn(playerColor); // Skip turn
      }
    }, 500);
  };


  const handleSquareClick = (row: number, col: number) => {
    if (currentTurn !== playerColor) return; // Ignore clicks if it's not the player's turn

    const square = board[row][col];

    if (selectedPiece) {
      // Attempt to create a move
      const move: Move = { from: selectedPiece, to: { row, col } };

      if (validateMove(board, move, playerColor)) {
        const updatedBoard = makeMove(board, move);
        setBoard(updatedBoard);
        setSelectedPiece(null);
        setCurrentTurn(aiColor); // Switch turn to AI
        triggerAIMove(updatedBoard); // Trigger AI move
      } else {
        console.log("Invalid move");
        setSelectedPiece(null); // Reset selection on invalid move
      }
    } else if (square.piece && square.piece.color === playerColor) {
      // Select a piece if no piece is selected
      setSelectedPiece({ row, col });
    }
  };


  return (
      <div>
        <h1>Checkers Game</h1>
        <p>Current Turn: {currentTurn === playerColor ? "Player" : "AI"}</p>
        <Board board={board} onMove={() => {}} onSquareClick={handleSquareClick} selectedPiece={selectedPiece} />
      </div>
  );
};

export default App;
