$(document).ready(function(){
		template = "{{#jobs}}<h2>{{position}}</h2><h3>{{company}}</h3><span>{{start-date}} - {{end-date}}</span><ul>  {{#acomplishments}}    <li>{{.}}</li>  {{/acomplishments}}</ul><span>Utilized: {{#tools}}{{.}}, {{/tools}}</span>{{/jobs}}"
		$.getJSON('/json/jobs.json', function(view){
			html = $.mustache(template, view);
			$('#main').html(html)
			});
		});


