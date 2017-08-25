function notExists(object){
	return object == 'undefined' || object == null;
}

function isBlank(text){
	return notExists(text) || text == '';
}

function isAdmin(configuration){
	var isAdmin = configuration.isAdmin;
	return typeof isAdmin == 'boolean' && isAdmin;
}

function buildUrl(configuration){
	if (notExists(configuration))
		throw 'Configuration not exist';

	var requiredFields = [
		'user',
		'password',
		'server',
		'port',
		'dataBase'
	];

	for (var i in requiredFields){
		var requiredField = requiredFields[i];
		var field = configuration[requiredField];
		if (isBlank(field))
			throw requiredField + " is obligatory";
	}

	var url = 'mongodb://' + 
		configuration.user + ':' + 
		configuration.password + '@' + 
		configuration.server + ':' + 
		configuration.port + '/' + 
		configuration.dataBase;

 	return isAdmin(configuration) ?
 		url + '?authSource=admin' :
 		url;
}

exports.buildUrl = buildUrl;