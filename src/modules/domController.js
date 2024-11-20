import Game from "./gameController";

function renderPlayerBoard(game) {
  const humanContainer = document.querySelector(".player-one-container");

  const humanBoard = game.humanPlayer.board.board;

  for (let i = 0; i < humanBoard.length; i++) {
    for (let j = 0; j < humanBoard[0].length; j++) {
      const gridCellHuman = document.createElement("div");
      gridCellHuman.setAttribute("data-coordinates", `${i}, ${j}`);
      gridCellHuman.classList.add("human-cell");

      if (
        humanBoard[i][j] !== "hit" &&
        humanBoard[i][j] !== "miss" &&
        humanBoard[i][j] !== null
      ) {
        gridCellHuman.classList.add("ship");
      }

      humanContainer.appendChild(gridCellHuman);
    }
  }
}

function removePlayerBoard() {
  const humanContainer = document.querySelector(".player-one-container");

  humanContainer.innerHTML = "";
}

function renderCPUBoard(game) {
  const cpuContainer = document.querySelector(".player-two-container");

  const cpuBoard = game.cpuPlayer.board.board;

  for (let i = 0; i < cpuBoard.length; i++) {
    for (let j = 0; j < cpuBoard[0].length; j++) {
      const gridCellCpu = document.createElement("div");
      gridCellCpu.setAttribute("data-coordinates", `${i}, ${j}`);
      gridCellCpu.classList.add("cpu-cell");

      cpuContainer.appendChild(gridCellCpu);
    }
  }
}

function cpuBoardEventHandler(game) {
  const cpuBoard = game.cpuPlayer.board;
  const boardCells = document.querySelectorAll(".cpu-cell");
  let isClickable = true;

  boardCells.forEach((cell) => {
    const coordinates = cell.getAttribute("data-coordinates").split(", ");
    const x = parseInt(coordinates[0]);
    const y = parseInt(coordinates[1]);

    const handleClick = () => {
      if (game.currentTurn !== game.cpuPlayer && isClickable) {
        isClickable = false;
        cpuBoard.receiveAttack(x, y);
        game.switchTurn();
        game.playRound();
        cell.classList.add(cpuBoard.board[x][y] === "hit" ? "hit" : "miss");
        game.checkForWinner();

        setTimeout(() => {
          isClickable = true;
        }, 1000);
      }
    };

    cell.addEventListener("click", handleClick);
  });
}

function updatePlayerBoardDisplay(board, x, y) {
  const boardCells = document.querySelectorAll(".human-cell");

  boardCells.forEach((cell) => {
    if (cell.getAttribute("data-coordinates") === `${x}, ${y}`) {
      cell.classList.add(board.board[x][y] === "hit" ? "hit" : "miss");
    }
  });
}

function enableRandomizeButton(game) {
  const randomBtn = document.querySelector(".randomize-btn");

  randomBtn.addEventListener("click", () => {
    game.randomizeShipPlacement(game.humanPlayer.board);
    removePlayerBoard();
    renderPlayerBoard(game);
  });
}

export {
  renderPlayerBoard,
  cpuBoardEventHandler,
  updatePlayerBoardDisplay,
  renderCPUBoard,
  enableRandomizeButton,
};
