import config from './config.js';

class Enemy {
	constructor (ctx) {
		this.ctx = ctx;
		this.item = null;
		this.active = true;

		this.addToScene();

		return this;
	}

	addToScene() {
		this.item = this.ctx.impact.add.image(config.width-50, (Math.random() * (config.height-100)) + 50, 'ponchik')
		.setVelocity(-150, 0)
		.setActiveCollision();

		this.item.name = "enemy";
	}

	destroy() {		
		this.item.destroy();
		this.active = false;
	}

	update() {
		this.item.angle -= 5;
		if(this.item.alpha == 0 || this.item.x < 60)
			this.destroy();
	}
}

module.exports = Enemy;