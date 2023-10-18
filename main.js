var assigner = require('assigner');
module.exports.loop = function () {
    // define basic roles: builder, upgrader, minerharvester, repairer
    var main_spawn = Object.keys(Game.spawns)[0];
    // Get an array of all of your creeps
    var creepList = Object.keys(Game.creeps);

    // If there are no creeps, create one with the role of "basicWorker"
    if (creepList.length < 1) {
        Game.spawns[main_spawn].spawnCreep([WORK, CARRY, MOVE, MOVE], 'BasicWorker', { memory: { role: undefined } });
    }

    // Keep track of the number of creeps assigned to each source
    var sourceCreepCount = {};
    var n_upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader').length;
    //var 
    var construction = Object.keys(Game.constructionSites).length;
    // MAIN FOR LOOP
    for (var i = 0; i < creepList.length; i++) {

        var creep = Game.creeps[creepList[i]];
        
        // sanity memory TODO later
        if(creep.memory.bored == undefined) {
            creep.memory.bored = 0;
        }
        // if bored > 10, change the source to the other one
        if(creep.memory.bored >= 7) {
            var sources = Game.spawns[main_spawn].room.find(FIND_SOURCES);
            for(var j = 0; j < sources.length; j++) {
                if(sources[j].id != creep.memory.source) {
                    creep.memory.source = sources[j].id;
                    console.log(sources[j].id);
                    creep.memory.bored = 0;
                    break;
                }
            }
        }

        if (creep.memory.role == undefined && creep.store.getFreeCapacity() > creep.store[RESOURCE_ENERGY]) {
            creep.memory.role = 'minerharvester';
        }
        //else if (creep.memory.role == undefined &&)
        else if (creep.memory.role == undefined && n_upgraders < 4) {
            creep.memory.role = 'upgrader';
            //console.log("upp");
            n_upgraders += 1;
        }
        else if (creep.memory.role == undefined && construction > 0) {
            creep.memory.role = 'builder';
        }
        else if (creep.memory.role == undefined){
            creep.memory.role = 'upgrader';
        }

        assigner.run(creep);
    }
    //console.log(n_upgraders);
    // for each source not listed in sourceCreepCount, set the value to 0
    var sources = Game.spawns[main_spawn].room.find(FIND_SOURCES);
    for (var i = 0; i < sources.length; i++) {
        if (!sourceCreepCount[sources[i].id]) {
            sourceCreepCount[sources[i].id] = 0;
        }
    }
    //console.log();

    // Loop through each creep

    // Spawn a new creep with the role of "basicWorker" and assign it to the source with the least number of assigned creeps
    var sources = Object.keys(sourceCreepCount);
    var minSource = sources[0];
    //console.log(sources);

    for (var i = 1; i < sources.length; i++) {
        if (sourceCreepCount[sources[i]] <= sourceCreepCount[minSource]) {
            minSource = sources[i];
        }
    }
    if (creepList.length < 12) {
        var creepName = 'BW' + Math.floor(Math.random() * 100);
        Game.spawns[main_spawn].spawnCreep([WORK, CARRY, MOVE, MOVE], creepName, { memory: { role: undefined, source: minSource , bored: 0} });
        //console.log(Object.keys(Game.spawns)[0]);
        console.log('Spawning new creep: ' + creepName + ' with role: basicWorker' + ' and source: ' + minSource);
    }
    var source = creep.pos.findClosestByRange(FIND_SOURCES);
var range = 1; // replace with the range you want to check
/*
var freeSpaces = 0;
var terrain = creep.room.getTerrain();
for (var x = source.pos.x - range; x <= source.pos.x + range; x++) {
  for (var y = source.pos.y - range; y <= source.pos.y + range; y++) {
    if (terrain.get(x, y) !== TERRAIN_MASK_WALL && terrain.get(x, y) !== TERRAIN_MASK_SWAMP) {
      var structures = creep.room.lookForAt(LOOK_STRUCTURES, x, y);
      var hasObstacle = structures.some(function(structure) {
        return structure.structureType !== STRUCTURE_ROAD && structure.structureType !== STRUCTURE_CONTAINER && structure.structureType !== STRUCTURE_RAMPART;
      });
      if (!hasObstacle) {
        freeSpaces++;
      }
    }
  }
}

console.log("There are " + freeSpaces + " free spaces around the source at (" + source.pos.x + "," + source.pos.y + ") that are suitable for placing structures.");
*/

}
