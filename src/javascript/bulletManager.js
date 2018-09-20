import Boom from './boom.js';
import Config from './config.js';

class Bullet {
	constructor(ctx, x = 0, y = 0, speed = 900) {
		this.ctx = ctx;

		this.element =  this.ctx.add.sprite(x, y, 'bullet').play('fire');
		this.element =  this.ctx.impact.add.body(x, y).setGameObject(this.element).setVelocityX(speed).setActiveCollision()
		.setCollideCallback(this.onCollision, this, ctx);
	}

	onCollision(Bullet, B) {
		if(B.gameObject && B.gameObject.hasOwnProperty("name") && typeof(B.gameObject.name) == "string"){
	        if(B.gameObject.name == "enemy") {
	        	new Boom(this.ctx, B.gameObject.x, B.gameObject.y);
	            B.gameObject.alpha = 0;
	            B.gameObject.destroy();

	            Bullet.alpha = 0;
	            Bullet.gameObject.destroy();
	            Bullet.destroy();
	        }
	    }
	}

	destroy() {
		this.element.alpha = 0;		
		this.element.body.gameObject.destroy();
		this.element.body.destroy();
	}

	update() {
		if(this.element.body.pos.x > Config.width - this.element.size.x - 20 && this.element.alpha != 0){
			this.destroy();
		}
	}

}

class bulletManager {
	constructor(ctx) {
		this.ctx = ctx;
		this.bullets = [];

		this.locked = false;
	}

	fire(x = 0, y = 0) {
		if(!this.locked) {
			this.reload();
			this.bullets.push(new Bullet(this.ctx, x, y))
		}
	}

	reload() {
		this.locked = true;
		setTimeout(() => {
		  this.locked = false;
		}, 300)
	}

	update() {
		for(let index in this.bullets) {
			let bullet = this.bullets[index];
			if(bullet.element.body.alpha == 0) {
				this.bullets.splice(index, 1)
			}else{
				bullet.update();
			}
		}
	}
}

module.exports = bulletManager;