import Config from '../config.js';
import Enemy from '../enemy.js';
import BulletManager from '../bulletManager.js';
import Boom from '../boom.js';
import RainbowManager from '../rainbowManager.js';
import LevelManager from '../levelManager.js';
import LifeManager from '../lifeManager.js';
import Background from '../background.js';

var loaderSceneConfig = {
    key: 'game',
    active: false,
    preload: bootLoader,
    create: bootCreate,
    update: update,
},
enemies = [];

/**
 * Предвариетльная загрузка и кеширование ресурсов
 * @return void
 */
function bootLoader ()
{

}

/**
 * Событие после загрузки
 * @return void
 */
function bootCreate ()
{     
    this.impact.world.setBounds();

    this.bg = new Background(this);

    this.catSprite = this.add.sprite(75, Config.center.y, 'cat').setOrigin(.5,.5).setScale(.5);
    this.catSprite.play('ride');
    this.cat = this.impact.add.body(75, Config.center.y).setGameObject(this.catSprite).setActiveCollision().setBounce(1).setMaxVelocity(350);
    this.cat.name = "cat";

    this.LifeManager = new LifeManager(this);
    this.LevelManager = new LevelManager(this);
    this.BulletManager = new BulletManager(this);
    this.RainbowManager = new RainbowManager(this);
    this.CatController = new catController(this);
    this.cursors = this.input.keyboard.createCursorKeys();

    enemies.push(new Enemy(this));
}

function catController(ctx) {
    
    this.moveLeft = () => {
        ctx.cat.setVelocityX(ctx.cat.vel.x - 100);
    }
    this.moveRight = () => {
        ctx.cat.setVelocityX(ctx.cat.vel.x + 100);
       
    }
    this.moveUp = () => {
        ctx.cat.setVelocityY(ctx.cat.vel.y - 100);
    }
    this.moveDown = () => {
        ctx.cat.setVelocityY(ctx.cat.vel.y + 100);
    }
    this.fireBullet = () => {
        ctx.BulletManager.fire(ctx.cat.body.pos.x + ctx.cat.size.x, ctx.cat.body.pos.y + (ctx.cat.size.y / 2));
    }

    this.cursorManager = () => {
        if (ctx.cursors.left.isDown)
            this.moveLeft();
        
        if (ctx.cursors.right.isDown)
            this.moveRight();
        
        if (ctx.cursors.up.isDown)
            this.moveUp();
        
        if (ctx.cursors.down.isDown)
            this.moveDown();

        if (ctx.cursors.space.isDown)
            this.fireBullet();
    }
   
    return this;     
}


function update() {
    for(let index in enemies) {
        let enemy = enemies[index];
        if(enemy.active) {
            enemy.update();
        }else{
            enemies.splice(index, 1);
        }
    }

    if(enemies.length <= this.LevelManager.level) {
        enemies.push(new Enemy(this))
    }

    this.CatController.cursorManager();
    this.BulletManager.update();
    this.RainbowManager.update();
    this.LevelManager.update();
    this.bg.update();
    
}

module.exports = loaderSceneConfig;