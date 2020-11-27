import Phaser from "phaser";
import mapAsset from "./assets/map.json";
import tilesAsset from "./assets/tiles.png"
import coinAsset from "./assets/coinGold.png"
import playerAsset from "./assets/player.png" 
import playerJSONAsset from "./assets/player.json"
import enemyAsset from "./assets/nisse.png";
//import enemy from "./enemy.js"

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 500},
            debug: true
        }
    },
    scene: {
        key: 'main',
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var playerHp = 100;
//var enemyHp = 10;
var level = 1;
var dmg;
var map;
var player;
var coins;
var cursors;
var groundLayer, coinLayer;
var textScore;
var textPlayerHp;
var textLevel;
var score = 0;
var enemyCount = 0;
const enemies = [];


function preload() {
        this.load.image("enemy", enemyAsset)
        // map made with Tiled in JSON format
        this.load.tilemapTiledJSON('map', mapAsset);
        // tiles in spritesheet 
        this.load.spritesheet('tiles', tilesAsset, {frameWidth: 70, frameHeight: 70});
        // simple coin image
        this.load.image('coin', coinAsset);
        // player animations
        this.load.atlas('player', playerAsset, playerJSONAsset);
}

function create() {
    // load the map 
    map = this.make.tilemap({key: 'map'});

    // tiles for the ground layer
    var groundTiles = map.addTilesetImage('tiles');
    // create the ground layer
    groundLayer = map.createDynamicLayer('World', groundTiles, 0, 0);
    // the player will collide with this layer
    groundLayer.setCollisionByExclusion([-1]);

    // coin image used as tileset
    var coinTiles = map.addTilesetImage('coin');
    // add coins as tiles
    coinLayer = map.createDynamicLayer('Coins', coinTiles, 0, 0);

    // set the boundaries of our game world
    this.physics.world.bounds.width = groundLayer.width;
    this.physics.world.bounds.height = groundLayer.height;

    // create the player sprite    
    player = this.physics.add.sprite(200, 200, 'player');
    player.setBounce(0.2); // our player will bounce from items
    player.setCollideWorldBounds(true); // don't go out of the map    
    
    // small fix to our player images, we resize the physics body object slightly
    player.body.setSize(player.width, player.height-8);
    
    // player will collide with the level tiles 
    this.physics.add.collider(groundLayer, player);
    
    for (var i = 0; i < 2; i++){
        const x = (player.x < 600) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        //const x = Math.floor(Math.random()*500);
        const enemy = this.physics.add.sprite(x, 0, "enemy").setTint(0xff0000);
        enemy.setScale(0.1);
        enemy.setCollideWorldBounds(true);
        enemy.setBounce(0.5);
        enemy.setVelocity(Phaser.Math.Between(-200, 200), 20);
        enemy.allowGravity = false;
        //enemy.body.setSize(enemy.width-100, enemy.height-100);
        this.physics.add.collider(groundLayer, enemy);
        enemy.hp = 10;
        enemyCount++
        enemies.push(enemy);
    }

    coinLayer.setTileIndexCallback(17, collectCoin, this);
    // when the player overlaps with a tile with index 17, collectCoin 
    // will be called    
    this.physics.add.overlap(player, coinLayer);
    // player walk animation
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


    cursors = this.input.keyboard.createCursorKeys();

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // make the camera follow the player
    this.cameras.main.startFollow(player);

    // set background color, so the sky is not black    
    this.cameras.main.setBackgroundColor('#ccccff');

    // this text will show the score
    textScore = this.add.text(20, 570, 'Score: 0', {
        fontSize: '20px',
        fill: '#ffffff'
    });
    // fix the text to the camera
    textScore.setScrollFactor(0);
    textPlayerHp = this.add.text(140, 570, 'Your HP: 100', {
        fontSize: '20px',
        fill: '#ffffff'
    });
    // fix the text to the camera
    textPlayerHp.setScrollFactor(0);
    textLevel = this.add.text(300, 570, 'Level: 1', {
        fontSize: '20px',
        fill: '#ffffff'
    });
    // fix the text to the camera
    textLevel.setScrollFactor(0);
}

// this function will be called when the player touches a coin
function collectCoin(sprite, tile) {
    coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
    //console.log(coinLayer.culledTiles.length)
    score++; // add 1 points to the score
    textScore.setText("Score: " + score); // set the text to show the current score
    return false;
}

function updatePlayerHPText(){
    textPlayerHp.setText("Your HP: " + playerHp);
}

function updateLevelText(){
    textLevel.setText("Level: " + level);
}



function collectCoinNext (player, coin)
{
    coin.disableBody(true, true);

    score += 1;
    textScore.setText('Score: ' + score);

    if (coins.countActive(true) === 0)
    {
        coins.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

    }
}

function attackPlayer(){

}

function attackEnemies(){

}

function update(time, delta) {
    if (coinLayer.culledTiles.length == 1) {
        if (coins == undefined){
        if (score >= 15 & score < 50){
            level++;
            updateLevelText();
        }
    }
        if (coins != undefined){
        if (coins.countActive(true) == 0){
            if (score >= 50 & score < 100){
                level++;
                updateLevelText();
            }
        }
    }
        if (coins == undefined) {
        
        coins = this.physics.add.group({
    key: 'coin',
    repeat: 30,
    setXY: { x: 0, y: 0, stepX: 70 }
});
this.physics.add.collider(groundLayer, coins);

coins.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

});
    this.physics.add.overlap(player, coins, collectCoinNext, null, this);
}
}
if (level == 2){
    if (enemyCount < 5){
    for (var i = 0; i < 3; i++){
        const x = (player.x < 600) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        //const x = Math.floor(Math.random()*500);
        const enemy = this.physics.add.sprite(x, 0, "enemy").setTint(0xff0000);
        enemy.setScale(0.1);
        enemy.setCollideWorldBounds(true);
        enemy.setBounce(0.5);
        enemy.setVelocity(Phaser.Math.Between(-200, 200), 20);
        enemy.allowGravity = false;
        //enemy.body.setSize(enemy.width-100, enemy.height-100);
        this.physics.add.collider(groundLayer, enemy);
        enemy.hp = 15;
        enemyCount++;
        enemies.push(enemy);
    }
}
}
    for (var enemy of enemies){
        //const x = Math.floor(Math.random()*5);
        const playerX = player.x;
        if (enemy.x <= playerX - 5) {
            enemy.x += 3
            //enemy.y += 3;
        } else if (enemy.x > playerX + 5){
            enemy.x -= 3
            if (enemy.y > 10) {
            enemy.y -= 3;
        }
        }
        if (enemy.x <= player.x + 1) {
            if (playerHp >= 5){
           // playerHp -= 5;
            updatePlayerHPText();
            }
        }
        if (enemy.y <= player.y + 1){
            if (playerHp >= 5){
             //   playerHp -= 5;
                updatePlayerHPText();
                }
        }
        //console.log("Moving enemy x: " + x)
    }
    if (cursors.left.isDown)
    {
        player.body.setVelocityX(-200);
        player.anims.play('walk', true); // walk left
        player.flipX = true; // flip the sprite to the left
    }
    else if (cursors.right.isDown)
    {
        player.body.setVelocityX(200);
        player.anims.play('walk', true);
        player.flipX = false; // use the original sprite looking to the right
    } else {
        player.body.setVelocityX(0);
        player.anims.play('idle', true);
    }
    // jump 
    if (cursors.up.isDown && player.body.onFloor())
    {
        player.body.setVelocityY(-500);        
    }
    //if (cursors)
}