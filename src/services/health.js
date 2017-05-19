module.exports = {
	check: function(){
		return { 
			valid: true,
			process: process.pid
		};
	}
};