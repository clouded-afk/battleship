function renderBoards(game) {
  const humanContainer = document.querySelector(".player-one-container");
  const cpuContainer = document.querySelector(".player-two-container");

  const humanBoard = game.humanPlayer.board.board;

  humanBoard.forEach((row) => {
    row.forEach((cell) => {
      const gridCellHuman = document.createElement("div");
      gridCellHuman.classList.add("cell");
      if (cell !== "hit" && cell !== "miss" && cell !== null) {
        gridCellHuman.classList.add("ship");
      }
      humanContainer.appendChild(gridCellHuman);
    });
  });

  const cpuBoard = game.cpuPlayer.board.board;

  cpuBoard.forEach((row) => {
    row.forEach((cell) => {
      const gridCellCpu = document.createElement("div");
      gridCellCpu.classList.add("cell");
      if (cell !== "hit" && cell !== "miss" && cell !== null) {
        gridCellCpu.classList.add("ship");
      }
      cpuContainer.appendChild(gridCellCpu);
    });
  });
}

export { renderBoards };
