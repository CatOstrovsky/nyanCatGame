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
		this.element.x -= 10;
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
		this.lasAdd = new Date().getTime();
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

		if(this.lasAdd+10 < new Date().getTime()){
			this.lasAdd = new Date().getTime();
			this.add();
		}
	}
}

module.exports = RainbowManager;