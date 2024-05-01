import React from "react";
import { useLocation } from "react-router-dom";
import "../WinnerBanner.css"; // Import CSS file for styling

const WinnerBanner = () => {
  const location = useLocation();
  const winner = location.state.winner;
  return (
    <div className="main-winner">
      <div className="winner-banner">
        {winner ? (
          <p className="winner-text">{winner} wins!</p>
        ) : (
          <p>No winner yet.</p>
        )}
      </div>
    </div>
  );
};

export default WinnerBanner;
