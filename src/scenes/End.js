import Phaser from 'phaser';
import Hiscore from '../Hiscore';

export default class EndScene extends Phaser.Scene {
  constructor () {
    super({ key: 'end' });
  }

  create () {
    this.add.image(400, 300, 'space');

    const hiscore = new Hiscore('http://localhost:3000');

    const handle = prompt("Skriv ditt namn: ");

    hiscore.postScore(666, this.game.score, handle);

    this.add.text(400, 200, 'Game Over\n\n< menu >', {
      align: 'center',
      fill: 'red',
      fontFamily: 'sans-serif',
      fontSize: 48
    })
      .setOrigin(0.5, 0);

    this.input.on('pointerdown', function () {
      this.scene.switch('menu');
    }, this);
  }
}