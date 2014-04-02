$(function(){
	new Controller();
});

function Model(){
	this.entries = undefined;
}
Model.prototype.getEntries = function(cnt,cb){
	$.ajax({
		type: 'POST',
		url: '/encyclopedia',
		data: {n:cnt}
	}).done(this.__getAjaxCb__(cb));
};
Model.prototype.__getAjaxCb__ = function(cb){
	var m = this;
	return function(msg){
		m.entries = msg;
		cb(msg);
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
};
Controller.prototype.__renderList__ = function(entries){
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
