(function (window) {
    'use strict';

    function PlayerFactory(resources, physics) {
        this.resources = resources;
        this.physics = physics;
    }

    PlayerFactory.prototype.create = function () {

        var spaceship = null;
        var number = this.getRandomInt(1, 3);

        switch (number) {
        case 1:
            spaceship = new SpaceshipRed(this.physics.canvasWidth / 2, 600, this.resources);
            break;
        case 2:
            spaceship = new SpaceshipGreen(this.physics.canvasWidth / 2, 600, this.resources);
            break;
        case 3:
            spaceship = new SpaceshipBlue(this.physics.canvasWidth / 2, 600, this.resources);
            break;
        default:
            throw new Error('Invalid Starship choose');
        }

        return spaceship;
    };

    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    PlayerFactory.prototype.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    window.PlayerFactory = PlayerFactory;

})(window);