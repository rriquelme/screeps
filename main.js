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
    var n_repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer').length;
    var n_range_attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'r_attacker').length;
    var n_tower_fill = _.filter(Game.creeps, (creep) => creep.memory.role == 'towerfiller').length;
    var creeps_fillers = _.filter(Game.creeps, (creep) => creep.memory.role == 'extensionfiller');
    var creeps_spawn_fillers = _.filter(Game.creeps, (creep) => creep.memory.role == 'spawnfiller');
    var total_resources_spawn_fillers = 0;
    for (var i in creeps_spawn_fillers){
        total_resources_spawn_fillers += creeps_spawn_fillers[i].store[RESOURCE_ENERGY];
    }
    var spawn_n = Math.floor(total_resources_spawn_fillers/50);
    console.log("total_resources_spawn_fillers: ", total_resources_spawn_fillers);
    var n_spawn_fill = creeps_spawn_fillers.length;
    var n_ext_fill = creeps_fillers.length;
    var total_resouce_filling = 0;
    for (var i in creeps_fillers){
        total_resouce_filling += creeps_fillers[i].store[RESOURCE_ENERGY];
    }
    var cap_ext = Math.floor(total_resouce_filling/50);

    var extension_free = Game.spawns[main_spawn].room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    });
    var extension_free_length = extension_free.length - cap_ext;
    console.log("extension_free_length: ", extension_free_length);


    var tower_needs_refill_lenght = -n_tower_fill;
    //console.log(extension_free_length);
    var structures_to_repair = Game.spawns[main_spawn].room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType != STRUCTURE_WALL && structure.hits < structure.hitsMax);
        }
    });
    var structures_to_repair_length = structures_to_repair.length - n_repairers;

    if (Game.spawns[main_spawn].hits < Game.spawns[main_spawn].hitsMax) {
        Game.spawns[main_spawn].room.controller.activateSafeMode();
    }
    // create a small code for managing towers
    var towers = Game.spawns[main_spawn].room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_TOWER);
        }
    });
    //console.log(towers);
    for (var i = 0; i < towers.length; i++) {
        if (towers[i].hits < towers[i].hitsMax) {
            Game.spawns[main_spawn].room.controller.activateSafeMode();
        }
        var closestDamagedStructure = towers[i].pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => 2*structure.hits < structure.hitsMax
        });
        if (closestDamagedStructure) {
            towers[i].repair(closestDamagedStructure);
        }
        var closestHostile = towers[i].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            towers[i].attack(closestHostile);
        }
        var closestDamagedCreep = towers[i].pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: (creep) => creep.hits < creep.hitsMax
        });
        if (closestDamagedCreep) {
            towers[i].heal(closestDamagedCreep);
        }
        // if tower has no energy, withdraw energy from storage
        if (towers[i].store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            tower_needs_refill_lenght +=1;
        } 
    }
    // MAIN FOR LOOP
    for (var i = 0; i < creepList_length; i++) {
        
        var creep = Game.creeps[creepList[i]];

        if (creep.ticksToLive < 50 && creep.store[RESOURCE_ENERGY] == 0) {
            creep.suicide();
        }
        else if (creep.store[RESOURCE_ENERGY] == 0 && creep.memory.role == undefined) {
             creep.memory.role = "miner";
             creep.say("M");
         }
         else if (creep.memory.role == undefined && 50 > creep.store[RESOURCE_ENERGY]) {
             creep.memory.role = "miner";
             creep.say("M");
         }
         else if (creep.memory.role == undefined && n_upgraders < 1 && (creepList_length-n_attackers-n_range_attackers)  > 3 ){
            creep.memory.role = 'upgrader';
            creep.say("U");
            n_upgraders +=1;
         }
         else if (creep.memory.role == undefined && tower_needs_refill_lenght >0 && (creepList_length-n_attackers-n_range_attackers)  > 3 ){
            creep.memory.role = 'towerfiller';
            tower_needs_refill_lenght -= 1;
            creep.say("TF");
         }
         else if ((creep.memory.role == undefined || creep.memory.role == 'spawnfiller') && extension_free_length > 0 ) {
             creep.memory.role = 'extensionfiller';
             extension_free_length -= Math.floor(creep.store[RESOURCE_ENERGY]/50);
             creep.say("EF");
         }
         else if (creep.memory.role == undefined && Game.spawns[main_spawn].store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
             creep.memory.role = 'spawnfiller';
             creep.say("SF");
         }
        else if (creep.memory.role == undefined  && structures_to_repair_length > 0) {
            creep.memory.role = 'repairer';
            structures_to_repair_length -=1
            creep.say("R");
        }
        else if (creep.memory.role == undefined && n_upgraders < 2) {
            creep.memory.role = 'upgrader';
            n_upgraders += 1;
            creep.say("U");
        }
        else if (creep.memory.role == undefined && construction_length > 0) {
            creep.memory.role = 'builder';
            creep.say('B');
            if (creep.memory.building == undefined) {
                creep.memory.building = construction[0].id;
            }
        }
        else if (creep.memory.role == undefined){
            creep.memory.role = 'upgrader';
            creep.say("U");
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

        var creepName = 'R' + Math.floor(Math.random() * 10) + 'D' + Math.floor(Math.random() * 10);
        Game.spawns[main_spawn].spawnCreep(body, creepName, { memory: { role: undefined, source: sources[0].id , bored: 0} });
        console.log('Spawning: ' + creepName + ' | body: ' + body + ' | source: ' + sources[0].id);
    }
    else if ((creepList_length-n_attackers-n_range_attackers)  < 1) {
        Game.spawns[main_spawn].spawnCreep([MOVE, WORK, MOVE, CARRY], 'BasicWorker', { memory: { role: undefined , source: sources[0].id, bored: 0} });
    }
    else if (n_attackers < (Game.spawns[main_spawn].room.controller.level - 2 - towers.length)){
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
    }else if (n_range_attackers < (Game.spawns[main_spawn].room.controller.level - 2 - towers.length)){
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
}
