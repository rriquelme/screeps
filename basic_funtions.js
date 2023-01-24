var bf = {
    // Repair Function
    go_to_repair: function (creep,build){
        if(creep.repair(build) == ERR_NOT_IN_RANGE) {
            creep.moveTo(build, {visualizePathStyle: {stroke: '#0000ff'}});
        }
    },
    // Supply Function
    go_to_supply: function (creep,build){
        if(creep.transfer(build, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(build, {visualizePathStyle: {stroke: '#ffff00'}});
        }
    }
    

};

module.exports = bf;