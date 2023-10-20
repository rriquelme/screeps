var roleMinerHarvest = {

    run: function(creep) {
        if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
            creep.memory.role = undefined;
        } else {

            var main_spawn = Object.keys(Game.spawns)[0];
            if (Game.spawns[main_spawn].store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                if (creep.transfer(Game.spawns[main_spawn], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.spawns[main_spawn]);
                }
                else{
                    creep.memory.role = undefined;
                }
            } else {
                creep.memory.role = undefined;

            }
        }
    }
};

module.exports = roleMinerHarvest;