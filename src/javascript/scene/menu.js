import config from '../config.js';
import Background from '../background.js';

var loaderSceneConfig = {
    key: 'menu',
    active: false,
    preload: bootLoader,
    create: bootCreate,
    update: update
};
let direction = 1;

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
    this.bg = new Background(this);

    this.cat = this.add.sprite(config.center.x, config.center.y-100, 'cat').setOrigin(.5,.5).setScale(.5);
    this.cat.play('ride');

    this.add.text(config.center.x, config.center.y - 200, 'NYAN CAT', {fontSize: "50px"}).setOrigin(.5,.5);
    this.add.text(config.center.x, config.height-20, 'Made by @catOstrovsky with <3', {fontSize: "13px"}).setOrigin(.5,1);

    this.add.text(config.center.x, config.center.y+70, 'press enter to start game', {fontSize: "17px"}).setOrigin(.5,1)

    this.input.keyboard.on('keydown', (event) => {
        if(event.code == "Enter")
            this.scene.start('game');      
    });
}

function update() {

    if(this.cat.y > config.center.y-90 && direction > 0 ||
        this.cat.y < config.center.y-100 && direction < 0)
        direction *= -1;

    if(direction > 0){
        this.cat.setY(this.cat.y + .6)
    }else{
        this.cat.setY(this.cat.y - .6)
    }

    this.bg.update();

}

module.exports = loaderSceneConfig;