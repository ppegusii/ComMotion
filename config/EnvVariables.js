var path = require('path');

var appDir = path.dirname(require.main.filename);
process.env['APP_DIR'] = appDir;

//database
var dbDir = path.join(appDir,'./db');
process.env['DB_COMMOTION'] = path.join(dbDir,'./ComMotion.db');

//datalayer
var dataDir = path.join(appDir,'./data');
process.env['DATA_EXERCISE'] = path.join(dataDir,'./Exercise.js');

//models
var modelsDir = path.join(appDir,'./models');
process.env['MODELS_EXERCISE'] = path.join(modelsDir,'./Exercise.js');

//routes
var routesDir = path.join(appDir,'./routes');
process.env['ROUTES'] = routesDir;
process.env['ROUTES_USER'] = path.join(routesDir,'./user');

//test
var testDir = path.join(appDir,'./test');
