var pg = require('pg');

var conString = process.env.DB_CON_PG;

exports.query = query;

function query(statement,params,cb){
  pg.connect(conString,function(err,client,done){
    if(err){
      var errString = 'pg error = '+JSON.stringify(err)+'\n'+__stack;
      console.log(errString);
      cb(errString,undefined);
      return;
    }
    client.query(statement,params,function(err,result){
      done();
      if(err){
        var errString = 'statment = '+statement+'\n';
        errString += 'params = '+JSON.stringify(params)+'\n';
        errString += 'pg error = '+JSON.stringify(err)+'\n'+__stack;
        console.log(errString);
        cb(errString,undefined);
        return;
      }
      cb(undefined,result);
    });
  });
}
function queryTransaction(statement,params,cb){
  pg.connect(conString,function(err,client,done){
    if(err){
      cb(err,undefined);
      return;
    }
    client.query('BEGIN', function(err){
      if(err){
        var errString = 'pg error = '+JSON.stringify(err)+'\n'+__stack;
        console.log(errString);
        rollback(client,done,cb);
        return;
      }
      process.nextTick(function(){
        client.query(statement,params,function(err,result){
          if(err){
            var errString = 'statment = '+statement+'\n';
            errString += 'params = '+JSON.stringify(params)+'\n';
            errString += 'pg error = '+JSON.stringify(err)+'\n'+__stack;
            console.log(errString);
            rollback(client,done,cb);
            return;
          }
          client.query('COMMIT',done);
          cb(undefined,result);
        });
      });
    });
  });
}
function rollback(client,done,cb){
  client.query('ROLLBACK',function(err){
    done(err);
    cb(err,undefined);
  });
}
