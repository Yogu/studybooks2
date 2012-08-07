Parser = function() {
	var converter = new Markdown.Converter();
	converter.hooks.set('preSpanProcess', function(a) {
		a = (' ' + a + ' ').replace(/(\s)°((°°|[^°])+)°(\s)/g, function(total, before, expression, dummy, after) {
			expression = expression.replace('°°', '°');
			return before + ASCIIMathML.parse(expression.trim()) + after;
		}); 
		return a;
	});
	//converter.hooks.set('postConversion')
	this.parse = function(text) {
		return converter.makeHtml(text);
	};
}
