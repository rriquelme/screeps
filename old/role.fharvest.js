var rolefHarvest = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.store.getFreeCapacity() == 0){
            creep.memory.role = "none";
        }
        var closest = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        var l_target = creep.room.find(FIND_DROPPED_RESOURCES); 
        l_target.sort((a,b) => b.amount - a.amount);
        var target = l_target[0];
        biggest = l_target[0];
        if(l_target.length > 1){
            if(closest.amount*3 > biggest.amount ){
                target = closest;
            }
            else{
                target = biggest;
            }
        }
        else if (!l_target.length){
            creep.memory.role = "none";
        }
        else{
            target = l_target[0];
        }
        if(target){
            //creep.say("here")
            var pickedup = creep.pickup(target);
            //creep.say(pickedup);
            if(pickedup == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
            else if (pickedup == 0 && l_target.length == 1){
                creep.memory.role = "none";                
            }
            
        }
        
        /*
        var target = creep.room.find(FIND_DROPPED_RESOURCES); 
        target.sort((a,b) => b.amount - a.amount);
        //target = target[0];
        
        //const target = creep.room.find(FIND_DROPPED_RESOURCES)[0];
        if(target.length >0){
            if(creep.pickup(target[0] == ERR_NOT_IN_RANGE)) {
            creep.moveTo(target[0]);
          }
            else{
                creep.memory.role = "none";
          }
            
        }*/
        

	}
};

module.exports = rolefHarvest;