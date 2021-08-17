import React, { useState } from "react";
import ReactDOM from "react-dom";

const rowStyle = {
  display: "flex"
};

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white"
};

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid"
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column"
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px"
};

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px"
};

class Square extends React.Component {
  render() {
    const { value, isXNext, squares, setBoardState, nextSymbol } = this.props;
    const winner = calculateWinner(squares);
    return (
      <div
        className="square"
        onClick={() => {
          if (squares[value] != null || winner != null) {
            return;
          }
          const nextSquares = squares.slice();
          console.log("value", value);
          nextSquares[value] = nextSymbol;
          console.log("nextSymbol", nextSymbol);
          setBoardState({ squares: nextSquares });

          setBoardState({ isXNext: !isXNext }); // toggle turns
        }}
        style={squareStyle}
      >
        {squares[value]}
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isXNext: true,
      nextSymbol: "X"
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isXNext !== this.state.isXNext) {
      this.setState({ nextSymbol: this.state.isXNext ? "X" : "O" });
    }
  }

  getWinner() {
    const winner = calculateWinner(this.state.squares);
    if (winner) {
      return winner;
    }
    return "None";
  }

  handleReset() {
    this.setState({
      squares: Array(9).fill(null),
      isXNext: true,
      nextSymbol: "X"
    });
  }

  render() {
    return (
      <div style={containerStyle} className="gameBoard">
        <div id="statusArea" className="status" style={instructionsStyle}>
          Next player: <span>{this.state.nextSymbol}</span>
        </div>
        {calculateWinner(this.state.squares) && (
          <div id="winnerArea" className="winner" style={instructionsStyle}>
            Winner: <span>{calculateWinner(this.state.squares)}</span>
          </div>
        )}
        <button style={buttonStyle} onClick={() => this.handleReset()}>
          Reset
        </button>
        <div style={boardStyle}>
          <div className="board-row" style={rowStyle}>
            <Square
              {...this.state}
              setBoardState={this.setState.bind(this)}
              value={0}
              squares={this.state.squares}
            />
            <Square
              {...this.state}
              setBoardState={this.setState.bind(this)}
              squares={this.state.squares}
              value={1}
            />
            <Square
              {...this.state}
              setBoardState={this.setState.bind(this)}
              squares={this.state.squares}
              value={2}
            />
          </div>
          <div className="board-row" style={rowStyle}>
            <Square
              {...this.state}
              setBoardState={this.setState.bind(this)}
              squares={this.state.squares}
              value={3}
            />
            <Square
              {...this.state}
              setBoardState={this.setState.bind(this)}
              squares={this.state.squares}
              value={4}
            />
            <Square
              {...this.state}
              setBoardState={this.setState.bind(this)}
              squares={this.state.squares}
              value={5}
            />
          </div>
          <div className="board-row" style={rowStyle}>
            <Square
              {...this.state}
              setBoardState={this.setState.bind(this)}
              squares={this.state.squares}
              value={6}
            />
            <Square
              {...this.state}
              setBoardState={this.setState.bind(this)}
              squares={this.state.squares}
              value={7}
            />
            <Square
              {...this.state}
              setBoardState={this.setState.bind(this)}
              squares={this.state.squares}
              value={8}
            />
          </div>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const possibleLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  // go over all possibly winning lines and check if they consist of only X's/only O's
  for (let i = 0; i < possibleLines.length; i++) {
    const [a, b, c] = possibleLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}