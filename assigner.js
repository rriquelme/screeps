var role_wave_1 = require("role.first_wave");

var assigner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.role == 'wave_1') {
            role_wave_1.run(creep);
        }
    }
    
        
};

module.exports = assigner;