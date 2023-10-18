var roleMinerHarvest = require('role.minerharvest');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var assigner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.role == 'minerharvester') {
            //creep.say("MH");
            roleMinerHarvest.run(creep);
        }
        else if(creep.memory.role == 'upgrader') {
            //creep.say("U");
            roleUpgrader.run(creep);
        }
        else if(creep.memory.role == 'builder') {
            //creep.say("B");
            roleBuilder.run(creep);
        }
        else{
            creep.memory.role = undefined;
        }
    }
        
};

module.exports = assigner;