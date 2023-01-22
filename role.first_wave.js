var firstWave = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.memory.state == "upgrading"){
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            if (creep.store[RESOURCE_ENERGY] == 0){
                creep.memory.state = "mining"
            }

        }else if (creep.store.getFreeCapacity() == 0 || creep.memory.state == "full"){
            creep.memory.state = "full";
            // Go to do other things
            var to_supply = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;}});
            var to_build = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            var to_repair = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: object => object.hits< object.hitsMax*0.9 && object.structureType!=STRUCTURE_WALL});
            if (to_supply){
                if(creep.transfer(to_supply, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(to_supply, {visualizePathStyle: {stroke: '#ffff00'}});
    	        }
            }else if (_.filter(Game.creeps, (creep) => creep.memory.state == "upgrading").length <1){
                creep.memory.state = "upgrading";
            
            }else  if (to_repair){
                if(creep.repair(to_repair) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(to_repair, {visualizePathStyle: {stroke: '#0000ff'}});
                }
            }else if(to_build){
                if(creep.build(to_build) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(to_build, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            
            }else{
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            if (creep.store[RESOURCE_ENERGY] == 0){
                creep.memory.state = "mining"
            }
        }
        else if (creep.store[RESOURCE_ENERGY] == 0 || creep.memory.state == "mining"){
            // Mine from nearest
            creep.memory.state = "mining";
            //creep.say(creep.memory.source);
            if (!creep.memory.source){
                creep.memory.source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE).id;
                //creep.say("hola1");
            } else if (Game.getObjectById(creep.memory.source).energy == 0){
                creep.memory.source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE).id;
                //creep.say("hola2");
            } else{
                if(creep.harvest(Game.getObjectById(creep.memory.source)) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.source), {visualizePathStyle: {stroke: '#ffffff'}});
                }
            
            }
            if (creep.store.getFreeCapacity() == 0){
                creep.memory.state = "full";
            }
        }
        
        
    }
};

module.exports = firstWave;