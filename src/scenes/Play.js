import Phaser from 'phaser';
import CollectCoin from '../CollectCoin'
import updateEnemies from '../Enemies'
import updateEnemiesInRange from '../EnemiesInRange'
import levelUpdater from '../LevelUpdater';
import updateMovement from '../Movement'
export default class PlayScene extends Phaser.Scene {
  constructor () {
    super({
      key: 'play',
      physics: {
        arcade: {
          gravity: { y: 300 },
          debug: false
        }
      }
    });
  }

  create () {
    this.gameOver = false;
    this.score = 0;
    this.playerHp = 100;
    this.level = 1;
    this.dmg;
    this.textPlayerHp;
    this.map;
    this.player;
    this.coins;
    this.kaka;
    this.cursors;
    this.groundLayer;
    this.coinLayer;
    this.textLevel;
    this.enemyCount = 0;
    this.enemies = [];
    this.enemiesInRange = [];
    this.range = 50;
    this.date = new Date();
    this.beforeTime = this.date.getTime();
    this.keys = this.input.keyboard.addKeys('K');
    
    // load the map 
   this.map = this.make.tilemap({key: 'map'});
   // tiles for the ground layer
   this.groundTiles = this.map.addTilesetImage('tiles');
   // create the ground layer
   this.groundLayer = this.map.createDynamicLayer('World', this.groundTiles, 0, 0);
   // the this.player will collide with this layer
   this.groundLayer.setCollisionByExclusion([-1]);

   // coin image used as tileset
    this.coinTiles = this.map.addTilesetImage('kaka');
   // add coins as tiles
   this.coinLayer = this.map.createDynamicLayer('Coins', this.coinTiles, 0, 0);

   // set the boundaries of our game world
   this.physics.world.bounds.width = this.groundLayer.width;
   this.physics.world.bounds.height = this.groundLayer.height;

   // create the this.player sprite    
   this.player = this.physics.add.sprite(200, 200, 'player');
   this.player.setBounce(0.1); // our this.player will bounce from items
   this.player.setCollideWorldBounds(true); // don't go out of the map    
   
   // small fix to our this.player images, we resize the physics body object slightly
   this.player.body.setSize(this.player.width, this.player.height-8);
   
   // this.player will collide with the level tiles 
   this.physics.add.collider(this.groundLayer, this.player);
   
for (var i = 0; i < 2; i++) {
    const x = (this.player.x < 600) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
    const enemy = this.physics.add.sprite(x, 0, "enemy").setTint(0xff0000);
    enemy.yPos = 0;
    enemy.xPos = 0;
    enemy.setScale(2.5);
    enemy.setCollideWorldBounds(true);
    enemy.setBounce(0.5);
    //enemy.setVelocity(Phaser.Math.Between(-200, 200), 20);
    enemy.allowGravity = false;
    //enemy.body.setSize(enemy.width-100, enemy.height-100);
    this.physics.add.collider(this.groundLayer, enemy);
    enemy.hp = 10;
    this.enemyCount++
    this.enemies.push(enemy);
}

   this.coinLayer.setTileIndexCallback(17, CollectCoin, this);
   // when the this.player overlaps with a tile with index 17, collectCoin 
   // will be called    
   this.physics.add.overlap(this.player, this.coinLayer);
   // this.player walk animation
   this.anims.create({
       key: 'walk',
       frames: this.anims.generateFrameNames('player', {prefix: 'p1_walk', coint: 1, end: 11, zeroPad: 2}),
       frameRate: 10,
       repeat: -1
   });
   // idle with only one frame, so repeat is not neaded
   this.anims.create({
       key: 'idle',
       frames: [{key: 'player', frame: 'p1_stand'}],
       frameRate: 10,
   });
   this.anims.create({
    key: 'spin', 
    frames: this.anims.generateFrameNames('kaka', { 
    frames: ['0', '1', '5', '4', '2', '3']}), 
    frameRate: 10, 
    repeat: -1
})


   this.cursors = this.input.keyboard.createCursorKeys();

   // set bounds so the camera won't go outside the game world
   this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
   // make the camera follow the this.player
   this.cameras.main.startFollow(this.player);

   // set background color, so the sky is not black    
   this.cameras.main.setBackgroundColor('#ccccff');

   // this text will show the score
   this.textScore = this.add.text(20, 570, 'Score: 0', {
       fontSize: '20px',
       fill: '#ffffff'
   });
   // fix the text to the camera
   this.textScore.setScrollFactor(0);
   this.textPlayerHp = this.add.text(140, 570, 'Your HP: 100', {
       fontSize: '20px',
       fill: '#ffffff'
   });
   // fix the text to the camera
   this.textPlayerHp.setScrollFactor(0);
   this.textLevel = this.add.text(300, 570, 'Level: 1', {
       fontSize: '20px',
       fill: '#ffffff'
   });
   // fix the text to the camera
   this.textLevel.setScrollFactor(0);
    // // https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scenemanager/
    const esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    esc.on('down', () => {
      // this.scene.pause('play');
      // this.scene.setVisible(true, 'pause');
      // this.scene.moveUp('pause');
      this.scene.switch('pause');
    });

  }

  update () {
    // if (this.gameOver)
    // {
    //     return;
    // }
    //this.playerHp -= 10;

    if (this.scene.isVisible('pause')) {
        this.scene.setVisible(false, 'pause');
      }
      if (this.coinLayer.culledTiles.length == 1) {
        levelUpdater(this.coins, this.score, this.level, this.textLevel, this.textPlayerHp, this);
        if (this.coins == undefined) {
          
          this.coins = this.physics.add.group({
      key: 'kaka',
      repeat: 30,
      setXY: { x: 0, y: 0, stepX: 70 }
  });
  this.physics.add.collider(this.groundLayer, this.coins);
  
  this.coins.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  
  });
      this.physics.add.overlap(this.player, this.coins, function (player, coin) {
          coin.disableBody(true, true);
  
      this.score += 1;
      this.playerHp += 0.5;
      this.textScore.setText('Score: ' + Math.round(this.score));
      this.textPlayerHp.setText('Your HP: ' + Math.round(this.playerHp));
  
      if (this.coins.countActive(true) === 0)
      {
          this.coins.children.iterate(function (child) {
  
              child.enableBody(true, child.x, 0, true, true);
  
          });
  
      }
      }, null, this);
        }
      }
if (this.level == 2){
    if (this.enemyCount < 5){
    for (var i = 0; i < 3; i++){
        const x = (this.player.x < 600) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        //const x = Math.floor(Math.random()*500);
        const enemy = this.physics.add.sprite(x, 0, "enemy").setTint(0xff0000);
        enemy.setScale(2.5);
        enemy.setCollideWorldBounds(true);
        enemy.setBounce(0.5);
        //enemy.setVelocity(Phaser.Math.Between(-200, 200), 20);
        enemy.allowGravity = false;
        //enemy.body.setSize(enemy.width-100, enemy.height-100);
        this.physics.add.collider(this.groundLayer, enemy);
        enemy.hp = 15;
        this.enemyCount++;
        this.enemies.push(enemy);
    }
}
}   
if (this.level == 3){
    if (this.enemyCount < 5){
    for (var i = 0; i < 4; i++){
        const x = (this.player.x < 600) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        const enemy = this.physics.add.sprite(x, 0, "enemy").setTint(0xff0000);
        enemy.setScale(2.5);
        enemy.setCollideWorldBounds(true);
        enemy.setBounce(0.5);
        //enemy.setVelocity(Phaser.Math.Between(-200, 200), 20);
        enemy.allowGravity = false;
        this.physics.add.collider(this.groundLayer, enemy);
        enemy.hp = 15;
        this.enemyCount++;
        this.enemies.push(enemy);
    }
}
}
this.enemiesInRange = [];
    this.enemiesInRange = updateEnemies(this.player, this.enemies, this.range, this.enemiesInRange);
    this.playerHp = updateEnemiesInRange(this.enemiesInRange, this.playerHp, this.textPlayerHp);
    if (this.playerHp <= 0){
        this.scene.start('end');
        //this.scene.remove();
    }
    updateMovement(this.cursors, this.player, this.keys);
    if (this.scene.isVisible('pause')) {
      this.scene.setVisible(false, 'pause');
    }

}
}

  

