export default function(player, enemies, range, enemiesInRange){
    for (var enemy of enemies){
        if (enemy.body.onFloor() & enemy.y <= 0) {
        }
       // console.log("e:" + enemy.x)
        //console.log("p: " + player.x)
        if (enemy.x > player.x){
            enemy.body.setVelocityX(-Phaser.Math.Between(150, 250), 20)
            enemy.flipX = false;
        }else if (enemy.x < player.x) {
            enemy.body.setVelocityX(Phaser.Math.Between(150, 250), 20)
            enemy.flipX = true;
        } else if (enemy.x == player.x){
            enemy.body.setVelocityX(0)
        }
        var distanceToPlayerX = Math.abs(enemy.x - player.x);
        var distanceToPlayerY = Math.abs(enemy.y - player.y);
        var distance = Math.sqrt(Math.pow(distanceToPlayerX,2) + Math.pow(distanceToPlayerY, 2));
        if (distance <= range) {
            enemiesInRange.push(enemy);
        }
          
    }
}