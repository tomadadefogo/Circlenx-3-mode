'use client'
import React  from "react";
import Link from 'next/link'
export default function cpuvscpu(){

const win = [  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];


  const [board, setBoard] = React.useState(Array(9).fill(""));
  const [turn, setTurn] = React.useState("X");
  const [playing, setPlaying] = React.useState(false);
  const [winner, setWinner] = React.useState<string | null>(null);


  const checkWinner = (board: string[], player: string): boolean => {
    for (let i = 0; i < win.length; i++) {
      const [a, b, c] = win[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c] && board[a] === player) {
        return true;
      }
    }
    return false;
  };
  

  const makeMove = (index: number, player: string) => {
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
  };

  const playBot = () => {
    const emptyCells = board.reduce(
      (accumulator, currentValue, index) => {
        if (currentValue === "") {
          return [...accumulator, index];
        }
        return accumulator;
      },
      []
    );

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const randomCell = emptyCells[randomIndex];
    makeMove(randomCell, turn === "X" ? "O" : "X");
    setTurn(turn === "X" ? "O" : "X");
  };

  const handleClick = (index: number) => {
    if (!playing) {
      return;
    }
  
    if (board[index] === "") {
      makeMove(index, turn);
      setTurn(turn === "X" ? "O" : "X");
  
      const currentPlayerWon = checkWinner(board, turn);
      if (currentPlayerWon) {
        setWinner(turn);
        setPlaying(false);
      } else {
        const isTie = board.every((cell) => cell !== "");
        if (isTie) {
          setWinner("empate");
          setPlaying(false);
        }
      }
    }
  };
  

  React.useEffect(() => {
    if (!playing) {
      return;
    }

    const botInterval = setInterval(() => {
      playBot();
    }, 1000);

    return () => clearInterval(botInterval);
  }, [board, turn, playing]);

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setTurn("X");
    setWinner(null);
    setPlaying(false);
  };


  return (
    <div className="flex flex-col items-center h-screen w-full bg-black">
  <div className="grid grid-cols-3 gap-4 mx-auto my-8">
    {board.map((cell, index) => (
      <div
        key={index}
        className={`flex items-center justify-center bg-purple-500 rounded-lg text-center h-48 text-6xl w-48 cursor-pointer ${
          cell === "X"
            ? "text-white font-bold"
            : cell === "O"
            ? "text-black font-bold"
            : ""
        }`}
        style={{ width: 'calc(100vw / 4 - 1rem)' }}
        onClick={() => handleClick(index)}
      >
        {cell}
      </div>
    ))}
  </div>
  <div className="flex">
    <button
      className='bg-yellow-300 hover:bg-yellow-500 text-black font-bold font-mono py-2 px-4 rounded shadow-sm shadow-red-100 '
      onClick={() => setPlaying(true)}
    >
      Play
    </button>
    <button
      className='bg-yellow-300 hover:bg-yellow-500 text-black font-bold font-mono py-2 px-4 rounded shadow-sm shadow-red-100 mx-4'
      onClick={() => resetGame()}
    >
      Reseta
    </button>
  </div>
  <div className='flex mt-4'>
    <div className='bg-white p-2 rounded'>
      <Link href='/exemplo'>Player VS CPU</Link>
    </div>
    <div className='bg-white mx-2 p-2 rounded'>
      <Link href='/'>Player vs Player</Link>
    </div>
  </div>
</div>

  );
  }