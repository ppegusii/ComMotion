$(function(){
	new Controller();
});

function Model(){
	this.entries = undefined;
}
Model.prototype.getEntries = function(cnt,cb){
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {query:'exercisesGetLimitN',n:cnt}
	}).done(this.__getAjaxCb__(cb));
};
Model.prototype.initEntry = function(exercise,cb){
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {
      query: 'exerciseInit',
      exercise: exercise
    }
	}).done(this.__getAjaxCb__(cb));
};
Model.prototype.__getAjaxCb__ = function(cb){
	var m = this;
	return function(msg){
console.log('here\' the message:');
console.log(msg);
		m.entries = msg instanceof Array
      ? msg
      : [msg];
		cb(m.entries);
	}
};

function Controller(){
	this.model = undefined;
	this.resultCnt = 10;

	this.__init__();
}
Controller.prototype.__init__ = function(){
	this.model = new Model();
	var c = this;
	this.model.getEntries(this.resultCnt,function(entries){
		c.__renderList__(entries);
	});
	this.model.initEntry(
    {
      description: 'new exercise!',
      difficulty: {id: 1},
      musclegroup: {id: 1},
      names: [{name: 'ex1',votes: 2}],
      videos: [{url: 'http://vid/myvid.ogg'}],
      photos: [{url: 'http://photo/myphoto.png'}]
    },function(entry){
      c.__renderList__([entry]);
    }
  );
};
Controller.prototype.__renderList__ = function(entries){
console.log('entries = '+JSON.stringify(entries));
	var container = $('#entries');
	container.empty();
	var c = this;
	var list = $('<ul />');
	this.model.entries.forEach(function(e,i,es){
		var item = $('<li id="'+e.id+'">'+
      JSON.stringify(e)+
			'</li>');
		list.append(item);
	});
	container.append(list);
};
