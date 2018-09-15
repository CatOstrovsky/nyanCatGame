import Config from './config.js';

class Rainbow {
	constructor(ctx, x, y) {
		this.ctx = ctx;
		this.active = true;
		this.element = this.ctx.add.image(x, y, 'rainbow').setScale(.3);
	}

	destroy() {
		this.element.destroy();
		this.active = false;
	}

	update() {
		this.element.x -= 2;
		if(this.element.x < -15) {
			this.destroy();
		}
	}
}

class RainbowManager {
	constructor(ctx) {
		this.ctx = ctx;
		this.rainbows = [];
		this.add();
	}

	add() {
		let x = this.ctx.cat.body.pos.x+15, 
		y = this.ctx.cat.body.pos.y + ( this.ctx.cat.size.y / 2 );
		this.rainbows.push(new Rainbow(this.ctx, x, y));
	}

	update() {
		for(let index in this.rainbows) {
			let rainbow = this.rainbows[index];
			if(rainbow.active === false) {
				this.rainbows.splice(index, 1);
			}else{
				rainbow.update();
			}
		}

		this.add();
	}
}

module.exports = RainbowManager;