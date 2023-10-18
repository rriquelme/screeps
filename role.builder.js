var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.role = undefined;
        }
        else{

            var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if(target) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
                creep.memory.role = undefined;
            }
        }
	}
};

module.exports = roleBuilder;