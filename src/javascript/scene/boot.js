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
    this.load.image('ponchik', 'images/ponchik.png');
    this.load.image('rainbow', 'images/rainbow.png');
    this.load.image('heart', 'images/heart.png');
    this.load.image('candy', 'images/candy.png');
    this.load.image('rip', 'images/rip.png');
    this.load.image('rain', 'images/rain.png');

    this.load.spritesheet('stars', 'images/stars.png', { frameWidth: 25, frameHeight: 37, endFrame: 3 });
    this.load.spritesheet('bullet', 'images/bullet.png', { frameWidth: 67, frameHeight: 50, endFrame: 5 });
    this.load.spritesheet('cat', 'images/cat.png', { frameWidth: 288, frameHeight: 175, endFrame: 1 });

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
        key: 'fire',
        frames: this.anims.generateFrameNames('bullet', { start: 0, end: 4 }),
        repeat: Infinity,
        frameRate: 20
    });

    this.anims.create({
        key: 'ride',
        frames: this.anims.generateFrameNames('cat'),
        repeat: Infinity,
        frameRate: 6
    });

    this.anims.create({
        key: 'type_1',
        frames: this.anims.generateFrameNames('stars', { start: 1, end: 3 }),
        repeat: Infinity,
        frameRate: 5,
        yoyo: true
    });

    this.scene.start('menu');

}

module.exports = loaderSceneConfig;