import React from "react";
import "../styles/Piece.css";

interface PieceProps {
    color: "red" | "black";
    isKing: boolean;
    onClick?: () => void; // Optional handler for click events
}

const Piece: React.FC<PieceProps> = ({ color, isKing, onClick }) => {
    return (
        <div className={`piece ${color}`} onClick={onClick}>
            {isKing && <div className="crown">♕</div>}
        </div>
    );
};

export default Piece;
