import Phaser from "phaser";
import playerShip1_orange from "./assets/playerShip1_orange.png";
import Player from "./Player";

export const parent = 'scene-game';
export default class Game {
  constructor() {
    this.scene = new Phaser.Scene('game');
    this.scene.preload = this.preload.bind(this);
    this.scene.create = this.create.bind(this);
    this.scene.update = this.update.bind(this);

    const config = {
      type: Phaser.AUTO,
      parent,
      width: 1200,
      height: 800,
      scene: this.scene
    };

    new Phaser.Game(config);
  }

  preload() {
    this.scene.load.image('playerShip1_orange', playerShip1_orange);

    const w = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    const a = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    const s = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    const d = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    const q = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    const e = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    const shift = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    const space = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.keys = {w, a, s, d, q, e, shift, space};
  }

  create() {
    this.player = new Player(this.scene);
  }

  update() {
    this.player.update(this.keys)
  }
}
