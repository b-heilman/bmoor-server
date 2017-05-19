var modules = [
		{
			root: '/test',
			path: '../modules/test/router.js'
		}
	],
	middleware = [
		'../middleware/hello.js'
	];

var cors = require('cors'),
	express = require('express'),
	server = express(),
	bodyParser = require('body-parser');

server.use( cors() );
server.use( bodyParser.json() );

// load any additional middleware
middleware.forEach(function( mw ){
	console.log( 'middleware : '+mw );
	server.use( require(mw) );
});

modules.forEach(function( module ){
	var m = require( module.path );

	if ( m.canInstall() ){
		server.use( module.root, m.router );
		console.log( 'installing : '+module.path );
	}else{
		console.log( 'not installing : '+module.path );
	}
});

server.use( require('../router.js') )

module.exports = server;
