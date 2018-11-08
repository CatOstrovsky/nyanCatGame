import config from '../config.js';
import Background from '../background.js';

var loaderSceneConfig = {
    key: 'rip',
    active: false,
    preload: bootLoader,
    create: bootCreate,
    update: update
},
locked = true;

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
    let graphics = this.add.graphics({ fillStyle: { color: 0x202020 } }),
    bg = new Phaser.Geom.Rectangle(0, 0, config.width, config.height);
    graphics.fillRectShape(bg);

    let toptext = this.add.text(config.center.x, -100, 'GAME OVER', {fontSize: "50px"}).setOrigin(.5,.5),
    downtext = this.add.text(config.center.x, -50, 'You lost the game, but the battle is still going on...', {fontSize: "25px"}).setOrigin(.5,.5);

    this.tweens.add({
        targets: toptext,
        duration: 1000,
        delay: 500,
        y: {value: config.center.y - 200, ease: 'Bounce.easeInOut'}
    });

    this.tweens.add({
        targets: downtext,
        duration: 1000,
        y: {value: config.center.y - 150, ease: 'Bounce.easeInOut'}
    });

    let cat = this.add.image(-200, config.center.y, 'rip').setOrigin(.5, .5).setScale(.6);
    this.tweens.add({
        targets: cat,
        x: config.center.x+config.width/4,
        y: config.height-50,
        duration: 2000,
        angle: 1080,
        ease: 'Bounce.easeInOut'
    });

    this.time = new Date().getTime();

    locked = true;
    setTimeout(() => {
      let text = this.add.text(config.center.x, config.center.y, 'Press enter to gone menu', {fontSize: "25px"}).setOrigin(.5,.5).setAlpha(0);
      this.tweens.add({
        targets: text,
        alphaTopLeft: { value: 1, duration: 1000, ease: 'Power1' },
        alphaBottomRight: { value: 1, duration: 2000, ease: 'Power1' },
        alphaBottomLeft: { value: 1, duration: 1000, ease: 'Power1', delay: 1000 },
        yoyo: true,
        repeat: Infinity
       });

      locked = false;
    }, 2500)

    makeRain.call(this);

    this.input.keyboard.on('keydown', (event) => {
        if(event.code == "Enter")
            this.scene.start('menu');      
    });
}

function addRainItem() {
    let rainItem = this.add.image(config.width*1.5 * Math.random(), -50, 'rain').setScale(.2);
    this.tweens.add({
        targets: rainItem,
        x: rainItem.x - 300,
        y: config.height+50,
        duration: 2200,
        ease: 'Linear',
        onComplete: () => {
            rainItem.destroy();
            addRainItem.call(this);
        }
    });
}

function makeRain() {

    for (let i = 250 - 1; i >= 0; i--) {
        setTimeout(() => {
         addRainItem.call(this);
        }, 20*i)
    }
    
}

function update() {

    if(this.input.pointer1.isDown && !locked)
        this.scene.start('menu');

    if(this.time+5000 < new Date().getTime()) {
        this.time = new Date().getTime();
        this.cameras.main.flash();
        setTimeout(() => {
          this.cameras.main.flash();
        }, 350)
    }

}

module.exports = loaderSceneConfig;