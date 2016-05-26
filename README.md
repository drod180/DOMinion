# DOMinion

DOMinion is a lightweight DOM manipulation library that provides easy to use methods for working with the DOM with minimal overhead. DOMinion provides methods that allows adding or removing classes from HTML elements as well as methods to add event listeners and even a method for creating XML requests.

Proof of concept: [snake](http://www.drodriguez.io/snake/) | [github](https://github.com/drod180/snake)

###Technical Details:
```
//Selector can be string, HTMLElement object or function.
//Returns either DOMNodeCollection or registers callback.
root.$d = function (selector) {
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
};

//If selector is a function it will be registered and called when
// the document is ready.
var _registerCallback = function (callback) {
  if(_docReady){
    callback();
  } else {
	_docReadyCallbacks.push(callback);
  }
};
```


###Public API

`$d.extend(target[,object]...[,object])` - Merge one or more objects into target object.

`$d.ajax([options])` - Asynchronous XMLHttpRequest.
###DOMNodeCollection
####Constructor
`$d(selector)` - Create new `DOMNodeCollection` or add callback to be called on DOM ready.
#####DOM Manipulation
`addClass(className)` - Add class to DOM elements.

`append(children)` - Add `children` elements to DOM elements.

`attr(attrName, value)` - Set attribute to `value` for DOM elements.

`empty()` - Set DOM elements to empty strings.

`on(eventName, callback)` - Add `callback` to DOM elements for particular `eventName`.

`off(eventName, callback)` - Remove `callback`  from DOM elements for particular `eventName`.

`remove()` - Remove DOM elements from DOM.

`removeClass(className)` - Remove the class `className` from DOM elements

#####DOM Retrieval
`children()` - Get children of DOM elements, returns new `DOMNodeCollection`.

`each()` - Iterate through each DOM element.

`equal(index)` - Find DOM element by `index` in `DOMNodeCollection`, returns new `DOMNodeCollection`.

`filter(selector)` - Find DOM elements that match on string `selector`, returns new `DOMNodeCollection`.

`find(selector)` - Find DOM elements by `selector`, returns new `DOMNodeCollection`.

`parent()` - Get parent of DOM elements, returns new `DOMNodeCollection`.
