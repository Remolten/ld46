export default class Enemy {
  constructor(scene) {
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(scene.cameras.main.width, 0, 'spaceShips_004');
    this.sprite.update = this.update.bind(this);

    this.dx = 0;
    this.dy = 0;
    this.speed = 0.6;
    this.maxSpeed = 2;
  }

  update() {
    this.sprite.rotation = Math.atan2(this.sprite.y - this.scene.cameras.main.width, 0 - this.sprite.x);

    this.dx += (0 - this.sprite.x) * this.speed;
    this.dy += (this.scene.cameras.main.height - this.sprite.y) * this.speed;

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

    this.sprite.x += this.dx;
    this.sprite.y += this.dy;
  }
}
