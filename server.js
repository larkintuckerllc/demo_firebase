var express = require('express');
var app = express();

// MIDDLEWARE
var serveStatic = require('serve-static');
app.use(serveStatic('public', {
	'index': ['index.html'], 
	'setHeaders': function(res, path) {
		var items = path.split('/');
		if (items[items.length - 1] == 'project.manifest') {
       			res.setHeader('cache-control','private, max-age=0, no-cache');
			res.setHeader('Content-type', 'text/cache-manifest');
		} else {
       			res.setHeader('cache-control', 'max-age=300');
		}
	} 
}));
app.listen(3000);
