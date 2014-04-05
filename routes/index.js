var data = require(process.env.DATA);
var query = require(process.env.ROUTES_QUERY);

exports.index = index;
exports.query = query.query;

/*
 * GET home page.
 */

function index(req, res){
  res.render('index', { title: 'ComMotion' });
}
