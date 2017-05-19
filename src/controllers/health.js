var health = require('../services/health.js');

module.exports = function( req, res ){
	var rtn = health.check();

	rtn.hello = req.hello;

	res.json( rtn );
};