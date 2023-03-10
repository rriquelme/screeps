const room_name = "W13S25";
const spawn_name = "Spawn1";
var wave_creep_1 = [WORK,CARRY,MOVE,MOVE]; // 250
var wave_creep_2 = [WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE]; // 550
var wave_creep_3 = [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; // 800
var wave_creep_4 = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; // 1300
var wave_creep_5 = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; //1800
var wave_creep_6 = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; //2300
var basic_creep = [WORK,CARRY,MOVE];// 200
var basic_miner = [WORK,WORK,MOVE,MOVE];//300

var assigner = require('assigner');

module.exports.loop = function () {
    var hostile_creeps = Game.spawns[spawn_name].pos.findClosestByRange(FIND_HOSTILE_CREEPS);

    var towers = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_TOWER);
    for (var i in towers){
        var closestHostile = towers[i].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            towers[i].attack(closestHostile);
        }
        //console.log(towers[i]);
    }
    
    
    var current_lvl = Game.rooms[room_name].controller.level;
    var _count_creeps = _.filter(Game.creeps).length;
    if(current_lvl <= 2 && _count_creeps < (4*current_lvl) ){
        console.log("need first wave");
        Game.spawns[spawn_name].spawnCreep(wave_creep_2, "wave_2_"+Game.time.toString().slice(-2), {memory: {role: "wave_1", perma_role: "none"}});
        Game.spawns[spawn_name].spawnCreep(wave_creep_1, "wave_1_"+Game.time.toString().slice(-2), {memory: {role: "wave_1", perma_role: "none"}});
    }else if (current_lvl >= 3 && current_lvl < 5 && _count_creeps < 8){
        console.log("need fourth wave");
        Game.spawns[spawn_name].spawnCreep(wave_creep_4, "wave_4_"+Game.time.toString().slice(-2), {memory: {role: "wave_1", perma_role: "none"}});
        //Game.spawns[spawn_name].spawnCreep(wave_creep_1, "wave_1_"+Game.time.toString().slice(-2), {memory: {role: "wave_1", perma_role: "none"}});
        if (_count_creeps < 6 && _count_creeps >= 3){
            Game.spawns[spawn_name].spawnCreep(wave_creep_3, "wave_3_"+Game.time.toString().slice(-2), {memory: {role: "wave_1", perma_role: "none"}});
        } else  if (_count_creeps < 3){
            Game.spawns[spawn_name].spawnCreep(wave_creep_2, "wave_2_"+Game.time.toString().slice(-2), {memory: {role: "wave_1", perma_role: "none"}});
            Game.spawns[spawn_name].spawnCreep(wave_creep_1, "wave_1_"+Game.time.toString().slice(-2), {memory: {role: "wave_1", perma_role: "none"}});
        }
    } else if (current_lvl == 5 && _count_creeps < 8){
        console.log("need fifth wave");
        Game.spawns[spawn_name].spawnCreep(wave_creep_5, "wave_5_"+Game.time.toString().slice(-2), {memory: {role: "wave_1", perma_role: "none"}});
        if (_count_creeps < 5 && _count_creeps >= 3){
            Game.spawns[spawn_name].spawnCreep(wave_creep_4, "wave_4_"+Game.time.toString().slice(-2), {memory: {role: "wave_1", perma_role: "none"}});
        } else  if (_count_creeps < 3){
            Game.spawns[spawn_name].spawnCreep(wave_creep_3, "wave_3_"+Game.time.toString().slice(-2), {memory: {role: "wave_1", perma_role: "none"}});
            Game.spawns[spawn_name].spawnCreep(wave_creep_1, "wave_1_"+Game.time.toString().slice(-2), {memory: {role: "wave_1", perma_role: "none"}});
        }

    } else if (current_lvl >= 6 && _count_creeps < 8){
        console.log("need fifth wave");
        Game.spawns[spawn_name].spawnCreep(wave_creep_6, "wave_6_"+Game.time.toString().slice(-2), {memory: {role: "wave_1", perma_role: "none"}});
        if (_count_creeps < 5 && _count_creeps >= 3){
            Game.spawns[spawn_name].spawnCreep(wave_creep_5, "wave_5_"+Game.time.toString().slice(-2), {memory: {role: "wave_1", perma_role: "none"}});
        } else  if (_count_creeps < 3){
            Game.spawns[spawn_name].spawnCreep(wave_creep_3, "wave_3_"+Game.time.toString().slice(-2), {memory: {role: "wave_1", perma_role: "none"}});
            Game.spawns[spawn_name].spawnCreep(wave_creep_1, "wave_1_"+Game.time.toString().slice(-2), {memory: {role: "wave_1", perma_role: "none"}});
        }

    }

    //var wave_creeps = _.filter(Game.creeps, (creep) => creep.memory.role == "wave_1").length;

    for(var name in Game.creeps) {
        var creep = Game.creeps[name]
        if(!creep) {
            delete Memory.creeps[name];
            console.log("RIP:", name);
            continue;
        }
        assigner.run(creep);
    }
    
    
    
    
}
