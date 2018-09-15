import config from '../config.js';

var loaderSceneConfig = {
    key: 'boot',
    active: false,
    preload: bootLoader,
    create: bootCreate
};

/**
 * Предвариетльная загрузка и кеширование ресурсов
 * @return void
 */
function bootLoader ()
{
    this.load.image('background', 'images/background.jpg');
    this.load.image('cat', 'images/cat.png');
    this.load.image('ponchik', 'images/ponchik.png');
    this.load.image('rainbow', 'images/rainbow.png');
    this.load.image('heart', 'images/heart.png');
    this.load.image('alarm', 'images/alarm.png');

    this.load.spritesheet('boom', 'images/boom.png', { frameWidth: 64, frameHeight: 64, endFrame: 25 });
    this.load.spritesheet('bullet', 'images/bullet.png', { frameWidth: 67, frameHeight: 50, endFrame: 5 });


    var progress = this.add.graphics();
    var onProgress = (value) => {
        progress.clear();
        progress.fillStyle(0xffffff, 1);
        progress.fillRect(0, config.center.y, config.width * value, 60);
    }

    this.load.on('progress', (value) => {
        onProgress(value);
    });

}

/**
 * Событие после загрузки
 * @return void
 */
function bootCreate ()
{   
    this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('boom', { start: 0, end: 25, first: 25 }),
        frameRate: 20
    });

    this.anims.create({
        key: 'fire',
        frames: this.anims.generateFrameNames('bullet', { start: 0, end: 4 }),
        repeat: Infinity,
        frameRate: 20
    });

    this.scene.start('menu');

}

module.exports = loaderSceneConfig;