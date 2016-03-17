;(function (root) {
  "user strict";
  var functions = functions || [];
  var docReady = false;

  document.addEventListener("DOMContentLoaded", function() {
    functions.forEach(function (fn) {
      fn();
    });

    docReady = true;
  });

  root.$l = function (selectors) {

    if (typeof(selectors) === "string") {

      var elList = document.querySelectorAll(selectors);
      var elArray = [].slice.call(elList);

      return new DOMNodeCollection(elArray);
    } else if (typeof(selectors) === "object") {

      if (selectors.instanceof(HTMLElement)) {
        return new DOMNodeCollection(selectors);
      }
    } else if (typeof(selectors) === "function") {
      if (docReady) {
        selectors();
      } else {
        functions.push(selectors);
      }
    }


  };

  root.$l.extend = function () {
    var args = [].slice.call(arguments);
    var returnObject = {};
    args.forEach(function (obj) {
      // debugger
      Object.keys(obj).forEach(function(key){
        returnObject[key] = obj[key];
      });
    });
    return returnObject;
  };

  var DOMNodeCollection = function (htmlElements) {
    this.htmlElements = htmlElements;
  };

  DOMNodeCollection.prototype.html = function (string) {
    if (typeof(string) === "string"){
      this.forEach(function (el) {
        el.innerHTML = string;
      });
    } else {
      return this.htmlElements[0].innerHTML;
    }
  };

  DOMNodeCollection.prototype.empty = function () {
    this.html("");
  };

  DOMNodeCollection.prototype.append = function (arg) {
    if (typeof(arg) === "string") {
      this.forEach(function (el) {
        el.innerHTML += arg;
      });
    } else if (arg instanceof(HTMLElement)) {
        this.forEach(function (el) {
          var duppedArg = arg.cloneNode(true);
          el.appendChild(duppedArg);
        });

    } else if (arg instanceof(DOMNodeCollection)) {

      this.forEach(function (el) {
        arg.forEach(function (el2) {
          var duppedEl2 = el2.cloneNode(true);
          el.appendChild(duppedEl2);
        });
      });

    }
  };

  DOMNodeCollection.prototype.attr = function (attrName, value) {
    var element = this.htmlElements[0];
    if (typeof(value) === "undefined") {
      return element.getAttribute(attrName);
    } else {
      var attrValue = element.getAttribute(attrName);
        element.setAttribute(attrName, value);
    }

    return this;
  };

  DOMNodeCollection.prototype.addClass = function (value) {
    this.forEach(function (el) {
      if (el.getAttribute("class") === null) {
        el.setAttribute("class", value);
      } else {
        el.className += (" " + value);
      }
    });
  };

  DOMNodeCollection.prototype.removeClass = function (value) {
    var attrClass = this.attr("class");
    var splitClass = attrClass.split(" ");
    if (splitClass.includes(value)) {
      splitClass.splice(splitClass.indexOf(value), 1);
      var newClass = splitClass.join(" ");
      this.htmlElements[0].attributes["class"].value = newClass;
    }
    return this;
  };

  DOMNodeCollection.prototype.children = function () {
    var results = [];

    this.forEach(function (el) {
      var childs = [].slice.call(el.children);
      results = results.concat(childs);
    });

    return new DOMNodeCollection(results);
  };

  DOMNodeCollection.prototype.parent = function () {
    var results = [];

    this.forEach(function (el) {
      // debugger
      // var parents = [].slice.call(el.parentNode);
      results = results.concat(el.parentNode);
    });

    return new DOMNodeCollection(results);
  };

  DOMNodeCollection.prototype.find = function (selector) {
    var nodes = [];

    this.forEach(function (el) {
      // debugger
      var node = [].slice.call(el.querySelectorAll(selector));
      nodes = nodes.concat(node);
    });
    return new DOMNodeCollection(nodes);
  };

  DOMNodeCollection.prototype.remove = function () {
    this.forEach(function (el){
      el.parentNode.removeChild(el);
    });
    return "sennacy";
  };

  DOMNodeCollection.prototype.on = function (events, callback) {
    this.forEach(function (el){
      el.addEventListener(events, callback);
    });
  };

  DOMNodeCollection.prototype.off = function (events, callback) {
    this.forEach(function (el){
      el.removeEventListener(events, callback);
    });
  };





  DOMNodeCollection.prototype.forEach = function (callback) {
    var htmlArray = this.htmlElements;

    for(var i = 0; i < htmlArray.length; i++){
      callback(htmlArray[i]);
    }
  };



})(this);
