const dhcpController = require('./dhcpController.js');

module.exports.route = route;

function route(url){
    switch (url) {
        case '/v1/ip/leases':
            result = JSON.stringify(dhcpController.getLeases().filter(x => {return x.binded}));
            return result;
            
        case '/v1/ip/leases/all':
            result = JSON.stringify(dhcpController.getLeases());
            return result;

        case '/':
            result = '<p> You have reached the home page of the DCHP Api for this home network. <br> Please try GET - /v1/ip/leases for a json response containing dhcp lease information </p>';
            return result;
    
        default:
            result = 'HTTP 1.1 404 Not Found';
            return result;
    }
}