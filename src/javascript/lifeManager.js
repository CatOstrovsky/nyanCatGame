import Config from './config.js';
import Boom from './boom.js';

class LifeManager {
	constructor(ctx) {
		this.ctx = ctx;
		this.count = 5;
		this.lifesObjects = [];
		this.updateLife();

		this.ctx.cat.setCollideCallback(this.onCollision, this, ctx);
	}

	onCollision(Cat, B) {
		if(B.gameObject && B.gameObject.hasOwnProperty("name") && typeof(B.gameObject.name) == "string"){
	        if(B.gameObject.name == "enemy") {
	        	new Boom(this.ctx, B.gameObject.x, B.gameObject.y);
	            B.gameObject.alpha = 0;
	            B.gameObject.destroy();

	            this.removeHeart();
	            this.ctx.cameras.main.flash();
	        }
	    }
	}

	removeHeart() {
		this.count -= 1;
	    this.updateLife();

		if(this.count == 0)
			this.ctx.scene.start('rip');
	}

	addHeart() {
		this.count += 1;
	    this.updateLife();
	}

	updateLife() {		
		for(let lifeObjKey in this.lifesObjects) {
			let lifeObj = this.lifesObjects[lifeObjKey];
			lifeObj.destroy();
		}
		this.lifesObjects = [];


	    for (let i = this.count; i >= 1; i--)
	        this.lifesObjects.push(this.ctx.add.image(i*40, 20, 'heart').setOrigin(.5, 0).setScale(1.2));
	}

}

module.exports = LifeManager;