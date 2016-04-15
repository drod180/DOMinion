
var DomNodeCollection = require("./dom_node_collection");
var _docReadyCallbacks = [];
var _docReady = false;


document.addEventListener("DOMContentLoaded", function() {
	_docReadyCallbacks.forEach(function (fn) { fn(); });
	docReady = true;
});

function $l(selectors) {
	var returnVal;

	switch (typeof(selector)) {
		case "string":
			returnVal = _getSelectorsFromDom(selector);
			break;
		case "object":
			if (selector instanceof HTMLElement) {
				returnVal = new DOMNodeCollection(selectors);
			}
			break;
		case "function":
				_registerCallback(selector);
			break;
	}

	return returnVal;
}


$l.extend = function (originalObj) {
	var otherArgs = [].slice.call(arguments, 1);
	otherArgs.forEach(function (obj) {
		for (var key in obj){
			if (obj.hasOwnProperty(key)){
				originalObj[key] = obj[key];
			}
		}
	});

	return originalObj;
};

$l.ajax = function (options) {
	var request = new XMLHttpRequest();

	//Defaults similar to jQuery.ajax() defaults
	var defaults = {
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		method: "GET",
		url: "",
		success: function(){},
		error: function(){},
		data: {},
		dataType: "html"
	};

	options = $l.extend(defaults, options);

	if (options.method.toUpperCase() === "GET") {
		//When method is Get the data will be a query string
		options.url += "?" + toQueryString(options.data);
	}

	// Information on using XMLHttpRequests can be found at
	// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
	request.open(options.method, options.url, true);
	request.onload = function (e) {
		if (request.status == 200) {
			options.sucess(request.response);
		} else {
			options.error(request.response);
		}
	};
	request.send(JSON.stringify(options.data));
};

function _registerCallback(callback) {
  if(_docReady){
    callback();
  } else {
		_docReadyCallbacks.push(callback);
  }
}

function _getSelectorsFromDom(selector) {
	var selArr = [].slice.call(document.querySelectorAll(selectors));
	return new DOMNodeCollection(selArr);
}
