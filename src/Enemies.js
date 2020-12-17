export default function(player, enemies, range, enemiesInRange){
    for (var enemy of enemies){
        if (enemy.body.onFloor() & enemy.y <= 0) {
            enemy.body.setVelocityY(-500); 
        }
        if (enemy.y > player.y){
            enemy.body.setVelocityY(-Phaser.Math.Between(100, 150), 20)
        }else if (enemy.y < player.y) {
            enemy.body.setVelocityY(Phaser.Math.Between(100, 150), 20)
        } else if (Math.round(enemy.y) == Math.round(player.y)){
            enemy.body.setVelocityY(0)
        }
        console.log("e y:" + enemy.y)
        console.log("p y: " + player.y)
        if (enemy.x > player.x){
            enemy.body.setVelocityX(-Phaser.Math.Between(100, 250), 20)
            enemy.flipX = false;
        }else if (enemy.x < player.x) {
            enemy.body.setVelocityX(Phaser.Math.Between(100, 250), 20)
            enemy.flipX = true;
        } else if (Math.round(enemy.x) == Math.round(player.x)){
            enemy.body.setVelocityX(0)
        }
        var distanceToPlayerX = Math.abs(enemy.x - player.x);
        var distanceToPlayerY = Math.abs(enemy.y - player.y);
        var distance = Math.sqrt(Math.pow(distanceToPlayerX,2) + Math.pow(distanceToPlayerY, 2));
        if (distance <= range) {
            enemiesInRange.push(enemy);
        }
          
    }
    return enemiesInRange;
}