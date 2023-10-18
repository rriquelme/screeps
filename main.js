var assigner = require('assigner');
module.exports.loop = function () {
    // define basic roles: builder, upgrader, minerharvester, repairer
    var main_spawn = Object.keys(Game.spawns)[0];
    var sources = Game.spawns[main_spawn].room.find(FIND_SOURCES);
    var creepList = Object.keys(Game.creeps);
    var creepList_length = creepList.length;    
    var construction = Object.keys(Game.constructionSites);
    var construction_length = construction.length;
    var n_upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader').length;
    var extension_free = Game.spawns[main_spawn].room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    });
    var extension_free_length = extension_free.length;
    // MAIN FOR LOOP
    
    for (var i = 0; i < creepList_length; i++) {
        
        var creep = Game.creeps[creepList[i]];
        
        // sanity memory TODO later
        //if(creep.memory.bored == undefined) {
            //    creep.memory.bored = 0;
        //}
        
        // if bored > 10, change the source to the other one
        // should be moved to the miner role...
        if(creep.memory.bored >= 7) {
            for(var j = 0; j < sources.length; j++) {
                if(sources[j].id != creep.memory.source) {
                    creep.memory.source = sources[j].id;
                    creep.memory.bored = 0;
                    break;
                }
            }
        }
        
        if (creep.memory.role == undefined && creep.store.getFreeCapacity() > creep.store[RESOURCE_ENERGY]) {
            creep.memory.role = 'minerharvester';
        }
        else if (creep.memory.role == undefined && extension_free_length > 0 ) {
            creep.memory.role = 'extensionfiller';
        }
        else if (creep.memory.role == undefined && n_upgraders < 2) {
            creep.memory.role = 'upgrader';
            n_upgraders += 1;
        }
        else if (creep.memory.role == undefined && construction_length > 0) {
            creep.memory.role = 'builder';
            //creep.say('B');
            if (creep.memory.building == undefined) {
                creep.memory.building = construction[0].id;
            }
        }
        else if (creep.memory.role == undefined){
            creep.memory.role = 'upgrader';
        }
        
        assigner.run(creep);
        //creep.say(creep.);
        // creep say time to live:
        //creep.say(creep.ticksToLive);
    }


    
    if (creepList_length < 10 && creepList_length > 0) {
        // create creeps with move work move carry body rotating the body parts
        var maxEnergy = Game.spawns[main_spawn].room.energyCapacityAvailable;
        var _body = [MOVE, WORK, MOVE, CARRY, MOVE, WORK];
        var body = [];
        var total =0;
        var work_part =0;
        var carry_part =0;
        while(total <= maxEnergy){
            for (var i = 0; i < _body.length; i++){
                if (total <= maxEnergy){
                    total += BODYPART_COST[_body[i]];
                    body.push(_body[i]);
                }
            }
        }
        body.pop();
        //console.log(total);
        //body.pop();
        //console.log(body);

        var creepName = 'R' + Math.floor(Math.random() * 10) + 'D' + Math.floor(Math.random() * 10);
        Game.spawns[main_spawn].spawnCreep(body, creepName, { memory: { role: undefined, source: sources[0].id , bored: 0} });
        console.log('Spawning: ' + creepName + ' | body: ' + body + ' | source: ' + sources[0].id);
    }
    else if (creepList_length < 1) {
        Game.spawns[main_spawn].spawnCreep([MOVE, WORK, MOVE, CARRY], 'BasicWorker', { memory: { role: undefined , source: sources[0].id, bored: 0} });
    }
    //sum the maximun energy that could be available (spawn + extensions)

    // Utilities:
    // calculate the cost of a creep
    //var body = [MOVE, WORK, CARRY];
    //var cost = 0;
    //for (var i = 0; i < body.length; i++) {
    //cost += BODYPART_COST[body[i]];
    //}
    //console.log(cost); // output: 200
    
    // 
    //console.log(body);
    //console.log(maxEnergy);
}
