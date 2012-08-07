(function() {
	if (!window.app)
		window.app = { };
	
	app.test = { };
	app.test.ParserTest = function() {
		var tests = [
 			{
				label: 'math',
				source: 'a test: °a^2°',
				output: '<p>a test:<math title="a^2"><msup><mi>a</mi><mn>2</mn></msup></math></p>'
			},
 			{
				label: 'math2',
				source: '°a°',
				output: '<p><math title="a"><mi>a</mi></math></p>'
			},
 			{
				label: 'math3',
				source: '°a°°°',
				output: '<p><math title="a°"><mi>a</mi><mo>°</mo></math></p>'
			},
 			{
				label: 'math3b',
				source: '°a° °°',
				output: '<p><math title="a"><mi>a</mi></math>°°</p>'
			},
 			{
				label: 'math4',
				source: '°a° °b°',
				output: '<p><math title="a"><mi>a</mi></math><math title="b"><mi>b</mi></math></p>'
			},
 			{
				label: 'math5',
				source: '°a° °',
				output: '<p><math title="a"><mi>a</mi></math>°</p>'
			},
 			{
				label: 'math6',
				source: '°a° a°b',
				output: '<p><math title="a"><mi>a</mi></math>a°b</p>'
			},
 			{
				label: 'math7',
				source: '360° °a° 370°',
				output: '<p>360°<math title="a"><mi>a</mi></math>370°</p>'
			},
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
			var parser = new Parser();
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