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
                //creep.memory.bored += 1;
                if (creep.moveTo(source) == -2){
                    creep.memory.bored += 1;
                }
            }
            else{
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    if (creep.moveTo(source) == -2){
                        creep.memory.bored += 1;
                    }
                }
                else {
                    creep.memory.bored = 0;
                    if (creep.store.getFreeCapacity() == 0) {
                        creep.memory.role = undefined;
                    }

                }

            }
            if(creep.memory.bored >= 10) {
                var sources = Game.spawns[main_spawn].room.find(FIND_SOURCES);
                for(var j = 0; j < sources.length; j++) {
                    if(sources[j].id != creep.memory.source) {
                        creep.memory.source = sources[j].id;
                        creep.memory.bored = 0;
                        break;
                    }
                }
            }
        }
        
    
	}
};

module.exports = roleMiner;