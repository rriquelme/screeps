var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.store.getFreeCapacity() == 0) {
            creep.memory.role = undefined;
        }
        else{

            var main_spawn = Object.keys(Game.spawns)[0];
            var source = Game.getObjectById(creep.memory.source);
            if(source.energy == 0) {
                creep.memory.role = undefined;
                creep.memory.bored = 100;
            }
            else{
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
        
    
	}
};

module.exports = roleMiner;