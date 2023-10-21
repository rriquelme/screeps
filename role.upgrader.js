var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //creep.say("U");
        //console.log(creep.room.controller);
        if(creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.role = undefined;
        }
        else{
            //creep.say("U");
            if(creep.upgradeController(Game.spawns[Object.keys(Game.spawns)[0]].room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns[Object.keys(Game.spawns)[0]].room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }

        }
        
	}
};

module.exports = roleUpgrader;