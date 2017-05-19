var connections = {};

module.exports = {
	setConection: function( name, connection ){
		connection[ name.toLowerCase() ] = connection;
	},
	getConnection: function( name ){
		return connection[ name.toLowerCase() ];
	}
};