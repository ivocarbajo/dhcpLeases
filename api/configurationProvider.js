const fs = require('fs');

function getConfig(){
    if(fs.existsSync('./config.json')) {
        var config = require('./config.json');

        return config;
    } else {
        console.error("Config file was not found, please make sure you have created config.json in the root folder.");
    }
}

module.exports.getConfig = getConfig;