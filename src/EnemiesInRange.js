export default function(enemiesInRange, playerHp, textPlayerHp){
    for (let enemy in enemiesInRange){
        console.log("ed: " + playerHp);
        if (playerHp > 0 ){
        playerHp -= 0.1;
        textPlayerHp.setText("Your HP: " + Math.round(playerHp)); // set the text to show the current score   
        enemiesInRange.splice(enemiesInRange.indexOf(enemy))
        }
    }
    return playerHp;
}