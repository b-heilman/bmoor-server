var express = require('express'),
	router = express.Router();

router.get('/go',function( req, res ){
	res.json( {hello:'world'} );
});

module.exports = {
	canInstall: function(){
		return true;
	},
	router: router
};