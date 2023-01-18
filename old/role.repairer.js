var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.role = "harvest";
        }
        //var to_repair = Game.rooms["W2N31"].find(FIND_STRUCTURES, {filter: object => object.hits < object.hitsMax && (object.hits < 5000 || (object.hitsMax > 5000 && object.hits < 10000))});
        var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: object => object.hits< object.hitsMax*0.9 && object.structureType!=STRUCTURE_WALL});
        
        //targets.sort((a,b) => a.hits - b.hits);
        //creep.say(target)
        
        if(target) {
            //creep.say("RR")
            if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#0000ff'}});
            }
        }
        else{
            creep.memory.role = "none";
        }
        
    }
    
        
};

module.exports = roleRepairer;