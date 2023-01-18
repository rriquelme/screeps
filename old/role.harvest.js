var roleHarvest = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.store.getFreeCapacity() == 0){
            creep.memory.role = "none";
        }
        var sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[creep.memory.sourc]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[creep.memory.sourc], {visualizePathStyle: {stroke: '#ffffff'}});
            //creep.say(".")
     
        }
        else if (creep.harvest(sources[creep.memory.sourc]) == -6){
            if(creep.harvest(creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE), {visualizePathStyle: {stroke: '#ffffff'}});
                //creep.say(".")
            }
        }
	}
};

module.exports = roleHarvest;