import Game from "./gameController";

function renderPlayerBoard(game) {
  const humanContainer = document.querySelector(".human-container");

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
  const humanContainer = document.querySelector(".human-container");

  humanContainer.innerHTML = "";
}

function renderCPUBoard(game) {
  const cpuContainer = document.querySelector(".cpu-container");

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
        maintainTurn(game);
        game.playRound();
        cell.classList.add(cpuBoard.board[x][y] === "hit" ? "hit" : "miss");
        displayResults(game);

        setTimeout(() => {
          isClickable = true;
        }, 1500);
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

function enableStartButton(game) {
  const startBtn = document.querySelector(".start-btn");
  const randomBtn = document.querySelector(".randomize-btn");
  const cpuContainer = document.querySelector(".cpu-container");
  const infoContainer = document.querySelector(".info-container");
  const legend = document.querySelector(".legend");

  startBtn.addEventListener("click", () => {
    randomBtn.style.display = "none";
    cpuContainer.style.display = "grid";
    startBtn.style.display = "none";
    infoContainer.style.display = "flex";
    legend.style.display = "flex";
    renderCPUBoard(game);
    cpuBoardEventHandler(game);
    displayTurnInfo(game);
  });
}

function displayTurnInfo(game) {
  const turnDisplay = document.querySelector(".turn-info");

  if (game.currentTurn === game.humanPlayer) {
    turnDisplay.textContent = "";
    printLetterByLetter(
      ".turn-info",
      "It's your turn, launch your torpedo!",
      10,
    );
  } else if (game.currentTurn === game.cpuPlayer) {
    turnDisplay.textContent = "";
    printLetterByLetter(
      ".turn-info",
      "It's the CPU's turn, they are launching their torpedo!",
      5,
    );
  }
}

function printLetterByLetter(element, message, speed) {
  let i = 0;
  let interval = setInterval(function () {
    document.querySelector(element).textContent += message.charAt(i);
    i++;
    if (i > message.length) {
      clearInterval(interval);
    }
  }, speed);
}

function displayError(error) {
  const popupBlock = document.querySelector(".popup-block");
  const errorContainer = document.querySelector(".error-container");
  const errorMessage = document.querySelector(".error-message");
  const closeBtn = document.querySelector(".error-close");

  errorMessage.textContent = error.message + " Close this box and try again!";
  errorContainer.style.display = "block";
  popupBlock.style.display = "block";

  closeBtn.addEventListener("click", () => {
    errorContainer.style.display = "none";
    popupBlock.style.display = "none";
  });

  if ((errorContainer.style.display = "block")) {
    return true;
  }
  return false;
}

function maintainTurn(game) {
  const errorContainer = document.querySelector(".error-container");

  if (errorContainer.style.display === "block") {
    game.currentTurn === game.humanPlayer;
  } else {
    game.switchTurn();
  }
}

function displayResults(game) {
  const popupBlock = document.querySelector(".popup-block");
  const resultContainer = document.querySelector(".result-container");
  const resultText = document.querySelector(".result");
  const playAgain = document.querySelector(".play-again");

  if (game.checkForWinner() === game.cpuPlayer) {
    popupBlock.style.display = "block";
    resultContainer.style.display = "flex";
    resultText.textContent = "CPU WINS!";
  } else if (game.checkForWinner() === game.humanPlayer) {
    popupBlock.style.display = "block";
    resultContainer.style.display = "flex";
    resultText.textContent = "CONGRATS! YOU WIN!";
  }

  playAgain.addEventListener("click", () => {
    window.location.reload();
  });
}

function gameSetup() {
  const game = new Game();

  game.setupGame();

  game.randomizeShipPlacement(game.cpuPlayer.board);
  game.randomizeShipPlacement(game.humanPlayer.board);
  enableRandomizeButton(game);
  enableStartButton(game);

  renderPlayerBoard(game);
}

export {
  updatePlayerBoardDisplay,
  displayTurnInfo,
  displayError,
  gameSetup,
  displayResults,
};
