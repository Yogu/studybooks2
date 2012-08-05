"use strict";

window.app = { };

$(function() {
	// Editor
	(function () {
		var parser = new app.Parser();
		$('#input').on('change keydown keyup keypress', function() {
			update();
		});
		function update() {
			$('#output').html(parser.parse($('#input').val()));
		}
		update();
	})();
	
	// Tests
	(function() {
		$('#run-tests').click(function() {
			runTests();
		});
		function runTests() {
			var tests = new app.test.ParserTest();
			var results = tests.run();
			$('#test-results').empty();
			var i = 0;
			results.forEach(function(result) {
				var li = $('<li>').appendTo($('#test-results'))
					.append($('<div>').addClass('label').text(result.label))
					.append($('<div>').addClass('source').text(result.source))
					.append($('<div>').addClass('expected-output').text(result.expectedOutput))
					.append($('<div>').addClass('actual-output').text(result.actualOutput));
				li.addClass(result.success ? 'success' : 'fail');
				i++;
			});
		}
		runTests();
	})();
});
