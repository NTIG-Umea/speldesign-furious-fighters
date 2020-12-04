import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
  constructor () {
    super({ key: 'menu' });
  }

  create () {
    this.add.image(400, 300, 'space');

    this.add.text(400, 200, 'World War Nissar\n\n< play >', {
      align: 'center',
      fill: 'red',
      fontFamily: 'sans-serif',
      fontSize: 48
    })
      .setOrigin(0.5, 0);

    this.input.on('pointerdown', function () {
      this.scene.switch('play');
    }, this);
  }
}