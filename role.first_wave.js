var firstWave = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.store.getFreeCapacity() == 0){
            // Go to do other things
            var build = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_SPAWN) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;}});
            if(creep.transfer(build, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(build, {visualizePathStyle: {stroke: '#ffff00'}});
    	    }
            
        }
        else if (creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()){
            // Mine from nearest
            if (!creep.memory.source){
                creep.memory.source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE).id;
            } else if (Game.getObjectById(creep.memory.source).energy == 0){
                creep.memory.source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            } else{
                if(creep.harvest(Game.getObjectById(creep.memory.source)) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.source), {visualizePathStyle: {stroke: '#ffffff'}});
                }
            
            }
        }
        
        
    }
};

module.exports = firstWave;