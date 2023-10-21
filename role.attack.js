module.exports = {
    run: function(creep) {
        // Find the closest enemy creep with the most HEAL body parts
        // List all enemies in the room
        var target = Game.spawns['Spawn1'].room.find(FIND_HOSTILE_CREEPS);
        var target_healer = [];
        //console.log(target);
        for ( t in target){
            //console.log(target[t].body);
            for (body in target[t].body){
                //console.log(target[t].body[body].type);
                if (target[t].body[body].type == HEAL){
                    target_healer.push(target[t]);
                    break
                }
            }
            //console.log(target[t].body[0].type);
        }
        //console.log([].length);
        //console.log(target);



        if (target_healer.length > 0) {
            creep.memory.bored = 0;
            //console.log("th");
            target = creep.pos.findClosestByRange(target_healer);
            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ff0000'}});
            }
        }
        else if (target.length > 0) {
            creep.memory.bored = 0;
            // Attack the target
            creep.say("target");
            //console.log("target");
            target = creep.pos.findClosestByRange(target);
            //console.log(target);
            if (creep.memory.role == "r_attacker"){
                if (creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ff0000'}});
                }
                else{
                    creep.memory.bored = 0;
                }
            }
            else {
                if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ff0000'}});
                }
                else{
                    creep.memory.bored = 0;
                }
            }
        }
        else{
            //console.log("else");
            // If there are no enemies, move to the flag
            creep.memory.bored +=1;
            if (creep.memory.bored >= 5){
                creep.memory.bored = 5;
                var flag = Game.flags['Attackers'];
                creep.moveTo(flag, {visualizePathStyle: {stroke: '#ff0000'}});
            }
            
        }
    }
};
