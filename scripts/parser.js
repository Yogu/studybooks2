app.Parser = function() {
	var converter = new Markdown.Converter();
	
	this.parse = function(text) {
		return converter.makeHtml(text);
	};
}
