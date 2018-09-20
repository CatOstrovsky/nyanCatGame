import config from './config.js';

class Background {

	constructor(ctx) {
		this.ctx = ctx;

    	let graphics = this.ctx.add.graphics({ fillStyle: { color: 0x014471 } }),
	    bg = new Phaser.Geom.Rectangle(0, 0, config.width, config.height);
	    graphics.fillRectShape(bg);

	    this.stars = [];

	    for (var i = 20; i >= 0; i--) {
	    	this.addStar();
	    }
	    
	}

	addStar(toEnd = false) {
		let x = (toEnd) ? config.width : Math.random() * config.width,
	    star = this.ctx.add.sprite(x, Math.random() * config.height, 'stars');
	    star.type = (Math.random() > .2) ? 1: 0;

	    if(star.type == 1)
	    	star.play('type_1');

	    this.stars.push(star);
	}

	update() {
		for(let key in this.stars){
			let star = this.stars[key];
			star.x -= 4;
			
			if(star.type == 0)
				star.angle += 3;

			if(star.x < -10) {
				star.destroy();
				this.stars.splice(key, 1);
				this.addStar(true);
			}
		}
	}

}

module.exports = Background;