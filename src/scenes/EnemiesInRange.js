export default function(enemiesInRange, playerHp, textPlayerHp){
    for (let enemy in enemiesInRange){
        if (playerHp > 0 ){
        playerHp -= 1;
        textPlayerHp.setText("Your HP: " + playerHp); // set the text to show the current score   
        enemiesInRange.splice(enemiesInRange.indexOf(enemy))
        }
    }
}