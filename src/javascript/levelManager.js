import Timer from './timer.js';
import Config from './config.js';

class LevelManager {
	constructor(ctx) {
		this.ctx = ctx;
	    this.level = 1;
	    this.stage = 1;
	    this.nextStagelScore = 7;

		this.timer = new Timer(ctx,);
		this.text =  this.ctx.add.text(Config.width / 2, 20, `Level ${this.level} - ${this.stage}`, {fontSize:"27px"}).setOrigin(.5, 0);
	}

	nextStage(callback) {
		this.nextStagelScore = ( (this.nextStagelScore/this.stage) * 1.05 ) * ++this.stage;
		if(this.stage == 10) {
			this.nextLevel(callback);
		} else {
			callback();
		}
		
	}

	nextLevel(callback) {
		this.level++;
		this.stage = 1;
		if(typeof(callback))
			callback();
	}

	onNextLevel() {
		this.text.setText(`Level ${this.level} - ${this.stage}`);
	}

	update() {
	    this.timer.update();

	    if(this.timer.score >= this.nextStagelScore) {
	    	this.nextStage(() => {
	    		this.onNextLevel();
	    	})
	    }

	}
}

module.exports = LevelManager;