"use strict"

$(function() {
	// Editor
	(function () {
		var worker = new Worker('scripts/parserworker.js');
		worker.onmessage = function(event) {
			$('#output').html(event.data);
		}
		worker.onerror = function(event) {
			alert('error');
		}
		$('#input').on('change keydown keypress keyup', function() {
			update();
		});
		update();
		function update() {
			worker.postMessage($('#input').val());
		}
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
