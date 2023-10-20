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
    var n_attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker').length;
    var n_range_attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'r_attacker').length;
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
        
         if (creep.store[RESOURCE_ENERGY] == 0 && creep.memory.role == undefined) {
             creep.memory.role = "miner";
         }
         else if (creep.memory.role == undefined && creep.store.getFreeCapacity() > creep.store[RESOURCE_ENERGY]) {
             creep.memory.role = "miner";
         }
         else if (creep.memory.role == undefined && extension_free_length > 0 ) {
             creep.memory.role = 'extensionfiller';
             creep.say("EF");
         }
         else if (creep.memory.role == undefined && Game.spawns[main_spawn].store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
             creep.memory.role = 'spawnfiller';
             creep.say("SF");
         }
        //if (creep.memory.role == undefined && creep.store.getFreeCapacity() > creep.store[RESOURCE_ENERGY]) {
        //    creep.memory.role = 'minerharvester';
        //}
        //else if (creep.memory.role == undefined && extension_free_length > 0 ) {
        //    creep.memory.role = 'extensionfiller';
        //}
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


    
    if ((creepList_length-n_attackers-n_range_attackers) < 10 && creepList_length > 0) {
        // create creeps with move work move carry body rotating the body parts
        var maxEnergy = Game.spawns[main_spawn].room.energyCapacityAvailable;
        var _body = [MOVE, WORK, MOVE, CARRY, MOVE, WORK];
        var body = [];
        var total =0;
        while(total <= maxEnergy){
            for (var i = 0; i < _body.length; i++){
                if (total <= maxEnergy){
                    total += BODYPART_COST[_body[i]];
                    body.push(_body[i]);
                }
            }
        }
        body.pop();
        if (body[body.length-1] == MOVE){
            body.pop();
        }
        body.reverse();
        //console.log(total);
        //body.pop();
        //console.log(body);

        var creepName = 'R' + Math.floor(Math.random() * 10) + 'D' + Math.floor(Math.random() * 10);
        Game.spawns[main_spawn].spawnCreep(body, creepName, { memory: { role: undefined, source: sources[0].id , bored: 0} });
        console.log('Spawning: ' + creepName + ' | body: ' + body + ' | source: ' + sources[0].id);
    }
    else if ((creepList_length-n_attackers-n_range_attackers)  < 1) {
        Game.spawns[main_spawn].spawnCreep([MOVE, WORK, MOVE, CARRY], 'BasicWorker', { memory: { role: undefined , source: sources[0].id, bored: 0} });
    }
    else if (n_attackers < Game.spawns[main_spawn].room.controller.level -1){
        var maxEnergy = Game.spawns[main_spawn].room.energyCapacityAvailable;
        var _body = [MOVE, ATTACK];
        var body = [];
        var total =0;
        while(total <= maxEnergy){
            for (var i = 0; i < _body.length; i++){
                if (total <= maxEnergy){
                    total += BODYPART_COST[_body[i]];
                    body.push(_body[i]);
                }
            }
        }
        body.pop();
        body.reverse();
        Game.spawns[main_spawn].spawnCreep(body, 'M_Attacker' + Math.floor(Math.random() * 10), { memory: { role: 'attacker' , source: sources[0].id, bored: 0} });
        console.log("Spawning attacker body:", body);
    }else if (n_range_attackers <Game.spawns[main_spawn].room.controller.level -1){
        var maxEnergy = Game.spawns[main_spawn].room.energyCapacityAvailable;
        var _body = [MOVE, RANGED_ATTACK];
        var body = [];
        var total =0;
        while(total <= maxEnergy){
            for (var i = 0; i < _body.length; i++){
                if (total <= maxEnergy){
                    total += BODYPART_COST[_body[i]];
                    body.push(_body[i]);
                }
            }
        }
        body.pop();
        body.reverse();
        Game.spawns[main_spawn].spawnCreep(body, 'R_Attacker'+ Math.floor(Math.random() * 10), { memory: { role: 'r_attacker' , source: sources[0].id, bored: 0} });
        console.log("Spawning r_attacker body:",body);
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
