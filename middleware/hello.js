module.exports = function( req, res, next ){
	req.hello = true;

	console.log( 'middleware - hello', process.pid );
	next();
};