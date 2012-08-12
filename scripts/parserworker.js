"use strict";

importScripts('simpledom.js', 'ASCIIMathML.js', 'Markdown.Converter.js', 'google-code-prettify/prettify.js', 'parser.js');

var waitTime = 0;
var parser = new Parser();
var currentRequest;
var timeout = null;

self.onmessage = function(event) {
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
