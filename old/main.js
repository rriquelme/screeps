var assigner = require('assigner');
var main_building = Game.spawns['Spawn0'];
var max_ = 3;
var min_repairer = 2;
var n_miners = 1;
var n_upgraders_perm = 1;


module.exports.loop = function () {
    var to_supply = Game.rooms["W2N31"].find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;}});
    var to_repair = Game.rooms["W2N31"].find(FIND_STRUCTURES, {filter: object => object.hits< object.hitsMax*0.9 && object.structureType!=STRUCTURE_WALL});
    console.log('Creeps:' + _.filter(Game.creeps).length + " || Repair:" + to_repair.length + " || Supply:" + to_supply.length);

    for(var name in Game.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log("RIP:", name);
            continue;
        }

        var creep = Game.creeps[name];
        var n_upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' || creep.memory.role == 'charvest' ).length;
        var n_repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer').length;

        if (creep.memory.role == "none"){
            if (creep.memory.perma_role !="none"){
                if (creep.memory.perma_role == "upgrader" && (creep.memory.role != "upgrader" && creep.memory.role != "charvest" )){
                    creep.memory.role = "charvest"
                    
                }else{
                    creep.memory.role = creep.memory.perma_role;
                }
                
            }
            /*else if (n_upgraders < min_upgraders){
                creep.memory.role = 'charvest';
                creep.say("U");
            }*/
            else if(to_supply.length > 0) {
                creep.memory.role = "supplybase";
                creep.say("S");
            }
            else if (n_repairers < min_repairer && to_repair.length > 0){
                creep.memory.role = 'repairer';
                creep.say("R");
            }
            else if (Object.keys(Game.constructionSites).length){
                creep.memory.role = "builder";
                creep.say("B");
            }
            else if (creep.store[RESOURCE_ENERGY] != 0){
                creep.memory.role = "cfiller";
                creep.say("Cf");
            }
            else{
                creep.memory.role = "harvest";
                //creep.moveTo(27,21);
                //creep.say(".");
            }
        }
        else{
            if (to_supply.length == 0 && creep.memory.role == "supplybase"){
                creep.memory.role = "none";
            }
            else if (creep.memory.role == "builder" && Object.keys(Game.constructionSites).length == 0){
                creep.memory.role = "none";
            }/*else if (n_upgraders > max_upgraders){
                creep.memory.role = "none";
            }*/
        }
        assigner.run(creep)
    }
    
    var _miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner')
    /*if (Game.rooms["W2N31"].find(FIND_HOSTILE_CREEPS)){
        console.log("HOSTILE");
        Game.spawns['Spawn0'].spawnCreep([ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,MOVE,ATTACK], "Defender0"+Game.time.toString(), {memory: {role: "defender", perma_role: "defender", target : "none"}});
    }
    else*/ if ((_miners.length < n_miners) || (_miners[0].ticksToLive <100 && _miners.length <2)){
        var newName = 'Miner' + Game.time.toString().slice(-1);
        console.log('Spawning: ' + newName);
        var _sour = 0
        if (_.filter(Game.creeps, (creep) => creep.memory.role == 'miner' && creep.memory.sourc == 1).length < 1){
            _sour = 1
        }
        Game.spawns['Spawn0'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: "miner", perma_role: "miner", sourc: _sour, carrying : 0}});
        if (_miners.length == 0){
            Game.spawns['Spawn0'].spawnCreep([WORK,MOVE], newName, {memory: {role: "miner", perma_role: "miner", sourc: _sour, carrying : 0}});
        }
    } else if (_.filter(Game.creeps).length < max_) {
        var newName = 'Random' + Game.time.toString().slice(-2);
        console.log('Spawning: ' + newName);
        var _sour = 1
        if(Math.random() < 0.3){
            _sour = 0
        }
        Game.spawns['Spawn0'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: "harvest", perma_role: "none"}});
        if (_.filter(Game.creeps, (creep) => creep.memory.perma_role == 'none') == 0){
            Game.spawns['Spawn0'].spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: "harvest", perma_role: "none"}});
        }
    } else if (n_upgraders < n_upgraders_perm){
        var newName = 'Upgrader' + Game.time.toString().slice(-1);
        console.log('Spawning: ' + newName);
        Game.spawns['Spawn0'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: "upgrader", perma_role: "upgrader", carrying : 0}});
    }
}





