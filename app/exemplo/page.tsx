'use client'

import React from 'react';


export default function pvscpu(){
  const board = Array(9).fill('');
  const [field, setField] = React.useState(board);
  const [isX, setIsX] = React.useState(true)
  const [disabled, setDisabled] = React.useState<number[]>([])
  const [winner, setWinner] = React.useState <string|null> (null)
  const [isPlayerTurn, setIsPlayerTurn] = React.useState(true);
  const [botPlayed, setBotPlayed] = React.useState(false);
  const win = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  const handleClick = (index : number) => {
    if (field[index] !== '' || winner || !isPlayerTurn) {
      return;
    }

    const newField = field.slice();
    newField[index] = isX ? 'x' : 'o';
    setField(newField);
    setIsX(!isX);
    setDisabled([...disabled, index])


    for (let i = 0; i < win.length; i++) {
      const [a, b, c] = win[i];
      if (newField[a] && newField[a] === newField[b] && newField[a] === newField[c]) {
        setWinner(newField[a]);
        return;
      }
    }
    if (!newField.includes("")) {
      setWinner("empate");
    }
    setIsPlayerTurn(false);
  };

 

const handleBotMove = React.useCallback(() => {
  const emptyIndexes = field.reduce((acc, curr, index) => {
    if (curr === '') {
      acc.push(index);
    }
    return acc;
  }, []);

  if (emptyIndexes.length === 0) {
    return;
  }

  const randomIndex = Math.floor(Math.random() * emptyIndexes.length);
  const newField = field.slice();
  newField[emptyIndexes[randomIndex]] = 'o';
  setField(newField);
  setIsX(!isX);
  setDisabled([...disabled, emptyIndexes[randomIndex]]);
  setIsPlayerTurn(true);
  setBotPlayed(true);
}, [field, disabled, isX, setIsX, setDisabled, setIsPlayerTurn, setField]);

React.useEffect(() => {
  if (!isPlayerTurn && !botPlayed) {
    setTimeout(() => {
      handleBotMove();
    }, 500);
  } else if (botPlayed) {
    setBotPlayed(false);
  }
}, [isPlayerTurn, botPlayed, handleBotMove]);

  

  const handleRestart = () => {
    setField(board);
    setIsX(true);
    setDisabled([...disabled, Math.floor(Math.random() * 9)]);
    setWinner(null);
  };

 

  return (
    <>
    <div className="flex flex-col items-center h-screen w-full bg-black">
      <div className="grid grid-cols-3 gap-4 mx-auto my-8">
        {field.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-center bg-purple-500 rounded-lg text-center h-48 text-6xl w-48   cursor-pointer   ${
              disabled.includes(index) ? 'cursor-not-allowed' : ''
            } ${item === 'x' ? 'text-white  font-bold ' : 'text-black'}`}
            onClick={() => handleClick(index)}
          >
            {item}
          </div>
        ))}
      </div>
      <div className='flex flex-wrap justify-between'>
        {winner && 
          <p className='bg-white rounded-lg p-4 mx-8'>
          {winner === "empate" ? "Empate!" : <span className='text-2xl font-mono'> O vencedor é: <span className='text-4xl text-purple-900 font-bold font-sans'>{winner}</span></span>}
          </p>
        }
       <button className='bg-yellow-300 hover:bg-yellow-500 text-black font-bold font-mono py-2 px-4 rounded shadow-sm shadow-red-100' onClick={handleRestart}>Reiniciar</button>
      </div>
     


    </div>
    
  </>
  );
}
