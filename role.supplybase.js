var roleSupplybase = {

    run: function(creep) {
        if (creep.store.getUsedCapacity() == 0){
            creep.memory.role = "harvest";
        }
        else{
            var build = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;}});
            if(!build){
                build = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_SPAWN) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;}});
            }
    	    if(creep.transfer(build, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(build, {visualizePathStyle: {stroke: '#ffff00'}});
    	    }
        
        }
	}
};

module.exports = roleSupplybase;