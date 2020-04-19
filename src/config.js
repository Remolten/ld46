import {preload, create, update} from "./game";

export const parent = 'phaser-game';
export const config = {
  type: Phaser.AUTO,
  parent,
  width: 800,
  height: 600,
  scene: {
    preload,
    create,
    update
  }
};
