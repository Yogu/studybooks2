"use strict";

(function(global) {
	function encodeHTML(str) {
		return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	}

	function SimpleNode(nodeName, namespace) {
		this.nodeName = nodeName;
		this.namespace = namespace || "";
		this.attributes = [];
		this.childNodes = [];
		this.parent = null;
	}

	SimpleNode.prototype = {
		ELEMENT_NODE: 1,
			
		setAttribute: function(name, value) {
			this.attributes[name] = value;
		},
		
		getAttribute: function(name) {
			return this.attributes[name];
		},
		
		appendChild: function(node) {
			if (node) {
				if (node.nodeName == 'fragment') {
					var self = this;
					node.childNodes.forEach(function(node) {
						self.appendChild(node);
					});
				} else {
					if (node.parent != null)
						node.parent.removeChild(node);
					this.childNodes.push(node);
					node.parent = this;
				}
			}
			return this;
		},
		
		replaceChild: function(newChild, oldChild) {
			var index = this.childNodes.indexOf(oldChild);
			if (index >= 0) {
				this.childNodes[index] = newChild;
				newChild.parent = this;
				oldChild.parent = null;
			} else
				throw new Error("replaceChild: oldChild is not a child node");
		},
		
		removeChild: function(child) {
			this.childNodes = this.childNodes.filter(function(n) { return n != child; });
		},
		
		get innerHTML() {
			return this.childNodes.map(function(node) { return node.outerHTML; }).join('');
		},
		
		get outerHTML() {
			if (this.nodeName == 'fragment')
				return this.innerHTML;
			else {
				var attr = "";
				for (var name in this.attributes) {
					attr += ' ' + name + '="' + encodeHTML(this.attributes[name]) + '"';
				}
				return '<' + this.nodeName + attr + '>' + this.innerHTML + '</' + this.nodeName + '>';
			}
		},
		
		get nodeType() {
			return this.ELEMENT_NODE;
		},
		
		get firstChild() {
			return this.childNodes.length > 0 ? this.childNodes[0] : null;
		},
		
		get children() {
			return this.childNodes.filter(function(n) { return n.nodeType == this.ELEMENT_NODE; });
		},
		
		get firstElementChild() {
			var children = this.children;
			return children.length > 0 ? children[0] : null;
		},
		
		get lastChild() {
			return this.childNodes.length > 0 ? this.childNodes[this.childNodes.length - 1] : null;
		},
		
		get lastElementChild() {
			var children = this.children;
			return children.length > 0 ? children[children.length - 1] : null;
		},
		
		get nextSibling() {
			if (this.parent) {
				var index = this.parent.childNodes.indexOf(this);
				if (index >= 0 && index < this.parent.childNodes.length - 1) {
					return this.parent.childNodes[index + 1];
				}
			}
			return null;
		},
		
		get nextElementSibling() {
			if (this.parent) {
				var children = this.parent.children;
				var index = children.indexOf(this);
				if (index >= 0 && index < children.length - 1) {
					return children[index + 1];
				}
			}
			return null;
		},
		
		get previousSibling() {
			if (this.parent) {
				var index = this.parent.childNodes.indexOf(this);
				if (index > 0)
					return this.parent.childNodes[index - 1];
			}
			return null;
		},
		
		get previousElementSibling() {
			if (this.parent) {
				var children = this.parent.children;
				var index = children.indexOf(this);
				if (index > 0) {
					return children[index - 1];
				}
			}
			return null;
		}
	};
	
	function TextNode(text) {
		this.text = text;
	}
	
	TextNode.prototype = {
		TEXT_NODE: 3,
		
		get nodeType() {
			return this.TEXT_NODE;
		},
		
		get outerHTML() {
			return encodeHTML(this.text);
		},
		
		get innerHTML() {
			return "";
		},
		
		get nodeValue() {
			return this.text;
		}
	};
	
	global.document = {
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
