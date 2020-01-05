const fs = require('fs');
var assert = require('assert-plus');
var configProvider = require('./configurationProvider');

const leaseFile = configProvider.getConfig().dhcpLeasesFile;

function getLeases(){
    return parseLeases(fs.readFileSync(leaseFile, 'utf-8'));
}

//Huge thanks to Dave Eddy (@bahamas10)
function parseLeases(s) {
    assert.string(s, 's');
  
    var leases = [];
    var finalLeases = [];
  
    var index = -1;
    s.trim().split('\n').forEach(function(line) {
      var m;
      if ((m = line.match(/^lease (.*) {$/))) {
        // new lease
        index += 1
        leases[index] = {}
        leases[index].ip = m[1]
      } else if ((m = line.match(/^  (starts|ends|cltt|atsfp|tstp|tsfp) \d+ (.*);$/))) {
        // starts, ends, cltt, etc. dates
        leases[index][m[1]] = new Date(m[2] + ' UTC');
      } else if ((m = line.match(/^  ([a-zA-Z0-9 -]+) ([^"].*);$/))) {
        // misc.
        leases[index][m[1]] = m[2];
      } else if ((m = line.match(/^  ([a-zA-Z0-9 -]+) "(.*)";$/))) {
        // client-hostname, uid
        leases[index][m[1]] = m[2];
      }
    });
  
    // sanity check
    assert.arrayOfObject(leases, 'leases');
    leases.forEach(function (lease) {
      assert.string(lease.ip, 'lease.ip');
      assert.date(lease.starts, 'lease.starts');
      assert.date(lease.ends, 'lease.ends');
      assert.optionalString(lease['hardware ethernet'],
          'lease["hardware ethernet"]');
    });

    // finish parsing
    console.log(leases.length);
    leases.forEach(lease => {
      finalLeases.push(
        {
          ip: lease.ip,
          macAddress: lease["hardware ethernet"],
          clientHostname: lease["client-hostname"],
          binded: lease["binding state"] == "active" ? true : false
        }
      );
    });

    // remove duplicates
    finalLeases = Array.from(new Set(finalLeases.map(JSON.stringify))).map(JSON.parse);

    //log results if development mode is enabled
    if(configProvider.getConfig().developmentMode) {
      console.log(finalLeases);
    }
      
    return finalLeases;
  }

module.exports.getLeases = getLeases;

