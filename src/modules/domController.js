function renderBoards(game) {
  const humanContainer = document.querySelector(".player-one-container");
  const cpuContainer = document.querySelector(".player-two-container");

  const humanBoard = game.humanPlayer.board.board;

  for (let i = 0; i < humanBoard.length; i++) {
    for (let j = 0; j < humanBoard[0].length; j++) {
      const gridCellHuman = document.createElement("div");
      gridCellHuman.setAttribute("data-coordinates", `${i}, ${j}`);
      gridCellHuman.classList.add("human-cell");

      const gridCellCpu = document.createElement("div");
      gridCellCpu.setAttribute("data-coordinates", `${i}, ${j}`);
      gridCellCpu.classList.add("cpu-cell");

      if (
        humanBoard[i][j] !== "hit" &&
        humanBoard[i][j] !== "miss" &&
        humanBoard[i][j] !== null
      ) {
        gridCellHuman.classList.add("ship");
      }

      humanContainer.appendChild(gridCellHuman);
      cpuContainer.appendChild(gridCellCpu);
    }
  }
}

function cpuBoardEventHandler(game) {
  const cpuBoard = game.cpuPlayer.board;
  const boardCells = document.querySelectorAll(".cpu-cell");

  boardCells.forEach((cell) => {
    const coordinates = cell.getAttribute("data-coordinates").split(", ");
    const x = parseInt(coordinates[0]);
    const y = parseInt(coordinates[1]);

    cell.addEventListener("click", () => {
      if (game.currentTurn !== game.cpuPlayer) {
        cpuBoard.receiveAttack(x, y);
        game.switchTurn();
        setTimeout(() => {
          game.playRound();
        }, 750);
        cell.classList.add(cpuBoard.board[x][y] === "hit" ? "hit" : "miss");
      }
    });
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

export { renderBoards, cpuBoardEventHandler, updatePlayerBoardDisplay };
