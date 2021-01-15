import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
  constructor () {
    super({ key: 'menu' });
  }

  create () {
    this.add.image(400, 300, 'space');

    this.add.text(400, 100, 'World War Nissar\n\n< play >', {
      align: 'center',
      fill: 'red',
      fontFamily: 'sans-serif',
      fontSize: 48
    })
      .setOrigin(0.5, 0);

      this.add.text(400, 300, 'The goal with this game is to survive and earn score.\n\nDifficulty increases each new level you reach.\n\nEnemies will hurt your hp if you come too close.\n\nPicking up hearts gives you score and hp.', {
        align: 'center',
        fill: 'white',
        fontFamily: 'sans-serif',
        fontSize: 32
      })
        .setOrigin(0.5, 0);

    this.input.on('pointerdown', function () {
      this.scene.switch('play');
    }, this);
  }
}