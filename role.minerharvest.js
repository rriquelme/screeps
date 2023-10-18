var roleMinerHarvest = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        var main_spawn = Object.keys(Game.spawns)[0];
        if (creep.store.getFreeCapacity() == 0) {
            // If the creep is full, make it move back to the spawn and transfer the resources
            if (Game.spawns[main_spawn].store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                if (creep.transfer(Game.spawns[main_spawn], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.spawns[main_spawn]);
                }
            } else {
                creep.memory.role = undefined;
            }
        } else {
            // If the creep is not full, make it move towards the source that is assigned to it
            var source = Game.getObjectById(creep.memory.source);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                if (creep.moveTo(source) == -2){
                    creep.memory.bored += 1;
                }
            }
            else {
                creep.memory.bored = 0;
            }
        }
	}
};

module.exports = roleMinerHarvest;