var roleCfiller = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.role = "harvest";
        }
        //var build = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;}});
        //var build = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (i) => (i.structureType == STRUCTURE_CONTAINER) && (i.store[RESOURCE_ENERGY] < i.store.getCapacity())});
        var build = Game.getObjectById('63c4634388fe55c86af752e5');
        if(build){
            if (build.store[RESOURCE_ENERGY] ==2000){
            build = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (i) => (i.structureType == STRUCTURE_CONTAINER) && (i.store[RESOURCE_ENERGY] < i.store.getCapacity())});
        }
        if(build){
            if(creep.transfer(build, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(build, {visualizePathStyle: {stroke: '#ffff00'}});
            
            }
            else if (creep.transfer(build, RESOURCE_ENERGY) == ERR_FULL){
                creep.memory.role = "none";
            }
                
            } else {
                creep.memory.role = "none";
            }
            
        }
        else {
            creep.memory.role = "none";
        }
        creep.memory.role = "none";
        
	    
	}
};

module.exports = roleCfiller;