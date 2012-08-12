"use strict";

self.Parser = function() {
	var converter = new Markdown.Converter();
	converter.hooks.set('preSpanProcess', function(a) {
		a = (' ' + a + ' ').replace(/(\s)°((°°|[^°])+)°(\s)/g, function(total, before, expression, dummy, after) {
			expression = expression.replace('°°', '°');
			return before + ASCIIMathML.parse(expression.trim()) + after;
		}); 
		return a;
	});
	converter.hooks.set('postCodeConversion', function(a, original) {
		return prettifySource(original /* original: <span>; a: &lt;span;&gt;*/);
	});
	//converter.hooks.set('postConversion')
	this.parse = function(text) {
		return converter.makeHtml(text);
	};
}
