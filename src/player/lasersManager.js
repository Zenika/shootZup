(function (window) {
    'use strict';

    function LasersManager(audio, resources) {
        this.audio = audio;
        this.resources = resources;
        this.lasers = [];
    }

    LasersManager.prototype.move = function () {
        this.lasers = this.lasers.filter(function (laser) {
            laser.move();
            return !laser.isOutOfBounds();
        });
    };

    LasersManager.prototype.shoot = function (player) {
        // création de 2 lasers
        this.lasers.push(new Laser(player.x - 10, player.y - 50, this.resources));
        this.lasers.push(new Laser(player.x + 10, player.y - 50, this.resources));
        this.audio.laser();
    };

    LasersManager.prototype.paint = function (context) {
        this.lasers.forEach(function (laser) {
            laser.paint(context);
        });
    };

    LasersManager.prototype.reset = function () {
        this.lasers.splice(0, this.lasers.length);
    };

    window.LasersManager = LasersManager;

})(window);