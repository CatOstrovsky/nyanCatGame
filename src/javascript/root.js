import config from './config.js'
import boot from './scene/boot.js'
import menu from './scene/menu.js'
import game from './scene/game.js'
import rip from './scene/rip.js'

config.scene = [ boot, menu, game, rip ];
var Game = new Phaser.Game(config);