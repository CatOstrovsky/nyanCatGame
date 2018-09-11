import config from '../config.js';
import Enemy from '../enemy.js';

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
    this.background = this.add.tileSprite(config.center.x, config.center.y, config.width, config.height, 'background');

    this.cat = this.add.tileSprite(75, config.center.y, 250, 150, 'cat').setOrigin(.5,.5).setScale(.5);
    this.cat = this.impact.add.body(200, 100).setGameObject(this.cat).setActiveCollision().setBounce(1).setMaxVelocity(150);
    this.cat.name = "cat";

    this.cursors = this.input.keyboard.createCursorKeys();
    this.CatController = new catController(this);

    enemies.push(new Enemy(this));

    this.cat.setCollideCallback(collideCallback, this);

    let conf = {
        key: 'explode',
        frames: this.anims.generateFrameNumbers('boom', { start: 0, end: 25, first: 25 }),
        frameRate: 20
    };
    this.anims.create(conf);
}

function addBoom( x, y ) {
    var boom = this.add.sprite(x, y, 'boom');
    boom.anims.play('explode');
}

function addBullet(ctx) {
    // body...
}


function collideCallback(Cat, B) {
    if(B.gameObject && B.gameObject.hasOwnProperty("name") && typeof(B.gameObject.name) == "string"){
        if(B.gameObject.name == "enemy") {
            addBoom.call(this,B.gameObject.x, B.gameObject.y);
            B.gameObject.alpha = 0;
            B.gameObject.destroy();
        }
    }
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

    this.cursorManager = () => {
        if (ctx.cursors.left.isDown)
            this.moveLeft();
        
        if (ctx.cursors.right.isDown)
            this.moveRight();
        
        if (ctx.cursors.up.isDown)
            this.moveUp();
        
        if (ctx.cursors.down.isDown)
            this.moveDown();
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

    this.background.setTilePosition(this.background.tilePositionX + 2, 0);
    this.CatController.cursorManager();
    
}

module.exports = loaderSceneConfig;