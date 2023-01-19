const room_name = "W13S25";
const spawn_name = "Spawn1";
var wave_creep_1 = [WORK,CARRY,MOVE,MOVE]; // 250
var basic_creep = [WORK,CARRY,MOVE];// 200
var basic_miner = [WORK,WORK,MOVE,MOVE];//300

var assigner = require('assigner');

module.exports.loop = function () {
    var current_lvl = Game.rooms[room_name].controller.level;
    if(current_lvl <= 2 && _.filter(Game.creeps).length < (4*current_lvl) ){
        console.log("need first wave");
        Game.spawns[spawn_name].spawnCreep(wave_creep_1, "wave_1"+Game.time.toString().slice(-2), {memory: {role: "wave_1", perma_role: "none"}});
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
