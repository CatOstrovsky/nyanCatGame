class boom {
	constructor(ctx, x = 0, y = 0) {
		this.ctx = ctx;

		this.elements = [];
		for (var i = 6; i >= 0; i--) {
			let randomTile = parseInt(Math.random() * 6) - 1;

			let candy = this.ctx.add.tileSprite(x, y, 24, 24, 'candy').setOrigin(.5,.5).setScale(1.6);
			candy.setTilePosition(randomTile*24, 0);

			let randomPos = {
				x: (Math.random() > .5) ? x + (Math.random() * 100) : x - (Math.random() * 100),
				y: (Math.random() > .5) ? y + (Math.random() * 100) : y - (Math.random() * 100)
			}
			this.ctx.tweens.add({
		        targets: candy,
		        x: randomPos.x,
		        y: randomPos.y,
		        duration: 600,
		        angle: 360,
		        ease: 'Power2'
		    });

			this.elements.push(candy);

		}

    	setTimeout(() => {
    	  this.destroy()
    	}, 500);
	}

	destroy() {
		for(let el of this.elements) {
			el.destroy();
		}
	}
}

module.exports = boom;