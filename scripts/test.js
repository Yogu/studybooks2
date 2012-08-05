(function() {
	app.test = { };
	app.test.ParserTest = function() {
		var tests = [
 			{
				label: 'empty',
				source: '',
				output: '',
			},
			{
				label: 'paragraph',
				source: 'abc',
				output: '<p>abc</p>',
			},
			{
				label: 'paragraphs',
				source: 'abc\n\ndef',
				output: '<p>abc</p><p>def</p>',
			},
			{
				label: 'line-break',
				source: 'abc\ndef',
				output: '<p>abc<br>def</p>',
			},
			{
				label: 'italic',
				source: '*abc*',
				output: '<p><em>abc</em></p>',
			},
			{
				label: 'bold',
				source: '**abc**',
				output: '<p><strong>abc</strong></p>',
			},
			{
				label: 'auto-link',
				source: 'http://google.com',
				output: '<p><a href="http://google.com">http://google.com</a></p>',
			},
			{
				label: 'ordered-lists',
				source: ['1. first', '2. second', '3. third', '', 'another paragraph'].join('\n'),
				output: '<ol><li>first</li><li>second</li><li>third</li></ol><p>another paragraph</p>'
			},
			{
				label: 'unodered-lists',
				source: ['* first', '* second', '* third', '', 'another paragraph'].join('\n'),
				output: '<ul><li>first</li><li>second</li><li>third</li></ul><p>another paragraph</p>'
			},
			{
				label: 'line-break-in-list',
				source: ['* line', '  another line'].join('\n'),
				output: '<ul><li>line<br>another line</li></ul>'
			},
		];
		
		this.run = function() {
			var results = [];
			var parser = new app.Parser();
			var overallSuccess = true;
			for (var i = 0; i < tests.length; i++) {
				var test = tests[i];
				var output = parser.parse(test.source);
				output = output.replace(/\s+/g, ' ').replace(/\s+(\W)/g, '$1').replace(/(\W)\s+/g, '$1').trim();
				var success = output == test.output;
				if (!success)
					overallSuccess = false;
				var result = {label: test.label, source: test.source, expectedOutput: test.output, actualOutput: output, success: success };
				results.push(result);
			}
			results.success = overallSuccess;
			return results;
		}
	};
})();