var path = require('path');

var appDir = path.dirname(require.main.filename);
process.env['APP_DIR'] = appDir;

//database
process.env['DB_CON_PG'] = 'postgres://vagrant:vagrant@localhost/commotion';

//datalayer
var dataDir = path.join(appDir,'./data');
process.env['DATA'] = dataDir;
process.env['DATA_CONN'] = path.join(dataDir,'./Conn.js');
process.env['DATA_EXERCISE'] = path.join(dataDir,'./Exercise.js');
process.env['DATA_DIFFICULTY'] = path.join(dataDir,'./Difficulty.js');
process.env['DATA_MUSCLEGROUP'] = path.join(dataDir,'./Musclegroup.js');
process.env['DATA_NAME'] = path.join(dataDir,'./Name.js');
process.env['DATA_VIDEO'] = path.join(dataDir,'./Video.js');
process.env['DATA_PHOTO'] = path.join(dataDir,'./Photo.js');

//models
var modelsDir = path.join(appDir,'./models');
process.env['MODELS'] = modelsDir;

//routes
var routesDir = path.join(appDir,'./routes');
process.env['ROUTES'] = routesDir;
process.env['ROUTES_QUERY'] = path.join(routesDir,'./query.js');
process.env['ROUTES_USER'] = path.join(routesDir,'./user');

//test
var testDir = path.join(appDir,'./test');
