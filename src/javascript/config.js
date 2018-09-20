var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: window.innerWidth,
    height: window.innerHeight,
    center: {
    	x: window.innerWidth/2,
    	y: window.innerHeight/2
    },
    physics: {
        default: 'impact',
        impact: {
            gravity: 0,
            maxVelocity: 800,
            // debug: true
        }
    }
};

module.exports = config;