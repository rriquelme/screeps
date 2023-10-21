var roleMinerHarvest = require('role.minerharvest');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleExtensionFiller = require('role.extensionfiller');
var roleAttacker = require('role.attack');
var roleSpawnFiller = require('role.spawnfiller');
var roleMiner = require('role.miner');
var roleRepairer = require('role.repairer');
var assigner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.role == 'minerharvester') {
            //creep.say("MH");
            //roleMinerHarvest.run(creep);
            roleMiner.run(creep);
        }
        else if(creep.memory.role == 'upgrader') {
            //creep.say("U");
            roleUpgrader.run(creep);
        }
        else if(creep.memory.role == 'builder') {
            //creep.say("B");
            roleBuilder.run(creep);
            //roleMinerHarvest.run(creep);
        }
        else if(creep.memory.role == 'extensionfiller') {
            //creep.say("EF");
            roleExtensionFiller.run(creep);
        }
        else if(creep.memory.role == 'attacker') {
            roleAttacker.run(creep);
        }
        else if(creep.memory.role == 'r_attacker') {
            roleAttacker.run(creep);
        }
        else if (creep.memory.role == 'spawnfiller') {
            roleSpawnFiller.run(creep);
        }
        else if (creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        else if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        else{
            creep.memory.role = undefined;
        }
    }
        
};

module.exports = assigner;