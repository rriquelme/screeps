module.exports = {
    run: function(creep) {
        // Find the closest damaged structure
        if(creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.role = undefined;
        }
        else{
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType != STRUCTURE_WALL && structure.hits < structure.hitsMax);
                }
            });
    
            // If there is a damaged structure, repair it
            if (target) {
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else{
                creep.memory.role = undefined;
            }
        
        }

    }
};
