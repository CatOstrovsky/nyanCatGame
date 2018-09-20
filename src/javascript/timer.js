import Config from './config.js';

class Timer {
	constructor(ctx) {
		this.ctx = ctx;
    	this.score = 0;
    	this.lasUpdate = new Date().getTime();

		this.timer = this.ctx.add.text(Config.width - 40, 20, `Score: 0`, {fontSize:"27px"}).setOrigin(1, 0);
	}

	update() {
		if(this.lasUpdate+50 < new Date().getTime()){
			this.lasUpdate = new Date().getTime();

			this.score += 1;
			this.timer.setText(`Score: ${this.score}`)
		}
	      
	}
}

module.exports = Timer;