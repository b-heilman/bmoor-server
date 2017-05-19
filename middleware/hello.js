module.exports = function( req, res, next ){
	req.hello = true;

	process.send({msgFromWorker: 'This is from worker ' + process.pid + '.'});

  	console.log( 'middleware - hello', process.pid );
	next();
};