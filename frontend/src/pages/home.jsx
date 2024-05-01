import React, { useState } from "react";
import "../homeform.css"; // Assuming you have CSS for styling
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
const Home = () => {
  const [name, setName] = useState("");
  const [menuOption, setMenuOption] = useState("");
  const [gameId, setGameId] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMenuOptionChange = (e) => {
    setMenuOption(e.target.value);
  };

  const handleGameIdChange = (e) => {
    setGameId(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(
      `Name: ${name}, Menu Option: ${menuOption}, Game ID: ${gameId}`,
    );
    axiosInstance
      .post("/home", {
        username: name,
        room_code: gameId,
        option: menuOption,
      })
      .then((data) => {
        console.log(data);
        // return redirect("/board");
        navigate("/board", {
          state: { gameId: gameId, username: name, gameOption: menuOption },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="tictactoe-page">
      <h1 className="title">Dark Dimension: Tic Tac Toe Battle</h1>
      <div className="dark-theme">
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="label">
              Enter Your Name:
            </label>
            <input
              type="text"
              id="name"
              className="input"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Choose Your Fate:</label>
            <select
              value={menuOption}
              onChange={handleMenuOptionChange}
              className="select"
            >
              <option value="">Select an option</option>
              <option value="create">Create a new game</option>
              <option value="join">Join an existing game</option>
            </select>
          </div>
          {menuOption && (
            <div className="form-group">
              <label htmlFor="gameId" className="label">
                {menuOption === "create"
                  ? "Enter Game ID:"
                  : "Enter Game ID to Join:"}
              </label>
              <input
                type="text"
                id="gameId"
                className="input"
                value={gameId}
                onChange={handleGameIdChange}
                required
              />
            </div>
          )}
          <button className="button" onClick={(e) => handleFormSubmit(e)}>
            <Link to="/board" type="submit">
              Enter the Dark Dimension
            </Link>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
