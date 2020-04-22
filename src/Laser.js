export default class Laser {
  constructor(scene, x, y, rotation) {
    this.sprite = scene.physics.add.sprite(x, y, 'laserBlue06');
    this.sprite.update = this.update.bind(this);

    this.sprite.rotation = rotation;

    this.speed = 15;
  }

  update() {
    this.sprite.x += Math.cos(this.sprite.rotation - Math.PI / 2) * this.speed;
    this.sprite.y += Math.sin(this.sprite.rotation - Math.PI / 2) * this.speed;
  }
}
