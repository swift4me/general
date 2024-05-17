const fs = require('fs');

// ---------------------------------------------------------------------------- F I L E  I / O

function writeFileSyn(fspec,fcontents) { 
    fs.writeFileSync(fspec, fcontents);
}

function writeJsonFileSyn(fspec,fcontents_json) {
    const fcontents_str = JSON.stringify(fcontents_json,null,1); 
    writeFileSyn(fspec, fcontents_str);
}

function getData() { 
    const fileContent = fs.readFileSync(infspec, 'utf8');
    const lines = fileContent.split('\n');
    return lines;
}


// ---------------------------------------------------------------------------- V A L I D A T I O N
function isudef(o) { return o == undefined; }
function isdef(o) { return !isudef(o); }

// ---------------------------------------------------------------------------- U N I T   C O N V E R S I O N S
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

function km2miles(km) {
    return km / 1.609344;
}

// ---------------------------------------------------------------------------- P O L A R   D I S T A N C E
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
}

// ---------------------------------------------------------------------------- D A T E S
function todayasstr() { 
    const dt = new Date();
    return dt.toLocaleDateString("en-US").replaceAll('/','_');
}  
// ---------------------------------------------------------------------------- S T R I N G S
function swap(raw, target, replacement) { 
    var temp = raw;
    return temp.replaceAll(target, replacement);
}

// ---------------------------------------------------------------------------- J A S O N
function jsonasstr(j) { return JSON.stringify(j, null, 0); }

// ---------------------------------------------------------------------------- L O G G I N G
const _dbug = true;
function ilog(msg,prefix=undefined) { 
    if (_dbug) {
        const xtra = prefix + ' ' || '';
        console.info(`${xtra}${msg}`);
    }
}
function dlog(msg,prefix=undefined) { 
    if (_dbug) {
        const xtra = prefix + ' ' || '';
        console.log(`${xtra}${msg}`);
    }
}
function elog(msg,prefix=undefined) { 
    if (_dbug) {
        const xtra = prefix + ' ' || '';
        console.error(`${xtra}${msg}`);
    }
}

// ---------------------------------------------------------------------------- E X P O R T S
module.exports.isudef = isudef;
module.exports.isdef = isdef;
module.exports.jsonasstr = jsonasstr;
module.exports.deg2rad = deg2rad;
module.exports.km2miles = km2miles;
module.exports.getDistanceFromLatLonInKm = getDistanceFromLatLonInKm;
module.exports.todayasstr = todayasstr;
module.exports.writeJSONFileSyn = writeJSONFileSyn;
module.exports.writeFileSyn = writeFileSyn;
module.exports.ilog = ilog;
module.exports.dlog = dlog;
module.exports.elog = elog;

console.log("toolbox.js loaded");
