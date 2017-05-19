'use strict';

var cluster = require('cluster');

if ( cluster.isMaster ){
	let i,
		numWorkers = require('os').cpus().length;

    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    // best to limit this on run time
    for( i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    // You may only want to activate this for production
    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
}else{
	let server = require( './server/app.js' );

	server.listen(9001, function() {
        console.log('Process ' + process.pid + ' is listening to all incoming requests');
    });
}
