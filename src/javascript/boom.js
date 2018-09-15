class boom {
	constructor(ctx, x = 0, y = 0) {
		this.ctx = ctx;
		this.element = this.ctx.add.sprite(x, y, 'boom');
    	this.element.anims.play('explode');
    	setTimeout(() => {
    	  this.destroy()
    	}, 500);
	}

	destroy() {
		this.element.destroy();
	}
}

module.exports = boom;