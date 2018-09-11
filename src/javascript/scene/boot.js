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
    this.load.image('button-start', 'images/button-start.png');
    this.load.image('cat', 'images/cat.png');
    this.load.image('fire', 'images/fire.png');
    this.load.image('ponchik', 'images/ponchik.png');

     this.load.spritesheet('boom', 'images/boom.png', { frameWidth: 64, frameHeight: 64, endFrame: 25 });

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
    this.scene.start('menu');

}

module.exports = loaderSceneConfig;