importScripts('ASCIIMathML.js', 'Markdown.Converter.js', 'parser.js');

var waitTime = 100;
var parser = new Parser();
var currentRequest;
var timeout = null;

onmessage = function(event) {
	currentRequest = event.data;
	if (!timeout)
		timeout = setTimeout(work, waitTime);
};

function work() {
	timeout = null;
	var source = currentRequest;
	var output = parser.parse(source);
	postMessage(output);
}
