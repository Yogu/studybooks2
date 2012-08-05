"use strict";

$(function() {
	var converter = new Markdown.Converter();
	$('#input').on('change keydown keyup keypress', function() {
		update();
	});
	function update() {
		$('#output').html(converter.makeHtml($('#input').val()));
	}
	update();
});
