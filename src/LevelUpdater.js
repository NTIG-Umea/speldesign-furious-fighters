export default function(coins, score, level, textLevel, textPlayerHp, thi){
    
        if (coins == undefined){
        if (score >= 15 & score < 30){
            level++;
            textLevel.setText("Level: " + level);
        }
    }
        if (coins != undefined){
        if (coins.countActive(true) == 0){
            if (score >= 30 & score < 80){
                level++;
                textLevel.setText("Level: " + level);
            }
            if (score >= 80 & score < 150){
                level++;
                textLevel.setText("Level: " + level)
                //move player and level text a little bit
                textPlayerHp = this.add.text(120, 570, 'Your HP: 100', {
                    fontSize: '20px',
                    fill: '#ffffff'
                });
                // fix the text to the camera
                textPlayerHp.setScrollFactor(0);
                textLevel = add.text(320, 570, 'Level: 1', {
                    fontSize: '20px',
                    fill: '#ffffff'
                });
                // fix the text to the camera
                textLevel.setScrollFactor(0);
            }
            if (score >= 150 & score < 300){
                level++;
                textLevel.setText("Level: " + level);
            }
            if (score >= 300 & score < 400){
                level++;
                textLevel.setText("Level: " + level);
            }
            if (score >= 400 & score < 500){
                level++;
                textLevel.setText("Level: " + level);
            }
            if (score >= 500 & score < 600){
                level++;
                textLevel.setText("Level: " + level);
            }
        }
}
return level;
}