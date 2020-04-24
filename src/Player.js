import Phaser from "phaser";

export default class Player {
  constructor(scene) {
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(0, 0, 'playerShip1_orange');
    this.sprite.update = this.update.bind(this);

    this.laserCooldown = 15;
    this.laserSpeed = 700;
    this.speed = 0.8;
    this.boostSpeed = 2;
    this.dropMovement = 0.2;
    this.maxSpeed = 6;
    this.angularVelocity = 2 * Math.PI / 60;
  }

  init() {
    this.sprite.x = this.scene.cameras.main.centerX;
    this.sprite.y = this.scene.cameras.main.centerY;
    this.laserCooldownCounter = 0;
    this.dx = 0;
    this.dy = 0;
  }

  shoot(lasersGroup) {
    const laser = lasersGroup.create(this.sprite.x, this.sprite.y);
    laser.rotation = this.sprite.rotation;

    laser.setVelocity(
      Math.cos(this.sprite.rotation - Math.PI / 2) * this.laserSpeed,
      Math.sin(this.sprite.rotation - Math.PI / 2) * this.laserSpeed
    );
  }

  update(keys, lasersGroup) {
    /// Lasers ///
    this.laserCooldownCounter += 1;
    if (keys.space.isDown && this.laserCooldownCounter >= this.laserCooldown) {
      this.laserCooldownCounter = 0;
      this.shoot(lasersGroup);
    }

    /// Movement ///
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
