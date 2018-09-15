import Config from '../config.js';
import Enemy from '../enemy.js';
import BulletManager from '../bulletManager.js';
import Boom from '../boom.js';
import RainbowManager from '../rainbowManager.js';

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
    this.level = 1;
    this.stage = 1;
    this.time = 0;

    this.background = this.add.tileSprite(Config.center.x, Config.center.y, Config.width, Config.height, 'background');

    this.catSprite = this.add.tileSprite(75, Config.center.y, 250, 150, 'cat').setOrigin(.5,.5).setScale(.5);
    this.cat = this.impact.add.body(200, 100).setGameObject(this.catSprite).setActiveCollision().setBounce(1).setMaxVelocity(200);
    this.cat.name = "cat";

    this.add.text(Config.width / 2, 20, `Level ${this.level} - ${this.stage}`, {fontSize:"27px"}).setOrigin(.5, 0);

    for (var i = 3; i >= 1; i--) {
        this.add.image(i*40, 20, 'heart').setOrigin(.5, 0).setScale(1.2);
    }

    let timer = this.add.text(Config.width - 40, 20, `0:00`, {fontSize:"27px"}).setOrigin(1, 0);
    this.add.image(timer.x - timer.width - 15, 17, 'alarm').setOrigin(1, 0).setScale(1.2);

    setInterval(() => {
      this.time += 1;
      let min = parseInt(this.time/60),
      seconds = this.time - (min * 60);
      if(seconds < 10)
        seconds = `0${seconds}`;

      timer.setText(`${min}:${seconds}`)
    }, 1000)


    this.BulletManager = new BulletManager(this);
    this.RainbowManager = new RainbowManager(this);
    this.CatController = new catController(this);
    this.cursors = this.input.keyboard.createCursorKeys();

    enemies.push(new Enemy(this));
}

function catController(ctx) {
    
    this.moveLeft = () => {
        ctx.cat.setVelocityX(ctx.cat.vel.x - 15);
    }
    this.moveRight = () => {
        ctx.cat.setVelocityX(ctx.cat.vel.x + 15);
       
    }
    this.moveUp = () => {
        ctx.cat.setVelocityY(ctx.cat.vel.y - 15);
    }
    this.moveDown = () => {
        ctx.cat.setVelocityY(ctx.cat.vel.y + 15);
    }
    this.fireBullet = () => {
        // Evil eyes
        ctx.catSprite.setTilePosition(-250, 0);
        setTimeout(() => {
          ctx.catSprite.setTilePosition(0, 0);
        }, 100)

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

    if(enemies.length <= 0) {
        enemies.push(new Enemy(this))
    }

    this.background.setTilePosition(this.background.tilePositionX + 5, 0);
    this.CatController.cursorManager();

    this.BulletManager.update();
    this.RainbowManager.update();
    
}

module.exports = loaderSceneConfig;