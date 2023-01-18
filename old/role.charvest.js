var rolecHarvest = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.store.getFreeCapacity() == 0){
            creep.memory.role = "upgrader";
        }
        //var storage = Game.getObjectById('63c1d04f4cc16f7b0d1f91c6')
        //const target = creep.room.find(FIND_DROPPED_RESOURCES)[0];
        const storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 0});
        if(!storage){
            creep.memory.role = "upgrader";
        }
        if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(storage);
        }

	}
};

module.exports = rolecHarvest;