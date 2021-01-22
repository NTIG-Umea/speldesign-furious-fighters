//cursor keys etc then move
export default function (cursors, player, keys) {
    if (cursors.left.isDown)
    {
        player.body.setVelocityX(-200);
        player.flipX = true; // flip the sprite to the left
        player.anims.play('walk', true); // walk left
    }
    else if (cursors.right.isDown)
    {
        player.body.setVelocityX(200);
        player.flipX = false; // use the original sprite looking to the right
        player.anims.play('walk', true);
    } else {
        player.body.setVelocityX(0);
        player.anims.play('idle', true);
    }
    // jump 
    if (cursors.up.isDown && player.body.onFloor())
    {
        player.body.setVelocityY(-400); 
    }
    if (keys.K.isDown ){
        //Make damage to enemies
    }
}