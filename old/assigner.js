var roleHarvest = require('role.harvest');
var rolefHarvest = require('role.fharvest');
var rolecHarvest = require('role.charvest');
var roleSupplybase = require('role.supplybase');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleMiner = require('role.miner');
var roleCfiller = require("role.cfiller");
var roleDefender = require("role.defender");


var assigner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        else if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        else if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        else if(creep.memory.role == 'harvest') {
            rolefHarvest.run(creep);
        }
        else if(creep.memory.role == 'fharvest') {
            rolefHarvest.run(creep);
        }
        else if(creep.memory.role == 'charvest') {
            rolecHarvest.run(creep);
        }
        else if(creep.memory.role == 'cfiller') {
            roleCfiller.run(creep);
        }
        else if(creep.memory.role == 'supplybase') {
            roleSupplybase.run(creep,Game.getObjectById(creep.memory.h_place));
        }
        else if(creep.memory.role == 'defender') {
            roleDefender.run(creep);
        }
    }
    
        
};

module.exports = assigner;