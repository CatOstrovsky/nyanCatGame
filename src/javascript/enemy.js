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
		let hardLine = this.ctx.LevelManager.level*10 + this.ctx.LevelManager.stage,
		item = this.ctx.add.image(-100, -100, 'ponchik');
		item.name = "enemy";
		this.item = this.ctx.impact.add.body(config.width-100, (Math.random() * (config.height-100)) + 50).setGameObject(item)
					.setVelocity(-150 * (hardLine/10), 0)
					.setActiveCollision();

	}

	destroy() {
		this.item.body.gameObject.destroy();
		this.item.body.destroy();
		this.active = false;
	}

	update() {
		this.item.body.gameObject.angle -= 5;
		if(this.item.body.gameObject.alpha == 0 || this.item.body.pos.x < 60){
			// If lost of world - remove heart
			if(this.item.body.pos.x < 60)
				this.ctx.LifeManager.removeHeart();

			this.destroy();
		}
	}
}

module.exports = Enemy;