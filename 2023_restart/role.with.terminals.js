var bf = require('basic_funtions');
var withTerminals = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.memory.state == "upgrading"){
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            if (creep.store[RESOURCE_ENERGY] == 0){
                creep.memory.state = "mining"
            }

        }else if (creep.memory.state == "repairing"){
            var r = Game.getObjectById(creep.memory.to_repair);
            bf.go_to_repair(creep,r);
            if (creep.store[RESOURCE_ENERGY] == 0){
                creep.memory.state = "mining";
            } else if (r.hits == r.hitsMax){
                creep.memory.state = "full";
            }
        
        }else if (creep.store.getFreeCapacity() == 0 || creep.memory.state == "full"){
            creep.memory.state = "full";
            // Go to do other things
            var to_supply = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_TOWER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;}});
            var to_build = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            var to_repair = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: object => object.hits< object.hitsMax*0.90 && object.structureType!=STRUCTURE_WALL});
            if (to_supply){
                bf.go_to_supply(creep,to_supply);
            }else if (_.filter(Game.creeps, (creep) => creep.memory.state == "upgrading").length <1){
                creep.memory.state = "upgrading";
            
            }else  if (to_repair && _.filter(Game.creeps, (creep) => creep.memory.state == "repairing").length < 2){
                creep.memory.to_repair = to_repair.id;
                creep.memory.state = "repairing";
                bf.go_to_repair(creep,to_repair);
            }else if(to_build){
                if(creep.build(to_build) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(to_build, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            
            }else{
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            if (creep.store[RESOURCE_ENERGY] == 0){
                creep.memory.state = "mining"
            }
        }
        else if (creep.store[RESOURCE_ENERGY] == 0 || creep.memory.state == "mining"){
            // code optimized for 2 sources.
            creep.memory.state = "mining";
            //creep.say(creep.memory.source);
            var on_floor = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
            var nearest_path = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            var closest = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            //console.log(creep.room.find(FIND_SOURCES));
            

            if (! creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE)){
                
                // If no one active
                if (creep.store[RESOURCE_ENERGY] != 0){
                    creep.memory.state = "full";

                }
                else {
                    var l_target = creep.room.find(FIND_SOURCES);
                    l_target.sort((a,b) => a.ticksToRegeneration - b.ticksToRegeneration);
                    //console.log(l_target[0])
                    creep.memory.source = l_target[0].id;
                    creep.moveTo(Game.getObjectById(creep.memory.source), {visualizePathStyle: {stroke: '#ffffff'}});

                }
                
            } else if (on_floor && on_floor.amount >100 ){
                var pu = creep.pickup(on_floor);
                if(pu != OK) {
                    //creep.say("on floor");
                    creep.moveTo(on_floor);
                } else{
                    // Improve
                    creep.memory.state = "full";
                }
            } else if (!creep.memory.source){
                creep.memory.source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE).id;
                
            } else if (Game.getObjectById(creep.memory.source).energy == 0){
                creep.memory.source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE).id;
                //creep.say("full");
                if(creep.store[RESOURCE_ENERGY]  > creep.store.getCapacity()/2){
                    creep.memory.state = "full";
                }
            
            } else if (nearest_path && nearest_path.id != creep.memory.source) {
                creep.memory.source = nearest_path.id;
            
            }
            
            var harv = creep.harvest(Game.getObjectById(creep.memory.source));
            if(harv != OK) {
                //creep.say("move");
                creep.moveTo(Game.getObjectById(creep.memory.source), {visualizePathStyle: {stroke: '#ffffff'}});
            }
            if (creep.store.getFreeCapacity() == 0){
                creep.memory.state = "full";
            }
            //creep.say(creep.store[RESOURCE_ENERGY]);
        }
        
        
    }
};

module.exports = withTerminals;