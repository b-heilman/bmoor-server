var express = require('express'),
	router = express.Router();

router
	.get('/ping',require('./src/controllers/ping.js'))
	.get('/health', require('./src/controllers/health.js'));

module.exports = router;
