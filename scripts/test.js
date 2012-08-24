(function() {
	if (!window.app)
		window.app = { };
	
	app.test = { };
	app.test.ParserTest = function() {
		var tests = [
			{
				label: 'code-simple',
				source: '`text`',
				output: '<p><code><span class="pln">text</span></code></p>'
			},
			{
				label: 'code-conflate-decorations',
				source: '`text text 2`',
				output: '<p><code><span class="pln">text text</span><span class="lit">2</span></code></p>'
			},
			{
				label: 'code-strings',
				source: '`"abc\\ndef" abc`',
				output: '<p><code><span class="str">"abc\\ndef"</span><span class="pln">abc</span></code></p>'
			},
			{
				label: 'code-html',
				source: '`<b>a</b>`',
				output: '<p><code><span class="tag">&lt;b&gt;</span><span class="pln">a</span><span class="tag">&lt;/b&gt;</span></code></p>'
			},
			{
				label: 'code-html2',
				source: '`<b></b>`',
				output: '<p><code><span class="tag">&lt;b&gt;&lt;/b&gt;</span></code></p>'
			},
		             
 			{
				label: 'math-start',
				source: 'a test: °a^2°',
				output: '<p>a test:<span class="math"><math title="a^2"><msup><mi>a</mi><mn>2</mn></msup></math></span></p>'
			},
 			{
				label: 'math-start2',
				source: '°a°',
				output: '<p><span class="math"><math title="a"><mi>a</mi></math></span></p>'
			},
 			{
				label: 'math-start3',
				source: '°a°°°',
				output: '<p><span class="math"><math title="a°"><mi>a</mi><mo>°</mo></math></span></p>'
			},
 			{
				label: 'math-start4',
				source: '°a° °°',
				output: '<p><span class="math"><math title="a"><mi>a</mi></math></span>°°</p>'
			},
 			{
				label: 'math-start5',
				source: '°a°  °b°',
				output: '<p><span class="math"><math title="a"><mi>a</mi></math></span><span class="math"><math title="b"><mi>b</mi></math></span></p>'
			},
 			{
				label: 'math-start6',
				source: '°a° 1 °b°',
				output: '<p><span class="math"><math title="a"><mi>a</mi></math></span>1<span class="math"><math title="b"><mi>b</mi></math></span></p>'
			},
 			{
				label: 'math-start7',
				source: '°a° °',
				output: '<p><span class="math"><math title="a"><mi>a</mi></math></span>°</p>'
			},
 			{
				label: 'math-start8',
				source: '°a° a°b',
				output: '<p><span class="math"><math title="a"><mi>a</mi></math></span>a°b</p>'
			},
 			{
				label: 'math-start9',
				source: '360° °a° 370°',
				output: '<p>360°<span class="math"><math title="a"><mi>a</mi></math></span>370°</p>'
			},
 			{
				label: 'math-sqrt',
				source: '°sqrt2°',
				output: '<p><span class="math"><math title="sqrt2"><msqrt><mn>2</mn></msqrt></math></span></p>'
			},
 			{
				label: 'math-pow',
				source: '°a^2°',
				output: '<p><span class="math"><math title="a^2"><msup><mi>a</mi><mn>2</mn></msup></math></span></p>'
			},
 			{
				label: 'math-parenthesis',
				source: '°a/(2b)°',
				output: '<p><span class="math"><math title="a/(2b)"><mfrac><mi>a</mi><mrow><mn>2</mn><mi>b</mi></mrow></mfrac></math></span></p>'
			},
 			{
				label: 'math-vector',
				source: '°((1),(2))°',
				output: '<p><span class="math"><math title="((1),(2))"><mrow><mo>(</mo><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable><mo>)</mo></mrow></math></span></p>'
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
				if (!test.pre)
					output = output.replace(/\s+/g, ' ').replace(/\s+(\W)/g, '$1').replace(/(\W)\s+/g, '$1').trim();
				var success = output == test.output;
				if (!success)
					overallSuccess = false;
				var result = {label: test.label, source: test.source, expectedOutput: test.output, actualOutput: output, success: success };
				if (success)
					results.push(result);
				else
					results.unshift(result);
			}
			results.success = overallSuccess;
			return results;
		};
	};
})();