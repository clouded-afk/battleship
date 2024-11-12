function renderBoard(game) {
  const humanContainer = document.querySelector(".player-one-container");
  const cpuContainer = document.querySelector(".player-two-container");

  const board = game.humanPlayer.board.board;

  board.forEach((row) => {
    row.forEach((cell) => {
      const gridCellHuman = document.createElement("div");
      const gridCellCpu = document.createElement("div");
      gridCellHuman.classList.add("cell");
      gridCellCpu.classList.add("cell");
      humanContainer.appendChild(gridCellHuman);
      cpuContainer.appendChild(gridCellCpu);
    });
  });
}

export { renderBoard };
