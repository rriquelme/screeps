// Define a new role called "runner"
var roleRunner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // Find the main spawn
        //var mainSpawn = Game.spawns['Spawn1'];
        var mainSpawn = Object.keys(Game.spawns)[0];
        // Calculate the distance between the runner and the main spawn
        var distanceToMainSpawn = creep.pos.findPathTo(mainSpawn).length;

        // If the distance is greater than 1, move the runner towards the main spawn
        if (distanceToMainSpawn > 1) {
            creep.moveTo(mainSpawn);
        }
        // Otherwise, the runner has reached the main spawn and can perform its other duties
        else {
            // Do other duties here
        }
    }
};

module.exports = roleRunner;
