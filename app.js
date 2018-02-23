var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.spritesheet('loader', 'images/loader.png', 50, 50, 4);
    game.load.spritesheet('ship', 'images/cat.png', 250, 150, 2);
    
    game.load.spritesheet('boom', 'images/boom.png', 64, 64, 25);

    game.load.spritesheet('bullet', 'images/fire.png', 66.6, 50, 6);

    game.load.image('ponchik', 'images/ponchik.png');

    game.load.image('background', 'images/background.jpg');
    game.load.image('menuback', 'images/menuBack.jpg');

    game.load.image('button-start', 'images/button-start.png');
    game.load.image('button-options', 'images/button-options.png');

    game.load.audio('game', ['http://cs1-50v4.vk-cdn.net/p6/42e1ad70a7ebf1.mp3?extra=QLnX00XGb-7X9IReYUPouWe4mEQHHoYhAtR5vANhYeG5AO75Lqo1BsqcB-P8AQ3SHnRTdBJTG-RoF_OPoPASAA20kf850000qXZAYyY0BifN19IC8uFHtJvSIU-dW0JQJDjrjG9cHA']);
    game.load.audio('menu', ['http://cs1-24v4.vk-cdn.net/p34/a38230f1579bad.mp3?extra=i1OKM2A5w7uZitiwIduT5h-NcnLC3VMecCUTgWbRC-111yrvEf23pjClLWStmJ0lNgGQavE6R6a_qzg1veIwo-uttWj4Iq0Y8M4F4V3vgEkKXCTsqLZUgZmGgMrS50GzvaVA2dw7IQ']);
}

var spaceship;
var cursors;
var fireButton;

var spriteWidth = w = 800;
var spriteHeight = h = 600;
var sprite;
var play = false;
var loader;
var music;
var weapon;
var enemy = 0;
var maxEnemy = 1;
var explosion;
var ponchik;

function create() {

    game.stage.backgroundColor = '#000';

    //  События загрузки приложения
    game.load.onLoadStart.add(loadStart, this);
    game.load.onFileComplete.add(fileComplete, this);
    game.load.onLoadComplete.add(showMenu, this);
    // Стартуем загрузку игры
   loadStart();

}

function fileComplete() {
    // body...
}

function loadStart() {

    //game.load.image('background', 'images/background.png');

    //  Just to kick things off
    loader = game.add.sprite(spriteWidth/2, spriteHeight/2, 'loader');  //Добавляем спрайт меню
    loader.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    loader.animations.play('walk', 9, true);
    

    text = game.add.text(32, 32, 'LOAD', { fill: '#ffffff' });
    game.load.start();
}



function showMenu() {
    loader.destroy();

    game.stage.backgroundColor = '#fff';
    background = game.add.tileSprite(-90, 0, spriteWidth*2+200, spriteHeight*2+200, 'menuback');        //Фоновая картинка (спрайт)
    background.scale.set(0.6);

    musicMenu = game.add.audio('menu');
    musicMenu.play();

    //  game.paused = true; //Останавливаем игру при загрузке
    //loader.scale.set(4);// Уменьшим и увеличим
   // text = game.add.text(32, 32, 'START GAME', { fill: '#ffffff' });
    
    buttonStart = game.add.button(game.world.centerX - 35, 450, 'button-start', start, this, 2, 1, 0);
    buttonOptions = game.add.button(game.world.centerX - 45, 400, 'button-options', start, this, 2, 1, 0);
}


function createAnamy() {

}


function start() {

    play = true;
    createAnamy();

    musicMenu.stop();
    musicGame = game.add.audio('game');
    musicGame.play();

    game.stage.backgroundColor = '#fff';    //Добавляем фоновый цвет
    background = game.add.tileSprite(0, 0, 1000, 600, 'background');        //Фоновая картинка (спрайт)

    game.world.setBounds(0, 0, 1920, 1200);

    //spaceship = this.add.sprite(100, 300, 'ship');

    spaceship = game.add.sprite(100, 300, 'ship');  //Добавляем спрайт меню
    spaceship.scale.set(0.5);
    spaceship.animations.add('walk');

    spaceship.anchor.set(0.5);
    game.physics.arcade.enable(spaceship);
    //spaceship.body.angularVelocity = -300;

    pause_label = game.add.text(spriteWidth - 100, 20, 'pause', { font: '24px Arial', fill: '#fff' });
    pause_label.inputEnabled = true;
    pause_label.events.onInputUp.add(function () {
        
        game.paused = true; //ставим игру на паузу

        // Then add the menu
        menu = game.add.sprite(spriteWidth/2, spriteHeight/2, 'menu');  //Добавляем спрайт меню
        menu.anchor.setTo(0.5, 0.5);

        // And a label to illustrate which menu item was chosen. (This is not necessary)
        choiseLabel = game.add.text(spriteWidth/2, spriteHeight-150, 'Click outside menu to continue', { font: '30px Arial', fill: '#fff' });
        choiseLabel.anchor.setTo(0.5, 0.5);
    });
    game.input.onDown.add(unpause, self);   // По нажатию мимо меню, прячем его

    //game.physics.arcade.enable(spaceship);

   // spaceship.body.drag.set(2);
   // spaceship.body.maxVelocity.set(100);   // Максимальная скоростьт тела


   //  Creates 30 bullets, using the 'bullet' graphic
    weapon = game.add.weapon(30, 'bullet');
    weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
    weapon.bulletLifespan = 2000;
    weapon.bulletSpeed = 600;
    weapon.fireRate = 100;

    weapon.addBulletAnimation('bulletAnim', [0,1,2,3], 16, true);
    weapon.trackSprite(spaceship, 70, 0, true);

    //PONCHIK
    ponchik = game.add.group();
    ponchik.enableBody = true;
    ponchik.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < 1; i++)
    {
        var c = ponchik.create(w-100, h/2-25, 'ponchik', game.rnd.integerInRange(200, 200));
        c.name = 'ponch' + i;
        c.body.immovable = true;
    }

    explosions = game.add.group();
    explosions.createMultiple(30, 'boom');
    explosions.forEach(setupInvader, this);


    cursors = this.input.keyboard.createCursorKeys();
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

}

function setupInvader (invader) {

    invader.anchor.x = 1;
    invader.anchor.y = 1;
    invader.animations.add('boom');

}

var anim = false;
var time = new Date().getTime();
function update() { 

   
    
    if(play == true){
        
        game.physics.arcade.overlap(weapon.bullets, ponchik, killponchik, null, this);

        background.tilePosition.x -= 1;     // Двигаем фон

        if (cursors.left.isDown && spaceship.x > 40) {
            spaceship.x -= 8;
            //spaceship.scale.x = -1;     //Поворачиваем корабль вправо-влево
        }
        else if (cursors.right.isDown && spaceship.x < spriteWidth-40) {
            spaceship.x += 8;
            //spaceship.scale.x = 1;    //Поворачиваем корабль вправо-влево
        }

        if (cursors.up.isDown && spaceship.y > 40) {
            spaceship.y -= 8;
        }
        else if (cursors.down.isDown && spaceship.y < spriteHeight-40) {
            spaceship.y += 8;
        }

        game.world.wrap(spaceship, 16);

        if (anim && new Date().getTime()-300 > time) {
            spaceship.animations.play('walk', 10, 1);
            spaceship.animations.stop();
            anim = false;
        }

         if (fireButton.isDown)
        {
            weapon.fire();
            spaceship.animations.play('walk', 10, false);
            anim = true;
            time = new Date().getTime();
        }
       

    }
   

}

function killponchik(bullet, ponch) {
   bullet.kill();
   ponch.kill();
    var explosion = explosions.getFirstExists(false);
    explosion.reset(ponch.body.x+70, ponch.body.y+100);
    explosion.play('boom', 30, false, true);
    
    var c = ponchik.create(w-100, h/2-325, 'ponchik', game.rnd.integerInRange(200, 200));    
    c.name = 'ponch' + 3;
    c.body.immovable = true;
}

function render() {

   //game.debug.cameraInfo(game.camera, 32, 32);
   // weapon.debug();

}

 function unpause(event){
    if(game.paused){
           
        menu.destroy();
        choiseLabel.destroy();
        game.paused = false;
       
    }
};