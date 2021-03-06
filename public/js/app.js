(function($) {
  $("#resume_link").click(function(){$("#res_formats").slideToggle("fast");});

	var app = $.sammy('#main', function(){
		this.use(Sammy.Handlebars, 'hb');
		// this.raise_errors = true;
		// this.debug = true;

		this.helpers({
			fetchData: function(data){
				var context = this;
				this.load('/data/'+data+'.json').then(function(data){ context[data] = data; context.log(context[data]);});
			}
		});	

		this.get('#/resume', function(context) {
			this.load('/data/jobs.json').then(function(jobs){ context.jobs = jobs;})
			.then(this.load('/data/madagascar.json').then(function(madagascar){ context.madagascar = madagascar;}))
			.then(function(){
				this.partial('/templates/jobs.hb')
				.then(function(){
					this.render('/templates/madagascar.hb').appendTo(context.$element());
				});
				
			});
		});

		this.get('#/print', function(context) {
			this.render('/templates/contact.hb').prependTo(context.$element())
			.then(function(){window.print();});
		});

	});

	$(document).ready(function(){
		$('#main').html('');
		app.run('#/resume');
	});
	window.app = app;
})(jQuery);
