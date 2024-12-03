export type Piece = {
    id: string;
    color: "red" | "black";
    isKing: boolean;
    position: { row: number; col: number };
};

export type Square = {
    isDark: boolean;
    piece?: Piece;
};

export type Move = {
    from: { row: number; col: number };
    to: { row: number; col: number };
};

export type Board = Square[][];
