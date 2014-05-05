var path = require('path');

var appDir = path.dirname(require.main.filename);
process.env['APP_DIR'] = appDir;

//database
process.env['DB_CON_PG'] = 'postgres://vagrant:vagrant@localhost/commotion';

//data layer
var dataDir = path.join(appDir,'./data');
process.env['DATA'] = dataDir;
process.env['DATA_INDEX'] = path.join(dataDir,'./index.js');
process.env['DATA_CONN'] = path.join(dataDir,'./Conn.js');
process.env['DATA_COMMON'] = path.join(dataDir,'./common.js');
process.env['DATA_EXERCISE'] = path.join(dataDir,'./Exercise.js');
process.env['DATA_DIFFICULTY'] = path.join(dataDir,'./Difficulty.js');
process.env['DATA_MUSCLEGROUP'] = path.join(dataDir,'./Musclegroup.js');
process.env['DATA_NAME'] = path.join(dataDir,'./Name.js');
process.env['DATA_VIDEO'] = path.join(dataDir,'./Video.js');
process.env['DATA_PHOTO'] = path.join(dataDir,'./Photo.js');
process.env['DATA_USER'] = path.join(dataDir,'./User.js');
process.env['DATA_ACTIVITY'] = path.join(dataDir,'./Activity.js');
process.env['DATA_POST'] = path.join(dataDir,'./Post.js');
process.env['DATA_MEASUREMENT'] = path.join(dataDir,'./Measurement.js');
process.env['DATA_TIMER'] = path.join(dataDir,'./Timer.js');
process.env['DATA_EXERCISEINSTANCE'] = path.join(dataDir,'./ExerciseInstance.js');

//validation layer
var validateDir = path.join(appDir,'./validate');
process.env['VALIDATE'] = validateDir;
process.env['VALIDATE_EXERCISE'] = path.join(validateDir,'./Exercise.js');
process.env['VALIDATE_DIFFICULTY'] = path.join(validateDir,'./Difficulty.js');
process.env['VALIDATE_MUSCLEGROUP'] = path.join(validateDir,'./Musclegroup.js');
process.env['VALIDATE_NAME'] = path.join(validateDir,'./Name.js');
process.env['VALIDATE_VIDEO'] = path.join(validateDir,'./Video.js');
process.env['VALIDATE_PHOTO'] = path.join(validateDir,'./Photo.js');
process.env['VALIDATE_USER'] = path.join(validateDir,'./User.js');
process.env['VALIDATE_POST'] = path.join(validateDir,'./Post.js');
process.env['VALIDATE_ACTIVITY'] = path.join(validateDir,'./Activity.js');

//models
var modelsDir = path.join(appDir,'./models');
process.env['MODELS'] = modelsDir;
process.env['MODELS_INDEX'] = path.join(modelsDir,'./index.js');

//routes
var routesDir = path.join(appDir,'./routes');
process.env['ROUTES'] = routesDir;
process.env['ROUTES_QUERY'] = path.join(routesDir,'./query.js');
process.env['ROUTES_USER'] = path.join(routesDir,'./user');

//tests
//var testsDir = path.join(appDir,'./tests');
//process.env['TESTS'] = testsDir;
//process.env['TESTS_DATA'] = path.join(testsDir,'./data');
