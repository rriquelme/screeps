module.exports = {
    run: function(creep) {
        // Check if the creep is carrying any energy
        if (creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
            creep.memory.role = undefined;
        } else {
            // If the creep is carrying energy, find the nearest extension and start filling it
            var extensions = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (extensions.length > 0) {
                // find nearest extension without fill in it
                var ext = creep.pos.findClosestByRange(extensions);
                if (creep.transfer(ext, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(ext);
                }
            }
            else {
                creep.memory.role = undefined;
            }
        }
    }
};
