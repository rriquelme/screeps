var roleHarvest = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.pos.x == 23 && creep.pos.y == 17 && Game.getObjectById('5bbcacc29099fc012e63625b').energy != 0){
            creep.moveTo(22,18)
        }else
        {
            var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
	}
};

module.exports = roleHarvest;