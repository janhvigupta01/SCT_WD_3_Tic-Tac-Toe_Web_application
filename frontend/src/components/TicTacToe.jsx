import { useState, useEffect } from "react";
import Board from "./Board";

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [mode, setMode] = useState("player");
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const checkWinner = (newBoard) => {
    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        setWinner(newBoard[a]);
        setScores((prev) => ({
          ...prev,
          [newBoard[a]]: prev[newBoard[a]] + 1,
        }));
        return true;
      }
    }

    if (!newBoard.includes("")) {
      setWinner("Draw");
    }

    return false;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";

    setBoard(newBoard);

    if (!checkWinner(newBoard)) {
      setIsXTurn(!isXTurn);
    }
  };

  // Computer move
  useEffect(() => {
    if (mode === "computer" && !isXTurn && !winner) {
      const emptyIndexes = board
        .map((val, idx) => (val === "" ? idx : null))
        .filter((val) => val !== null);

      const randomMove =
        emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

      setTimeout(() => {
        handleClick(randomMove);
      }, 500);
    }
  }, [isXTurn]);

  const restartGame = () => {
    setBoard(Array(9).fill(""));
    setWinner(null);
    setIsXTurn(true);
  };

  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-md">
      <h1 className="text-4xl font-bold text-white text-center mb-6">
        Tic Tac Toe
      </h1>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setMode("player")}
          className={`px-4 py-2 rounded-xl ${
            mode === "player"
              ? "bg-blue-500 text-white"
              : "bg-white/20 text-white"
          }`}
        >
          PvP
        </button>

        <button
          onClick={() => setMode("computer")}
          className={`px-4 py-2 rounded-xl ${
            mode === "computer"
              ? "bg-pink-500 text-white"
              : "bg-white/20 text-white"
          }`}
        >
          Vs Computer
        </button>
      </div>

      <div className="flex justify-between text-white mb-6 text-lg">
        <p>X: {scores.X}</p>
        <p>O: {scores.O}</p>
      </div>

      {!winner && (
        <p className="text-center text-white mb-4 text-xl">
          Turn: {isXTurn ? "X" : "O"}
        </p>
      )}

      {winner && (
        <p className="text-center text-yellow-300 mb-4 text-2xl font-bold">
          {winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`}
        </p>
      )}

      <Board board={board} handleClick={handleClick} />

      <button
        onClick={restartGame}
        className="w-full mt-6 py-3 rounded-xl bg-linear-to-r from-blue-500 to-purple-500 text-white font-bold hover:scale-105 transition"
      >
        Restart Game
      </button>
    </div>
  );
};

export default TicTacToe;