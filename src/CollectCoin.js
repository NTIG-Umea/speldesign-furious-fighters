export default function (sprite, tile) {
    this.coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
    //console.log(coinLayer.culledTiles.length)
    this.score++; // add 1 points to the score
    this.playerHp += 0.5;
    this.textPlayerHp.setText("Your HP: " + Math.round(this.playerHp))
    this.textScore.setText("Score: " + Math.round(this.score)); // set the text to show the current score
    return false;
}