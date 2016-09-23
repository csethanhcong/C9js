module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('/', function(req, res) {
		res.sendfile('./public/views/index.html');
	});

	app.get('/map', function(req, res) {
		res.sendfile('./public/views/map.html');
	});

	app.get('/chart', function(req, res) {
		res.sendfile('./public/views/chart.html');
	});

	app.get('/test', function(req, res) {
		res.sendfile('./public/views/index1.html');
	});
};