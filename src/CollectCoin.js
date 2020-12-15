export default function (sprite, tile) {
    this.coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
    //console.log(coinLayer.culledTiles.length)
    this.score++; // add 1 points to the score
    this.textScore.setText("Score: " + this.score); // set the text to show the current score
    return false;
}