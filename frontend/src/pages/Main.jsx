import React, { useState } from "react";
import "../FullPageGame.css"; // Assuming you have CSS for styling
import TicTacToeBoard from "./Board";

const FullPageTicTacToe = () => {
  return (
    <div className="full-page-tictactoe">
      <div className="content">
        <h1 className="title">Dark Dimension: Tic Tac Toe Battle</h1>
        <div className="game-container">
          <TicTacToeBoard />
        </div>
      </div>
    </div>
  );
};

export default FullPageTicTacToe;
