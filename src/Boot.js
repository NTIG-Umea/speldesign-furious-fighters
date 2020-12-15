import Phaser from 'phaser';
import images from './assets/*.png';
import json from './assets/*.json';

export default class BootScene extends Phaser.Scene {
  constructor () {
    super({ key: 'boot' });
  }

  preload () {
    var bg = this.add.rectangle(400, 300, 400, 30, 0x666666);
    var bar = this.add.rectangle(bg.x, bg.y, bg.width, bg.height, 0xffffff).setScale(0, 1);

    console.table(images);
    this.load.image("enemy", images.nisse)
    // map made with Tiled in JSON format
    this.load.tilemapTiledJSON('map', json.map);
    // tiles in spritesheet 
    this.load.spritesheet('tiles', images.tiles, {frameWidth: 70, frameHeight: 70});
    // simple coin image
    //this.load.multiatlas('kaka', 'assets/kaka.json', 'assets/');
    this.load.atlas('kaka', images.kaka, json.kaka);
    // player animations
    this.load.atlas('player', images.player, json.player);
    this.load.image('space', images.space);
    this.load.image('logo', images.logo);
    this.load.image('red', images.red);


    this.load.on('progress', function (progress) {
      bar.setScale(progress, 1);
    });
  }

  update () {
    this.scene.start('menu');
    // this.scene.start('play');
    // this.scene.remove();
  }
}