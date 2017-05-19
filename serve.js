'use strict';

var dex = {},
	cluster = require('cluster');

if ( cluster.isMaster ){
	let i,
		numWorkers = require('os').cpus().length;

    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    // best to limit this on run time
    for( i = 0; i < numWorkers; i++) {
        let worker = cluster.fork();

        worker.on('message', function(msg) {
      		console.log(
      			'Master ' + process.pid + 
      				' received message from worker ' + worker.process.pid + '.', 
      			msg
      		);
		});

        console.log( 'worker setting up ', worker.process.pid );
		worker.send({
			msgFromMaster: 'This is from master ' + process.pid + 
				' to worker ' + worker.process.pid + '.'
		});
    }

    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    // You may only want to activate this for production
    cluster.on('exit', function(worker, code, signal) {
        console.log(
        	'Worker ' + worker.process.pid + 
        		' died with code: ' + code + ', and signal: ' + signal
        );

        cluster.fork();
    });
}else{
	let server = require( './server/app.js' );

	process.on('message', function(msg) {
    	console.log(
    		'Worker ' + process.pid + 
    			' received message from master.', 
    		msg
    	);
	});

	server.listen(9001, function() {
        console.log(
        	'Process ' + process.pid + 
        		' is listening to all incoming requests'
        );
    });
}
