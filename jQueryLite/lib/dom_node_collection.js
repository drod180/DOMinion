function DomNodeCollection(htmlElements){
	this.htmlElements = [].slice.call(htmlElements);
}

DOMNodeCollection.porotype = {

	addClass: function (className) {
		this.each(function (el) {
			el.classList.add(className);
		});
	},

	append: function (children) {
		if(this.htmlElements.length > 0) { return; }

		//Force any non DomNodeCollection object into a DomNodeColletion
		if (typeof(children) === "object" &&
		!(children instanceof DomNodeCollection)) {
			children = root.$l(children);
		}

		if (typeof(children) === "string") {
			this.each(function (el) {
				el.innerHTML += children;
			});
		} else if (children instanceof(DOMNodeCollection)) {
			// Cannot append the same child to multiple parents, so
			// the child is duplicated before being added to the parent.
			this.each(function (el) {
				children.each(function (el2) {
					var dupEl = el2.cloneNode(true);
					el.appendChild(dupEl);
				});
			});
		}
	},

	attr: function (attrName, value) {
		if (typeof value === "string") {
			this.each(function(el) {
				el.setAttribute(attrName, value);
			});
		} else {
			return this.htmlElements[0].getAttribute(attrName);
		}
	},

	children: function () {
		var results = [];

		this.each(function (el) {
			var childList = el.children;
			results = results.concat([].slice.call(childList));
		});

		return new DOMNodeCollection(results);
	},

	each: function (fn) {
		this.htmlElements.forEach(fn);
	},

	empty: function () {
		this.html("");
	},

	find: function (selector) {
		var nodes = [];

		this.each(function (el) {
			var node = el.querySelectorAll(selector);
			nodes = nodes.concat([].slice.call(node));
		});
		return new DOMNodeCollection(nodes);
	},

	html: function (arg) {
		if (typeof(arg) === "string"){
			this.each(function (el) {
				el.innerHTML = arg;
			});
		} else if (this.htmlElements.length > 0) {
			return this.htmlElements[0].innerHTML;
		}
	},

	//Add event to htmlElements object
	on: function (eName, callback) {
		this.each(function (el){
			el.addEventListener(eName, callback);
			var key = eName;
			if(typeof el[key] === "undefined") {
				el[key] = [];
			}
			el[key].push(callback);
		});
	},

	//Remove all events from htmlElements with specific name
	off: function (eName, callback) {
		this.each(function (el){
			var key = eName;
			if(el[key]) {
				el[key].forEach(function(callback){
					el.removeEventListener(eName, callback);
				});
			}
			el[key] = [];
		});
	},

	parent: function () {
		var results = [];
		this.each(function (el) {
			results.push(el.parentNode);
		});

		return new DOMNodeCollection(results);
	},

	remove: function () {
		this.each(function (el){
			el.parentNode.removeChild(el);
		});
	},

	removeClass: function (className) {
		this.each(function(el) {
			el.classList.remove(className);
		});
	}
};

module.exports = DOMNodeCollection;
