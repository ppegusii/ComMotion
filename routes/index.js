var fs = require('fs');
var async = require('async');

var data = require(process.env.DATA);
var query = require(process.env.ROUTES_QUERY);

exports.index = index;
exports.query = query.query;
exports.documentation = documentation;
exports.tests = tests;

/*
 * GET home page.
 */

function index(req, res){
  res.render('index', { title: 'ComMotion' });
}

function documentation(req,res){
  async.parallel({
    models: function(callback){
      fs.readFile(process.env.MODELS_INDEX,'utf8',callback);
    },
    datalayer: function(callback){
      fs.readFile(process.env.DATA_INDEX,'utf8',callback);
    },
    sql: function(callback){
      fs.readFile('./sql/CreateDb.sql','utf8',callback);
    }
  },
  function afterReadingFiles(err,results){
    if(err){
      res.send(err);
      return;
    }
    res.render('documentation',{
      title: 'Documentation',
      models: results.models,
      datalayer: results.datalayer,
      sql: results.sql
    });
  });
}
function tests(req,res){
  res.render('tests',{title: 'Tests'});
}
