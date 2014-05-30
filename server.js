var connect = require('connect');
connect().use(connect.static(__dirname + '/static')).listen(process.env.PORT || 5000);