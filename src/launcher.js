(function () {
    'use strict';

    window.requestAnimationFrame = (function () {
        // La fonction d'origine que tous les navigateurs finiront par utiliser.
        return window.requestAnimationFrame ||
            // Pour Chrome et Safari.
            window.webkitRequestAnimationFrame ||
            // Pour Firefox.
            window.mozRequestAnimationFrame ||
            // Pour Opera.
            window.ORequestAnimationFrame ||
            // Pour Internet Explorer.
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    var sprites = [
        {title: 'spaceship-red', url: 'resources/image/spaceship-red.png'},
        {title: 'laser', url: 'resources/image/laser.png'},
        {title: 'spaceship-green', url: 'resources/image/spaceship-green.png'},
        {title: 'boom', url: 'resources/image/explosion.png'},
        {title: 'sky', url: 'resources/image/sky.jpg'},
        {title: 'bullet', url: 'resources/image/bullet.png'},
        {title: 'galaxy', url: 'resources/image/galaxy3.jpg'},
        {title: 'stars', url: 'resources/image/stars2.png'}
    ];
    var resources = new Resources(sprites);

    var sounds = [
        {title: 'stage', url: 'resources/audio/loop.mp3'},
        {title: 'laser', url: 'resources/audio/science_fiction_laser_005.mp3'}
    ];
    var audio = new Audio(sounds);

    var gameState = new GameState();

    var controlsP1 = new Keyboard();

    var explosionManager = new ExplosionManager(resources);

    var playerFactory = new PlayerFactory(resources);
    var physicsP1 = new Physics(explosionManager);
    var lasersManager = new LasersManager(audio, resources);

    var ennemiesManager = new EnnemiesManager(gameState, resources);

    var background;

    var canvas = document.getElementById('game');
    var context2d = canvas.getContext('2d');

    // préchargement des sons
    audio.load().then(function () {

        // préchargement des images
        return resources.load();

    }).then(function () {

        // contruction du fond
        background = new Background(resources);

        // démarrage de la musique de fond
        audio.stageBgm();

        // contruction du scénario des ennemies
        return ennemiesManager.loadScenario('resources/stage1.json');

    }).then(function (scenario) {

        // démarrage de gestion des controles utilisateurs
        controlsP1.startDetection();

        // Création du jeux
        var game = new Game(canvas, context2d, gameState, explosionManager, ennemiesManager, lasersManager, background, playerFactory, physicsP1, controlsP1);

        // affichage du jeux
        game.paintGame();

        // démarrage du jeux
        game.startGame(scenario);
    });

})();
