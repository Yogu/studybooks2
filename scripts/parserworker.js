importScripts('ASCIIMathML.js', 'Markdown.Converter.js', 'parser.js');

var parser = new Parser();

onMessage = function(event) {
	var source = event.data;
	var output = parser.parse(source);
	postMessage(output)
};
