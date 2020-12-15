export default function(player, enemies, playerX, range, enemiesInRange){
    for (var enemy of enemies){
        if (enemy.body.onFloor() & enemy.y <= 0) {
            //enemy.y -= 10;
            //enemy.setVelocityY(-500)
        }
        if (enemy.xPos >= playerX){
            //enemy.xPos -= 10;
            enemy.setVelocityX(-Phaser.Math.Between(100, 200), 20)
            enemy.flipX = false;
        }else if (enemy.xPos <= playerX) {
            //enemy.xPos += 10;
            enemy.setVelocityX(Phaser.Math.Between(100, 200), 20)
            enemy.flipX = true;
        }
        var distanceToPlayerX = Math.abs(enemy.x - player.x);
        var distanceToPlayerY = Math.abs(enemy.y - player.y);
        var distance = Math.sqrt(Math.pow(distanceToPlayerX,2) + Math.pow(distanceToPlayerY, 2));
        if (distance <= range) {
            enemiesInRange.push(enemy);
        }
          
    }
}