import React, { useState, useEffect, useRef } from "react";
import "../TicTacToeBoard.css";
import { useLocation, useNavigate } from "react-router-dom";
const TicTacToeBoard = () => {
  const navigate = useNavigate();
  const wsRef = useRef(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const location = useLocation();
  const { gameId, username, gameOption } = location.state;
  const [opponent, setOpponent] = useState({});
  let symbol = "";
  gameOption === "create" ? (symbol = "X") : (symbol = "O");
  const temp = {
    name: username,
    symbol: symbol,
  };
  useEffect(() => {
    const url = `ws://localhost:8000/ws/game/${gameId}`;
    const ws = new WebSocket(url);
    wsRef.current = ws;
    ws.onopen = (event) => {
      console.log("socket connected ");
    };
    ws.onmessage = (event) => {
      // get the index that we have to change and update the board
      console.log(`data  ${event.data}`);
      const messageData = JSON.parse(event.data);
      if (messageData["username"] !== username) {
        setOpponent({
          name: messageData["username"],
          symbol: messageData["symbol"],
        });
      }
      const otherSymbol = messageData["symbol"];
      const otherIndex = messageData["index"];
      console.log(messageData);
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[otherIndex] = otherSymbol;
        return newBoard;
      });
      // const sym = checkWin(board);
      // if (sym != null) {
      //   if (sym === temp.symbol) {
      //     navigate("/winner", { state: { winner: temp.name } });
      //   } else {
      //     navigate("/winner", { state: { winner: opponent.name } });
      //   }
      //   return;
    };
    ws.onclose = (event) => {
      console.log("socket disconnected ");
    };
    ws.onerror = (event) => {
      console.log(event);
    };
  }, [gameId, navigate, symbol, username, opponent]);

  const handleSquareClick = (index) => {
    if (board[index] != null) return;
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[index] = symbol;
      return newBoard;
    });
    // const sym = checkWin(board);
    // if (sym != null) {
    //   if (sym === temp.symbol) {
    //     navigate("/winner", { state: { winner: temp.name } });
    //   } else {
    //     navigate("/winner", { state: { winner: opponent.name } });
    //   }
    //   return;
    // } else {
    wsRef.current.send(
      JSON.stringify({
        username: username,
        symbol: symbol,
        index: index,
      }),
    );
  };
  useEffect(() => {
    const winner = checkWin(board);
    if (winner) {
      if (winner === temp.symbol) {
        // wsRef.current.send(
        //   JSON.stringify({
        //     winner: temp.name,
        //     room_code: gameId,
        //   }),
        // );
        // wsRef.current.close();
        navigate("/winner", { state: { winner: temp.name } });
      } else {
        // wsRef.current.send(
        //   JSON.stringify({
        //     winner: opponent.name,
        //     room_code: gameId,
        //   }),
        // );
        // wsRef.current.close();
        navigate("/winner", { state: { winner: opponent.name } });
      }
    }
  }, [board, navigate, temp.symbol, opponent.name]);

  function checkWin(board) {
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let combo of winCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return the winning symbol ('X' or 'O')
      }
    }

    return null;
  }

  return (
    <div className="tictactoe-board">
      {board.map((value, index) => (
        <div
          key={index}
          className="square"
          onClick={() => handleSquareClick(index)}
        >
          {value === "X" && <div className="symbol">X</div>}
          {value === "O" && <div className="symbol">O</div>}
        </div>
      ))}
    </div>
  );
};

export default TicTacToeBoard;
