import Phaser from 'phaser';
import BootScene from './Boot';
import PlayScene from './Play';
import MenuScene from './Menu';
import EndScene from './End';
import PauseScene from './Pause';

export default {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  title: 'World War Nissar',
  banner: { text: 'white', background: ['#FD7400', '#FFE11A', '#BEDB39', '#1F8A70', '#004358'] },
  scene: [BootScene, MenuScene, PlayScene, EndScene, PauseScene]
};