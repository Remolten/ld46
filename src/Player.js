import Phaser from "phaser";

export default class Player {
  constructor(scene) {
    this.scene = scene;
    this.sprite = scene.add.sprite(scene.cameras.main.centerX, scene.cameras.main.centerY, 'playerShip1_orange');

    this.dx = 0;
    this.dy = 0;
    this.speed = 0.8;
    this.boostSpeed = 2;
    this.dropMovement = 0.2;
    this.maxSpeed = 6;
    this.angularVelocity = 2 * Math.PI / 60;
  }

  update(keys) {
    let speed = this.speed;
    if (keys.shift.isDown) {
      speed = this.boostSpeed;
    }

    if (keys.w.isDown) {
      this.dx += Math.cos(this.sprite.rotation - Math.PI / 2) * speed;
      this.dy += Math.sin(this.sprite.rotation - Math.PI / 2) * speed;
    }

    // Apply friction.
    this.dx *= 0.97;
    this.dy *= 0.97;

    // Clamp dx + dy to max speed.
    const xRatio = Math.abs(this.maxSpeed / this.dx);
    const yRatio = Math.abs(this.maxSpeed / this.dy);
    const highXSpeed = Math.abs(this.dx) > this.maxSpeed;
    const highYSpeed = Math.abs(this.dy) > this.maxSpeed;
    if (highXSpeed && highYSpeed) {
      this.dx *= Math.max(xRatio, yRatio);
      this.dy *= Math.max(xRatio, yRatio);
    }
    else if (highXSpeed) {
      this.dx *= Math.abs(this.maxSpeed / this.dx);
    }
    else if (highYSpeed) {
      this.dy *= Math.abs(this.maxSpeed / this.dy);
    }

    // Prevent endless drifting by zeroing out low speeds.
    if (Math.abs(this.dx) < this.dropMovement) {
      this.dx = 0;
    }
    if (Math.abs(this.dy) < this.dropMovement) {
      this.dy = 0;
    }

    if (keys.a.isDown) {
      this.sprite.rotation -= this.angularVelocity;
    }
    if (keys.d.isDown) {
      this.sprite.rotation += this.angularVelocity;
    }

    this.sprite.x = Phaser.Math.Clamp(this.sprite.x + this.dx, 0, this.scene.cameras.main.width);
    this.sprite.y = Phaser.Math.Clamp(this.sprite.y + this.dy, 0, this.scene.cameras.main.height);
  }
}
