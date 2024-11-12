import Gameboard from "../classes/gameboard";
import Ship from "../classes/ship";
import Player from "../classes/player";

export default class Game {
  constructor() {
    this.humanPlayer = null;
    this.cpuPlayer = null;
    this.currentTurn = this.humanPlayer;
  }

  createPlayers() {
    this.humanPlayer = new Player();
    this.cpuPlayer = new Player();

    this.humanPlayer.board = new Gameboard();
    this.cpuPlayer.board = new Gameboard();

    this.humanPlayer.board.createGameboard();
    this.cpuPlayer.board.createGameboard();
  }

  switchTurn() {
    this.currentTurn =
      this.currentTurn === this.humanPlayer ? this.cpuPlayer : this.humanPlayer;
  }
}
