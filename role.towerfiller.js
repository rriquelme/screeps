module.exports = {
    run: function(creep) {
        //creep.say("HI");
        // Check if the creep is carrying any energy
        var main_spawn = Object.keys(Game.spawns)[0];
        if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
            creep.memory.role = undefined;
        } else {
            // If the creep is carrying energy, find the nearest extension and start filling it

            var towers = Game.spawns[main_spawn].room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            //console.log("--");
            //console.log(towers);
            if (towers.length > 0) {
                // find nearest extension without fill in it
                var tower = creep.pos.findClosestByRange(towers);
                if (creep.transfer(tower, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(tower,{visualizePathStyle: {stroke: '#ffffff'}});
                }
                else{
                    creep.memory.role = undefined;
                }
            }
            else {
                creep.memory.role = undefined;
            }
        }
    }
};
