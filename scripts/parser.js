Parser = function() {
	var converter = new Markdown.Converter();
	converter.hooks.set('preSpanProcess', function(a) {
		return ASCIIMathML.autoParse(a, { auto: 'never' }); 
	});
	//converter.hooks.set('postConversion')
	this.parse = function(text) {
		return converter.makeHtml(text);
	};
}
