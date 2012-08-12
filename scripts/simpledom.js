"use strict";

(function(global) {
	function SimpleNode(tagName, namespace) {
		this.tagName = tagName;
		this.namespace = namespace || "";
		this.attributes = [];
		this.childNodes = [];
		this.parent = null;
	}
	
	function encodeHTML(str) {
		return str.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot');
	}
	
	SimpleNode.prototype = {
		setAttribute: function(name, value) {
			this.attributes[name] = value;
		},
		
		getAttribute: function(name) {
			return this.attributes[name];
		},
		
		appendChild: function(node) {
			if (node) {
				this.childNodes.push(node);
				node.parent = this;
			}
			return this;
		},
		
		get innerHTML() {
			return this.childNodes.map(function(node) { return node.outerHTML; }).join('');
		},
		
		get outerHTML() {
			if (this.tagName == 'fragment')
				return this.innerHTML;
			else {
				var attr = "";
				for (var name in this.attributes) {
					attr += ' ' + name + '="' + encodeHTML(this.attributes[name]) + '"';
				}
				return '<' + this.tagName + attr + '>' + this.innerHTML + '</' + this.tagName + '>';
			}
		}
	};
	
	function TextNode(text) {
		this.text = text;
	}
	
	TextNode.prototype = {
		get outerHTML() {
			return encodeHTML(this.text);
		},
		
		get innerHTML() {
			return "";
		}
	};
	
	self.test = 'abcde3f';
	
	self.document = {
		createElement: function(tagName) {
			return new SimpleNode(tagName);
		},
		
		createElementNS: function(namespace, tagName) {
			return new SimpleNode(tagName, namespace);
		},
		
		createTextNode: function(text) {
			return new TextNode(text);
		},

		createDocumentFragment: function() {
			return new SimpleNode('fragment');
		}
	};
})(self);
