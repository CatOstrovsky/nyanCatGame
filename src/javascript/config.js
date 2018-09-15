var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 850,
    height: 550,
    center: {
    	x: 425,
    	y: 275
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