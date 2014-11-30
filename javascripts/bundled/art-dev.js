var artjs = {
  VERSION: "2.0",
  data: {
    tree: {}
  },
  dom: {},
  events: {},
  math: {},
  module: {},
  net: {},
  spec: {
    matchers: {}
  },
  template: {},
  transition: {},
  ui: {},
  utils: {}
};

artjs.log = function() {
  if (typeof console === "object") {
    console.log(artjs.$A(arguments));
  }
};

artjs.p = artjs.log;

artjs.ObjectUtils = artjs.utils.Object = {
  _name: "ObjectUtils",
  QUERY_DELIMITER: "&",
  init: function() {
    this._invertedRemoveValueDC = artjs.$DC(this, "_invertedRemoveValue");
    this._eachPairDeleteValueDC = artjs.$DC(this, "_eachPairDeleteValue");
    this._eachKeyDeleteKeyDC = artjs.$DC(this, "_eachKeyDeleteKey");
    this._invertedIncludesDC = artjs.$DC(this, "_invertedIncludes");
    this._pairToQueryStringDC = artjs.$DC(this, "_pairToQueryString");
    this._parseArrayValueDC = artjs.$DC(this, "_parseArrayValue");
  },
  copy: function(obj) {
    var copy = {};
    this.copyProps(obj, copy);
    return copy;
  },
  copyProps: function(source, target) {
    for (var i in source) {
      if (source.hasOwnProperty(i)) {
        target[i] = source[i];
      }
    }
  },
  extend: function(target, source) {
    this.copyProps(source, target);
  },
  merge: function(target, source) {
    this.extend(target, source);
    return target;
  },
  update: function(target, source) {
    return this.merge(target, source);
  },
  removeValue: function(obj, val) {
    this._eachPairDeleteValueDC.delegate.args = [ obj, val ];
    this.eachPair(obj, this._eachPairDeleteValueDC);
  },
  removeKeys: function(obj, keys) {
    this._eachKeyDeleteKeyDC.delegate.args = [ obj ];
    artjs.ArrayUtils.each(keys, this._eachKeyDeleteKeyDC);
  },
  removeValues: function(obj, values) {
    this._invertedRemoveValueDC.delegate.args = [ obj ];
    artjs.ArrayUtils.eachItem(values, this._invertedRemoveValueDC);
  },
  keys: function(obj) {
    var result = [];
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        result.push(i);
      }
    }
    return result;
  },
  values: function(obj) {
    var result = [];
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        result.push(obj[i]);
      }
    }
    return result;
  },
  map: function(obj, func, context) {
    var result = [];
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        result.push(func.call(context, i, obj[i]));
      }
    }
    return result;
  },
  mapValue: function(obj, func, context) {
    var result = {};
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        result[i] = func.call(context, obj[i]);
      }
    }
    return result;
  },
  mapKey: function(obj, func, context) {
    var result = {};
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        result[func.call(context, i)] = obj[i];
      }
    }
    return result;
  },
  each: function(obj, func, context) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        func.call(context, obj[i]);
      }
    }
  },
  eachKey: function(obj, func, context) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        func.call(context, i);
      }
    }
  },
  eachPair: function(obj, func, context) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        func.call(context, i, obj[i]);
      }
    }
  },
  select: function(obj, func, context) {
    var result = {};
    var j;
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        j = obj[i];
        if (func.call(context, j, i)) {
          result[i] = j;
        }
      }
    }
    return result;
  },
  reject: function(obj, func, context) {
    var result = {};
    var j;
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        j = obj[i];
        if (!func.call(context, j)) {
          result[i] = j;
        }
      }
    }
    return result;
  },
  isArray: function(obj) {
    return this.is(obj, Array);
  },
  isString: function(obj) {
    return this.is(obj, String);
  },
  is: function(obj, type) {
    return obj.constructor === type;
  },
  isEmpty: function(obj) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        return false;
      }
    }
    return true;
  },
  isNotEmpty: function(obj) {
    return !this.isEmpty(obj);
  },
  build: function(arr, func, context) {
    var result = {};
    var item;
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];
        result[item] = func.call(context, item);
      }
    }
    return result;
  },
  fromPoints: function(arr) {
    var result = {};
    var item;
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];
        result[item.x] = item.y;
      }
    }
    return result;
  },
  fromArray: function(arr) {
    var result = {};
    var item;
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];
        result[item[0]] = item[1];
      }
    }
    return result;
  },
  toArray: function(obj) {
    return this.map(obj, this._keyValueArray, this);
  },
  includes: function(obj, item) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i) && obj[i] === item) {
        return true;
      }
    }
    return false;
  },
  includesAll: function(obj, subset) {
    this._invertedIncludesDC.delegate.args = [ obj ];
    return this.all(subset, this._invertedIncludesDC);
  },
  all: function(obj, func) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i) && !func(obj[i])) {
        return false;
      }
    }
    return true;
  },
  toQueryString: function(obj) {
    return this._toQueryStringWithPrefix(obj, "");
  },
  _toQueryStringWithPrefix: function(obj, prefix) {
    this._pairToQueryStringDC.delegate.args = [ prefix ];
    return this.map(obj, this._pairToQueryStringDC).join(this.QUERY_DELIMITER);
  },
  _pairToQueryString: function(key, value, prefix) {
    var result;
    prefix = artjs.StringUtils.isBlank(prefix) ? key : prefix + "[" + key + "]";
    if (typeof value == "object") {
      if (isNaN(value.length)) {
        result = this._toQueryStringWithPrefix(value, prefix);
      } else {
        this._parseArrayValueDC.delegate.args = [ prefix + "[]" ];
        result = artjs.ArrayUtils.map(value, this._parseArrayValueDC).join(this.QUERY_DELIMITER);
      }
    } else {
      result = prefix + "=" + encodeURIComponent(this._primitiveToQueryString(value));
    }
    return result;
  },
  _parseArrayValue: function(value, idx, prefix) {
    return this._pairToQueryString(prefix, value);
  },
  _primitiveToQueryString: function(obj) {
    var result;
    switch (typeof obj) {
     case "number":
      result = obj.toString();
      break;
     case "boolean":
      result = Number(obj).toString();
      break;
     default:
      result = obj;
    }
    return result;
  },
  _invertedIncludes: function(item, obj) {
    return this.includes(obj, item);
  },
  _keyValueArray: function(key, value) {
    return [ key, value ];
  },
  _eachPairDeleteValue: function(i, j, obj, val) {
    if (j === val) {
      this._deleteKey(obj, i);
    }
  },
  _eachKeyDeleteKey: function(i, idx, arr, obj) {
    this._deleteKey(obj, i);
  },
  _deleteKey: function(obj, i) {
    delete obj[i];
  },
  _invertedRemoveValue: function(val, arr, obj) {
    this.removeValue(obj, val);
  },
  isNull: function(i) {
    return i == null;
  },
  isPresent: function(i) {
    return !this.isNull(i);
  },
  getDefault: function(i, defaultValue) {
    return this.isNull(i) ? defaultValue : i;
  }
};

artjs.ArrayUtils = artjs.utils.Array = {
  _name: "ArrayUtils",
  init: function() {
    this._areItemsEqualCallback = artjs.$DC(this, "areItemsEqual");
    this._invokeCallback = artjs.$DC(this, "_invoke");
  },
  build: function(n, func, context) {
    var arr = new Array(n);
    for (var i = 0; i < n; i++) {
      arr[i] = func.call(context, i, arr);
    }
    return arr;
  },
  fromRange: function(point) {
    var n = point.y - point.x;
    var result = new Array(n);
    for (var i = 0; i < n; i++) {
      result[i] = point.x + i;
    }
    return result;
  },
  first: function(arr) {
    return this.getItem(arr, 0);
  },
  second: function(arr) {
    return this.getItem(arr, 1);
  },
  third: function(arr) {
    return this.getItem(arr, 2);
  },
  last: function(arr) {
    return this.getItem(arr, arr.length - 1);
  },
  beforeLast: function(arr) {
    return this.getItem(arr, arr.length - 2);
  },
  getItem: function(arr, i) {
    return arr[i];
  },
  includesInv: function(item, arr) {
    return this.includes(arr, item);
  },
  includes: function(arr, item) {
    return Boolean(this.indexOf(arr, item) + 1);
  },
  includesAll: function(arr, subset) {
    this._includesAll.arr = arr;
    return this.all(subset, this._includesAll);
  },
  _includesAll: function(i, idx) {
    return this.includesInv(i, arguments.callee.arr);
  },
  insertAt: function(arr, idx, insertion) {
    return arr.slice(0, idx).concat(insertion).concat(arr.slice(idx));
  },
  removeAt: function(arr, idx) {
    return arr.splice(idx, 1);
  },
  removeItem: function(arr, item, onlyFirst) {
    var n = arr.length;
    while (n-- > 0) {
      if (arr[n] === item) {
        this.removeAt(arr, n);
        if (onlyFirst) {
          return;
        }
      }
    }
  },
  arrify: function(v, idx) {
    var args = [];
    var n = v.length;
    for (var i = idx || 0; i < n; i++) {
      args.push(v[i]);
    }
    return args;
  },
  map: function(arr, func, context) {
    var result = [];
    var item;
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];
        result.push(func.call(context, item, parseInt(i, 10), arr));
      }
    }
    return result;
  },
  invoke: function(arr, meth) {
    this._invokeCallback.delegate.args = [ meth, this.arrify(arguments, 2) ];
    return this.map(arr, this._invokeCallback);
  },
  _invoke: function(i, idx, arr, meth, args) {
    return i[meth].apply(i, args);
  },
  pluck: function(arr, prop) {
    this._pluck.prop = prop;
    return this.map(arr, this._pluck, this);
  },
  _pluck: function(i) {
    return i[arguments.callee.prop];
  },
  each: function(arr, func, context) {
    var item;
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];
        func.call(context, item, parseInt(i, 10), arr);
      }
    }
  },
  eachItem: function(arr, func, context) {
    var item;
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];
        func.call(context, item, arr);
      }
    }
  },
  eachIndex: function(arr, func, context) {
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        func.call(context, parseInt(i, 10), arr);
      }
    }
  },
  inject: function(arr, init, func, context) {
    var result = init;
    var mem;
    var item;
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];
        mem = func.call(context, result, item, parseInt(i, 10), arr);
        if (mem) {
          result = mem;
        }
      }
    }
    return result;
  },
  flatten: function(arr) {
    return this.inject(arr, [], this._flattenCallback, this);
  },
  _flattenCallback: function(mem, i, idx) {
    mem.splice.apply(mem, [ mem.length, 0 ].concat(i));
  },
  select: function(arr, func, context) {
    var result = [];
    var test = func || this.identity;
    var item;
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];
        if (func.call(context, item, parseInt(i, 10), arr)) {
          result.push(item);
        }
      }
    }
    return result;
  },
  $select: function(arr, func, context) {
    var n = arr.length - 1;
    var test = func || this.identity;
    var item;
    for (var i = n; i >= 0; i--) {
      item = arr[i];
      if (!test.call(context || this, item, parseInt(i, 10), arr)) {
        this.removeAt(arr, i);
      }
    }
  },
  reject: function(arr, func, context) {
    var result = [];
    var test = func || this.identity;
    var item;
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];
        if (!test.call(context, item, parseInt(i, 10), arr)) {
          result.push(item);
        }
      }
    }
    return result;
  },
  $reject: function(arr, func, context) {
    var n = arr.length - 1;
    var test = func || this.identity;
    var item;
    for (var i = n; i >= 0; i--) {
      item = arr[i];
      if (test.call(context || this, item, parseInt(i, 10), arr)) {
        this.removeAt(arr, i);
      }
    }
  },
  detect: function(arr, func, context) {
    var test = func || this.identity;
    var item;
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];
        if (test.call(context || this, item, parseInt(i, 10), arr)) {
          return item;
        }
      }
    }
    return null;
  },
  equal: function(arr, func, context) {
    this._areItemsEqualCallback.delegate.args = [ func, context ];
    return this.all(this.transpose(arr), this._areItemsEqualCallback, this);
  },
  areItemsEqual: function(i, idx, arr, func, context) {
    return this.uniq(i, func, context).length == 1;
  },
  transpose: function(arr) {
    var result = [];
    var n = arr.length;
    var m = Math.max.apply(Math, this.pluck(arr, "length"));
    for (var i = 0; i < m; i++) {
      result[i] = [];
      for (var j = 0; j < n; j++) {
        result[i][j] = arr[j][i];
      }
    }
    return result;
  },
  all: function(arr, func, context) {
    var test = func || this.identity;
    var item;
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];
        if (!test.call(context || this, item, parseInt(i, 10), arr)) {
          return false;
        }
      }
    }
    return true;
  },
  any: function(arr, func, context) {
    var test = func || this.identity;
    var item;
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];
        if (test.call(context || this, item, parseInt(i, 10), arr)) {
          return true;
        }
      }
    }
    return false;
  },
  identity: function(i) {
    return i;
  },
  partition: function(arr, func, context) {
    var point = new artjs.Point([], []);
    var item;
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];
        (func.call(context, item, i, arr) ? point.x : point.y).push(item);
      }
    }
    return point;
  },
  uniq: function(arr, func, context) {
    var groups = this.groupBy(arr, func, context, true);
    return this.map(this.pluck(groups, "y"), this.first, this);
  },
  groupBy: function(arr, func, context, keepOrder) {
    var test = func || this.identity;
    var result = [];
    var values = {};
    var group;
    var item;
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];
        group = String(test.call(context || this, item, parseInt(i, 10)));
        if (values[group] == undefined) {
          result.push(new artjs.Point(group, values[group] = []));
        }
        values[group].push(item);
      }
    }
    if (!keepOrder) {
      result = artjs.ObjectUtils.fromPoints(result);
    }
    return result;
  },
  indexOf: function(arr, item) {
    return arr.indexOf ? arr.indexOf(item) : this._indexOf(arr, item);
  },
  intersection: function(arr) {
    this._intersectionSelect.array = arr.slice(1);
    return this.select(arr[0], this._intersectionSelect, this);
  },
  _intersectionSelect: function(i) {
    this._intersectionInclude.item = i;
    return this.all(arguments.callee.array, this._intersectionInclude, this);
  },
  _intersectionInclude: function(arr, idx) {
    return this.includes(arr, arguments.callee.item);
  },
  selectNonEmpty: function(arr) {
    return this.select(arr, this.isNotEmpty, this);
  },
  compact: function(arr) {
    return this.reject(arr, artjs.ObjectUtils.isNull, this);
  },
  isEmpty: function(arr) {
    return arr.length == 0;
  },
  isNotEmpty: function(arr) {
    return !this.isEmpty(arr);
  },
  numerize: function(arr) {
    return this.map(arr, this._numerizeCallback);
  },
  print: function(arr) {
    this.eachItem(arr, this._printEach, this);
  },
  _printEach: function(i) {
    artjs.p(i);
  },
  _numerizeCallback: function(i) {
    return Number(i);
  },
  sum: function(arr) {
    return Number(this.inject(arr, 0, this._sumCallback, this));
  },
  _sumCallback: function(sum, i) {
    return sum + i;
  },
  stringify: function(arr) {
    return this.map(arr, this._stringifyCallback, this);
  },
  _stringifyCallback: function(i) {
    return artjs.ObjectUtils.isNull(i) ? "" : i.toString();
  },
  _indexOf: function(arr, item) {
    for (var i in arr) {
      if (arr.hasOwnProperty(i) && arr[i] === item) {
        return parseInt(i);
      }
    }
    return -1;
  }
};

artjs.$A = artjs.ArrayUtils.arrify;

artjs.Class = artjs.utils.Class = function(ctor, proto, stat, superclass) {
  var builder = new artjs.ClassBuilder(ctor, proto, stat, superclass);
  return builder.ctor;
};

artjs.Class._name = "Class";

artjs.ClassBuilder = function(ctor, proto, stat, superclass) {
  this.ctor = ctor || this._defaultConstructor();
  this.ctor._onCreated = this._defaultOnCreated;
  this.ctor._onExtended = this._defaultOnExtended;
  if (superclass) {
    var _super_ = function() {
      var ctor = arguments.callee.ctor;
      var _arguments_ = artjs.$A(arguments);
      var __arguments__ = _arguments_.shift();
      var _callee_ = __arguments__.callee;
      var _super_ = _callee_.superclass || _callee_.super;
      return _super_.apply(this, _arguments_.concat(artjs.$A(__arguments__)));
    };
    _super_.ctor = this.ctor;
    artjs.ObjectUtils.extend(this.ctor, superclass);
    artjs.ObjectUtils.extend(this.ctor.prototype, superclass.prototype);
    this.ctor.superclass = superclass;
    this.ctor.super = _super_;
    this.ctor.prototype.super = _super_;
  } else {
    this.ctor.prototype = {};
  }
  this.ctor.prototype.ctor = this.ctor;
  if (proto) {
    artjs.ObjectUtils.eachPair(proto, this._eachProto, this);
  }
  if (stat) {
    artjs.ObjectUtils.eachPair(stat, this._eachStat, this);
  }
  this.ctor._onCreated();
  if (superclass) {
    this.ctor._onExtended();
  }
};

artjs.ClassBuilder.prototype = {
  _defaultOnCreated: function() {
    this.subclasses = [];
  },
  _defaultOnExtended: function() {
    this.superclass.subclasses.push(this);
  },
  _defaultConstructor: function() {
    return function() {
      if (arguments.callee.superclass) {
        this.super(arguments);
      }
    };
  },
  _eachProto: function(k, v) {
    this._each(this.ctor.prototype, k, v);
  },
  _eachStat: function(k, v) {
    this._each(this.ctor, k, v);
  },
  _each: function(obj, k, v) {
    if (typeof v == "function") {
      if (obj[k]) {
        v.super = obj[k];
      }
    }
    obj[k] = v;
  }
};

artjs.Delegate = artjs.events.Delegate = artjs.Class(function(object, method) {
  this.object = object;
  this.method = artjs.ObjectUtils.isString(method) ? this.object[method] : method;
  this.args = artjs.$A(arguments, 2);
}, {
  invoke: function() {
    var args = artjs.$A(arguments).concat(this.args);
    return this.method.apply(this.object, args);
  },
  callback: function(withSource) {
    var result = function() {
      var callee = arguments.callee;
      var delegate = callee.delegate;
      var args = artjs.$A(arguments);
      if (callee.withSource) {
        args.unshift(this);
      }
      return delegate.invoke.apply(delegate, args);
    };
    result.withSource = withSource;
    result.delegate = this;
    return result;
  }
}, {
  callback: function(object, method, withSource) {
    var delegate = new this(object, method);
    var callback = delegate.callback(withSource);
    delegate.args = artjs.$A(arguments, 3);
    return callback;
  },
  create: function(object, method) {
    var delegate = new this(object, method);
    delegate.args = artjs.$A(arguments, 2);
    return delegate;
  },
  bindAll: function(context) {
    var container = context.ctor ? context.ctor.prototype : context;
    var callbacks = artjs.ObjectUtils.keys(artjs.ObjectUtils.select(container, this._isCallback, this));
    var all = callbacks.concat(artjs.$A(arguments, 1));
    this._bindContext = context;
    artjs.ArrayUtils.each(all, this._bindEach, this);
  },
  _isCallback: function(v, k) {
    return artjs.StringUtils.startsWith(k, "_on") && v instanceof Function;
  },
  _bindEach: function(i) {
    this._bindContext[i] = this.callback(this._bindContext, i);
  }
});

artjs.$DC = artjs.Delegate.callback(artjs.Delegate, "callback");

artjs.$D = artjs.Delegate.callback(artjs.Delegate, "create");

artjs.$BA = artjs.Delegate.callback(artjs.Delegate, "bindAll");

artjs.MathUtils = artjs.utils.Math = {
  _name: "MathUtils",
  sgn: function(x) {
    return x === 0 ? 0 : Math.abs(x) / x;
  },
  limit: function(x, a, b) {
    return Math.min(Math.max(x, a), b);
  },
  sawtooth: function(x, a, b) {
    return x - this.stairs(x, a, b) * (b - a);
  },
  stairs: function(x, a, b) {
    return Math.floor((x - a) / (b - a));
  },
  isNonNegative: function(x) {
    return Boolean(this.sgn(x) + 1);
  }
};

artjs.StringUtils = artjs.utils.String = {
  _name: "StringUtils",
  first: function(str) {
    return str.substr(0, 1);
  },
  last: function(str) {
    return str.substr(str.length - 1, 1);
  },
  strip: function(str) {
    return str.replace(/\s/g, this.blank());
  },
  isBlank: function(str) {
    return str === null || str === undefined || this.isEmpty(str);
  },
  isEmpty: function(str) {
    return this.strip(str) == this.blank();
  },
  nullifyEmpty: function(str) {
    return this.isEmpty(str) ? null : str;
  },
  toS: function(str) {
    return str || this.blank();
  },
  blank: function() {
    return "";
  },
  countPattern: function(str, pattern) {
    return str.match(new RegExp(pattern, "g")).length;
  },
  align: function(str, n, char, left) {
    var c = this.getMultiPattern(char, n - str.length);
    return left ? str + c : c + str;
  },
  getMultiPattern: function(pattern, n) {
    var str = this.blank();
    while (n-- > 0) {
      str += pattern;
    }
    return str;
  },
  formatPrice: function(price) {
    var parts = price.toString().split(".");
    var integer = parts[0];
    var decimal = parts[1];
    return integer + "." + (decimal ? this.addZeros(decimal, 2, true) : "00");
  },
  addZeros: function(str, n, left) {
    return this.align(str, n, "0", left);
  },
  truncate: function(text, length, onlyWords, end) {
    if (text.length > length) {
      var shrinkedText = text.substr(0, length);
      if (onlyWords) {
        if (text[length] == " ") {
          return this._truncation(shrinkedText, end);
        } else {
          var lastSpace = shrinkedText.lastIndexOf(" ");
          if (lastSpace > -1) {
            return this._subtruncation(text, lastSpace, end);
          } else {
            return this._subtruncation(text, length, end);
          }
        }
      } else {
        return this._subtruncation(text, length, end);
      }
    } else {
      return text;
    }
  },
  _subtruncation: function(text, index, end) {
    return this._truncation(text.substr(0, index), end);
  },
  _truncation: function(text, end) {
    return text + (end || "...");
  },
  singularOrPlural: function(text, n) {
    return text + (n == 1 ? this.blank() : "s");
  },
  capitalize: function(str) {
    return artjs.ArrayUtils.map(str.split(" "), this.capitalizeWord).join(" ");
  },
  capitalizeWord: function(str) {
    return str.charAt(0).toUpperCase() + str.substr(1);
  },
  capitalizeUnderscored: function(str) {
    return this.strip(this.capitalize(str.replace(new RegExp("_", "g"), " ")));
  },
  trim: function(str, character, replacement) {
    var c = character || " ";
    var r = replacement || "";
    return str.replace(new RegExp("^" + c + "+"), r).replace(new RegExp(c + "+$"), r);
  },
  sub: function(str, i, j) {
    var n = str.length;
    var jZero = j === 0;
    str += str;
    i = i % n;
    j = j % n;
    if (i < 0) {
      i += n;
    }
    if (j < 0) {
      j += n;
    }
    if (jZero) {
      j = n;
    }
    if (j < i) {
      j += n;
    }
    return str.substring(i, j);
  },
  toJson: function(str) {
    return JSON.parse(str);
  },
  startsWith: function(str, substr) {
    return str.match(new RegExp("^" + substr));
  }
};

artjs.DateUtils = artjs.utils.Date = {
  _name: "DateUtils",
  getTime: function() {
    return (new Date).getTime();
  },
  monthDaysNum: function(date) {
    var d = this.copy(date);
    d.setMonth(d.getMonth() + 1);
    d.setDate(0);
    return d.getDate();
  },
  firstDate: function(date) {
    var d = this.copy(date);
    d.setDate(1);
    return d;
  },
  firstDay: function(date) {
    return this.firstDate(date).getDay();
  },
  toHMS: function(date, separator) {
    var su = artjs.StringUtils;
    separator = separator || ":";
    return su.addZeros(date.getHours().toString(), 2, false) + separator + su.addZeros(date.getMinutes().toString(), 2, false) + separator + su.addZeros(date.getSeconds().toString(), 2, false);
  },
  toYMD: function(date, separator) {
    var su = artjs.StringUtils;
    separator = separator || "-";
    return date.getFullYear() + separator + su.addZeros((date.getMonth() + 1).toString(), 2, false) + separator + su.addZeros(date.getDate().toString(), 2, false);
  },
  toDMY: function(date, separator) {
    separator = separator || "-";
    var ymd = this.toYMD(date, separator);
    var arr = ymd.split(separator);
    arr.reverse();
    return arr.join(separator);
  },
  fromYMD: function(str, separator) {
    separator = separator || "-";
    var arr = str.split(separator);
    var au = artjs.ArrayUtils;
    return new Date(parseInt(au.first(arr), 10), parseInt(au.second(arr), 10) - 1, parseInt(au.third(arr), 10));
  },
  fromDMY: function(str, separator) {
    separator = separator || "-";
    var arr = str.split(separator);
    var au = artjs.ArrayUtils;
    return new Date(parseInt(au.third(arr), 10), parseInt(au.second(arr), 10) - 1, parseInt(au.first(arr), 10));
  },
  minutesToHM: function(minutes, separator) {
    separator = separator || ":";
    return Math.floor(minutes / 60) + separator + artjs.StringUtils.addZeros((minutes % 60).toString(), 2);
  },
  hmToMinutes: function(hm, separator) {
    separator = separator || ":";
    var arr = hm.split(separator);
    return 60 * parseInt(arr[0], 10) + parseInt(arr[1], 10);
  },
  secondsToMS: function(s, separator) {
    var seconds = s % 60;
    var minutes = (s - seconds) / 60;
    var su = artjs.StringUtils;
    separator = separator || ":";
    return su.addZeros(minutes.toString(), 2) + separator + su.addZeros(seconds.toString(), 2);
  },
  msToSeconds: function(ms, separator) {
    separator = separator || ":";
    var arr = ms.split(separator);
    return 60 * parseInt(arr[0], 10) + parseInt(arr[1], 10);
  },
  secondsToHMS: function(s, separator) {
    var seconds = s % 60;
    var minutes = (s - seconds) / 60;
    separator = separator || ":";
    return this.minutesToHM(minutes, separator) + separator + artjs.StringUtils.addZeros(seconds.toString(), 2);
  },
  miliToHMSM: function(v) {
    var mili = v % 1e3;
    var totalSeconds = (v - mili) / 1e3;
    var seconds = totalSeconds % 60;
    var totalMinutes = (totalSeconds - seconds) / 60;
    var minutes = totalMinutes % 60;
    var totalHours = (totalMinutes - minutes) / 60;
    var hours = totalHours;
    return hours.toString() + ":" + artjs.StringUtils.addZeros(minutes.toString(), 2) + ":" + artjs.StringUtils.addZeros(seconds.toString(), 2) + "." + artjs.StringUtils.addZeros(mili.toString(), 3);
  },
  miliToMSM: function(v) {
    var mili = v % 1e3;
    var totalSeconds = (v - mili) / 1e3;
    var seconds = totalSeconds % 60;
    var totalMinutes = (totalSeconds - seconds) / 60;
    var minutes = totalMinutes;
    return minutes.toString() + ":" + artjs.StringUtils.addZeros(seconds.toString(), 2) + "." + artjs.StringUtils.addZeros(mili.toString(), 3);
  },
  copy: function(date) {
    return new Date(date);
  },
  getDateShifted: function(date, days) {
    var dateCopy = this.copy(date);
    dateCopy.setDate(date.getDate() + days);
    return dateCopy;
  },
  stripDayTime: function(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
};

artjs.ElementUtils = artjs.utils.Element = {
  HIDDEN_ELEMENTS: [],
  DEFAULT_DISPLAY: "",
  MAIN_OBJ_RE: /^\w+/,
  SUB_OBJ_RE: /\[\w+\]/g,
  SIZE_STYLE_RE: /^(\d+)px$/,
  BROWSERS_STYLES: [ "", "-o-", "-ms-", "-moz-", "-khtml-", "-webkit-" ],
  init: function() {
    this.detectHiddenElementDC = artjs.$DC(this, "detectHiddenElement");
    artjs.$insert = artjs.$DC(this, "insert");
  },
  show: function(e) {
    var hidden = this.getHidden(e);
    artjs.ArrayUtils.removeItem(this.HIDDEN_ELEMENTS, hidden);
    var display = hidden && hidden.display || e.style.display;
    e.style.display = display == "none" ? this.DEFAULT_DISPLAY : display;
  },
  hide: function(e) {
    var hidden = this.getHidden(e);
    if (!hidden) {
      this.HIDDEN_ELEMENTS.push({
        element: e,
        display: e.style.display
      });
      e.style.display = "none";
    }
  },
  toggle: function(e) {
    this.setVisible(e, this.isHidden(e));
  },
  setVisible: function(e, v) {
    if (v) {
      this.show(e);
    } else {
      this.hide(e);
    }
  },
  isHidden: function(e) {
    var hidden = this.getHidden(e);
    return hidden || e.style.display == "none";
  },
  getHidden: function(e) {
    this.detectHiddenElementDC.delegate.args = [ e ];
    return artjs.ArrayUtils.detect(this.HIDDEN_ELEMENTS, this.detectHiddenElementDC);
  },
  detectHiddenElement: function(i, e) {
    return i.element == e;
  },
  getSize: function(e, real) {
    return this.getBounds(e, real).getSize();
  },
  getBounds: function(e, real, withoutScroll) {
    var toggle = real && this.isHidden(e);
    if (toggle) {
      this.show(e);
    }
    var b = e.getBoundingClientRect();
    var layout = new artjs.Rectangle(b.left, b.top, b.right, b.bottom);
    if (!withoutScroll) {
      layout.moveBy(this.getScrollPosition());
    }
    if (toggle) {
      this.hide(e);
    }
    return layout;
  },
  setWidth: function(e, w) {
    e.style.width = w + "px";
  },
  setHeight: function(e, h) {
    e.style.height = h + "px";
  },
  setStyle: function(e, prop, v) {
    e.style[prop] = v;
  },
  extendStyle: function(e, style) {
    artjs.ObjectUtils.extend(e.style, style);
  },
  transitionStyle: function(prop, duration, type, delay) {
    return this._effectStyle(this._getTransitionStyleValue(prop, duration, type, delay));
  },
  _getTransitionStyleValue: function(prop, duration, type, delay) {
    return [ prop, duration + "s", type, delay + "s" ].join(" ");
  },
  _effectStyle: function(value) {
    this._browserMap.value = value;
    return artjs.ObjectUtils.fromArray(artjs.ArrayUtils.map(this.BROWSERS_STYLES, this._browserMap, this));
  },
  _browserMap: function(browser) {
    return [ browser + "transition", arguments.callee.value ];
  },
  getSizeStyle: function(e, prop) {
    return this.getSizeStyleValue(this.getStyle(e, prop));
  },
  getSizeStyleValue: function(value) {
    var v = value.match(this.SIZE_STYLE_RE);
    return v && Number(v[1]) || 0;
  },
  children: function(e) {
    return artjs.$A(e.childNodes);
  },
  elements: function(e) {
    return this.filterElements(this.children(e));
  },
  filterElements: function(items) {
    return artjs.ArrayUtils.select(items, this.isElement, this);
  },
  isElement: function(e) {
    return e.nodeType == Node.ELEMENT_NODE;
  },
  isText: function(e) {
    return e.nodeType == Node.TEXT_NODE;
  },
  remove: function(e) {
    e.parentNode.removeChild(e);
  },
  parent: function(e) {
    return e.parentNode;
  },
  firstElement: function(e) {
    return artjs.ArrayUtils.first(this.elements(e));
  },
  lastElement: function(e) {
    return artjs.ArrayUtils.last(this.elements(e));
  },
  prev: function(e) {
    var result = e;
    do {
      result = result.previousSibling;
    } while (result && !this.isElement(result));
    return result;
  },
  next: function(e) {
    var result = e;
    do {
      result = result.nextSibling;
    } while (result && !this.isElement(result));
    return result;
  },
  clone: function(e, deep) {
    return e.cloneNode(deep);
  },
  insert: function(e, el) {
    return this.putAtBottom(el, e);
  },
  putAtBottom: function(e, ref) {
    var result = this.clone(e, true);
    ref.appendChild(result);
    return result;
  },
  putAtTop: function(e, ref) {
    var first = artjs.ArrayUtils.first(this.children(ref));
    return first ? this.putBefore(e, first) : this.putAtBottom(e, ref);
  },
  putAfter: function(e, ref) {
    var next = this.next(ref);
    return next ? this.putBefore(e, next) : this.putAtBottom(e, this.parent(ref));
  },
  putBefore: function(e, ref) {
    return this.parent(ref).insertBefore(e, ref);
  },
  replace: function(e, ref, clone) {
    var parent = this.parent(ref);
    var idx = this.elements(parent).indexOf(ref);
    if (clone) {
      e = this.clone(e, true);
    }
    parent.replaceChild(e, ref);
    return this.elements(parent)[idx];
  },
  center: function(e) {
    this.setPosition(e, this.getCenteredPosition(e));
  },
  centerH: function(e) {
    var pos = this.getCenteredPosition(e);
    this.setX(e, pos.x);
  },
  centerV: function(e) {
    var pos = this.getCenteredPosition(e);
    this.setY(e, pos.y);
  },
  getCenteredPosition: function(e) {
    return this.getWindowSize().sub(this.getSize(e)).times(.5).add(this.getScrollPosition());
  },
  setPosition: function(e, p) {
    this.setX(e, p.x);
    this.setY(e, p.y);
  },
  getPosition: function(e, withoutScroll) {
    return this.getBounds(e, false, withoutScroll).getLeftTop();
  },
  setX: function(e, v) {
    e.style.left = v + "px";
  },
  setY: function(e, v) {
    e.style.top = v + "px";
  },
  enable: function(e) {
    e.removeAttribute("disabled");
  },
  disable: function(e) {
    e.setAttribute("disabled", "disabled");
  },
  setEnabled: function(e, enabled) {
    if (enabled) {
      this.enable(e);
    } else {
      this.disable(e);
    }
  },
  serialize: function(e) {
    var s = artjs.Selector;
    var au = artjs.ArrayUtils;
    var textfields = s.find(e, "input[type=text]");
    var checkboxes = au.select(s.find(e, "input[type=checkbox]"), this.selectChecked, this);
    var radios = au.select(s.down(e, "input[type=radio]"), this.selectChecked, this);
    var selects = s.down(e, "select");
    var textareas = s.down(e, "textarea");
    var hiddenfields = s.down(e, "input[type=hidden]");
    var inputs = au.flatten([ textfields, checkboxes, radios, selects, textareas, hiddenfields ]);
    return au.inject(inputs, {}, this.serializeInject, this);
  },
  selectChecked: function(i) {
    return i.checked;
  },
  serializeInject: function(mem, i, idx) {
    var name = i.name;
    var value = i.value;
    var main = artjs.ArrayUtils.first(name.match(this.MAIN_OBJ_RE));
    var subobjectMatches = name.match(this.SUB_OBJ_RE);
    var props = subobjectMatches && artjs.ArrayUtils.map(artjs.$A(subobjectMatches), this.mapSub, this) || [];
    props.unshift(main);
    var obj = mem;
    var n = props.length - 1;
    var k, prop;
    for (k = 0; k < n; k++) {
      prop = props[k];
      if (!(obj[prop] instanceof Object)) {
        obj[prop] = {};
      }
      obj = obj[prop];
    }
    obj[props[k]] = value;
    return mem;
  },
  mapSub: function(i, idx) {
    return artjs.StringUtils.sub(i, 1, -1);
  },
  getContent: function(e) {
    return e.innerHTML;
  },
  setContent: function(e, v) {
    e.innerHTML = v;
  },
  hasClass: function(e, className) {
    return artjs.ArrayUtils.includes(this.getClasses(e), className);
  },
  getClasses: function(e) {
    var className = artjs.StringUtils.trim(e.className);
    return artjs.StringUtils.isBlank(className) ? [] : className.split(" ");
  },
  setClass: function(e, className, add) {
    if (add) {
      this.addClass(e, className);
    } else {
      this.removeClass(e, className);
    }
  },
  addClass: function(e, className) {
    var classes = this.getClasses(e);
    if (!this.hasClass(e, className)) {
      classes.push(className);
      e.className = classes.join(" ");
    }
  },
  removeClass: function(e, className) {
    var classes = this.getClasses(e);
    if (this.hasClass(e, className)) {
      artjs.ArrayUtils.removeItem(classes, className);
      e.className = classes.join(" ");
    }
  },
  toggleClass: function(e, className) {
    this.setClass(e, className, !this.hasClass(e, className));
  },
  getAttributes: function(e) {
    return artjs.ObjectUtils.fromArray(artjs.ArrayUtils.map(artjs.$A(e.attributes), this._mapAttribute, this));
  },
  getData: function(e) {
    var attrs = this.getAttributes(e);
    var data = artjs.ObjectUtils.select(attrs, this._isDataAttribute, this);
    return artjs.ObjectUtils.mapKey(data, this._removeDataPrefix, this);
  },
  _isDataAttribute: function(v, k) {
    return artjs.StringUtils.startsWith(k, "data-");
  },
  _removeDataPrefix: function(k) {
    return k.replace(/^data\-/, "");
  },
  _mapAttribute: function(i) {
    return [ i.name, i.value ];
  },
  setAlpha: function(e, v) {
    e.style.opacity = v;
    e.style.filter = "alpha(opacity=" + 100 * v + ")";
  },
  getAlpha: function(e) {
    if (e.style.filter) {
      var re = /alpha\(opacity=(\d+(\.\d+)?)\)/;
      return Number(artjs.ArrayUtils.second(e.style.filter.match(re)));
    } else {
      return e.style.opacity;
    }
  },
  getStyle: function(e, prop) {
    if (window.getComputedStyle) {
      return window.getComputedStyle(e, null).getPropertyValue(prop);
    } else {
      return e.currentStyle[prop];
    }
  },
  getPadding: function(e) {
    return new artjs.Rectangle(this.getSizeStyle(e, "padding-left") || this.getSizeStyle(e, "paddingLeft"), this.getSizeStyle(e, "padding-top") || this.getSizeStyle(e, "paddingTop"), this.getSizeStyle(e, "padding-right") || this.getSizeStyle(e, "paddingRight"), this.getSizeStyle(e, "padding-bottom") || this.getSizeStyle(e, "paddingBottom"));
  },
  getDocumentSize: function() {
    var doc = window.document;
    var body = doc.body;
    return new artjs.Point(body.clientWidth || doc.width, body.clientHeight || doc.height);
  },
  getWindowSize: function() {
    var de = document.documentElement;
    return new artjs.Point(de.clientWidth || window.innerWidth, de.clientHeight || window.innerHeight);
  },
  getScrollPosition: function() {
    var de = document.documentElement;
    return new artjs.Point(de.scrollLeft || window.scrollX, de.scrollTop || window.scrollY);
  },
  onClick: function(e, delegate) {
    return artjs.on("click", e, delegate);
  },
  toString: function(e) {
    var classes = this.getClasses(e);
    var attr = this.getAttributes(e);
    delete attr["id"];
    delete attr["class"];
    return this.toTagString(e) + this.toIdString(e) + artjs.ArrayUtils.map(classes, this.toClassString).join("") + artjs.ObjectUtils.map(attr, this.toAttrString).join("");
  },
  toTagString: function(e) {
    return e.tagName.toLowerCase();
  },
  toIdString: function(e) {
    return "#" + e.id;
  },
  toClassString: function(v) {
    return "." + v;
  },
  toAttrString: function(k, v) {
    return "[" + k + "=" + v + "]";
  }
};

artjs.Toggler = artjs.utils.Toggler = artjs.Class(function(unique) {
  this.unique = unique;
  this.current = null;
  this.onActivate = new artjs.CustomEvent("Toggler::onActivate");
  this.onDeactivate = new artjs.CustomEvent("Toggler::onDeactivate");
}, {
  toggle: function(item) {
    if (!(this.unique && this.current == item)) {
      this.onDeactivate.fire(this);
      this.current = item;
      this.onActivate.fire(this);
    }
  }
}, {
  _name: "Toggler"
});

artjs.ClassToggler = artjs.utils.ClassToggler = artjs.Class(function(className) {
  this._className = className;
  this._toggler = new artjs.Toggler;
  this._toggler.onActivate.add(artjs.$D(this, "_onActivate"));
  this._toggler.onDeactivate.add(artjs.$D(this, "_onDeactivate"));
  this.onActivate = new artjs.CustomEvent("ClassToggler::onActivate");
  this.onDeactivate = new artjs.CustomEvent("ClassToggler::onDeactivate");
}, {
  toggle: function(item) {
    this._toggler.toggle(item);
  },
  getCurrent: function() {
    return this._toggler.current;
  },
  _onActivate: function(t) {
    if (t.current) artjs.ElementUtils.addClass(t.current, this._className);
    this.onActivate.fire(this);
  },
  _onDeactivate: function(t) {
    if (t.current) artjs.ElementUtils.removeClass(t.current, this._className);
    this.onDeactivate.fire(this);
  }
}, {
  _name: "ClassToggler"
});

artjs.Locator = artjs.module.Locator = {
  register: function(object) {
    object.instances = [];
    artjs.ObjectUtils.extend(object, this.extensions);
  },
  extensions: {
    find: function(i) {
      this.identifier = i;
      return artjs.ArrayUtils.detect(this.instances, this.found, this);
    },
    found: function(i) {
      return i.getIdentifier() == this.identifier;
    }
  }
};

artjs.DelegateCollection = artjs.events.DelegateCollection = artjs.Class(function(items) {
  this._items = items || [];
}, {
  invoke: function() {
    this._args = artjs.$A(arguments);
    return artjs.ArrayUtils.map(this._items, this._delegateToResult, this);
  },
  add: function(delegate) {
    this._items.push(delegate);
  },
  removeAt: function(i) {
    artjs.ArrayUtils.removeAt(this._items, i);
  },
  remove: function(delegate) {
    artjs.ArrayUtils.removeItem(this._items, delegate);
  },
  clear: function() {
    this._items.splice(0);
  },
  getLength: function() {
    return this._items.length;
  },
  _delegateToResult: function(i, idx, arr) {
    return i.invoke.apply(i, this._args);
  }
});

artjs.CustomEvent = artjs.events.CustomEvent = artjs.Class(function(name) {
  this.name = name;
  this.collection = new artjs.DelegateCollection;
}, {
  fire: function() {
    return this.collection.invoke.apply(this.collection, artjs.$A(arguments));
  },
  add: function(delegate) {
    this.collection.add(delegate);
  },
  remove: function(delegate) {
    this.collection.remove(delegate);
  },
  removeAll: function() {
    this.collection.clear();
  },
  getLength: function() {
    return this.collection.getLength();
  }
});

artjs.Point = artjs.math.Point = function(x, y) {
  this.x = x;
  this.y = y;
};

artjs.Point.prototype = {
  getLength: function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  },
  dot: function(p) {
    return this.x * p.x + this.y * p.y;
  },
  add: function(p) {
    return new artjs.Point(this.x + p.x, this.y + p.y);
  },
  sub: function(p) {
    return this.add(p.getReversed());
  },
  getReversed: function() {
    return this.times(-1);
  },
  reverseX: function() {
    this.x = -this.x;
    return this;
  },
  reverseY: function() {
    this.y = -this.y;
    return this;
  },
  transpose: function() {
    var temp = this.x;
    this.x = this.y;
    this.y = temp;
    return this;
  },
  getTransposed: function() {
    return new artjs.Point(this.y, this.x);
  },
  reverse: function() {
    this.reverseX();
    this.reverseY();
    return this;
  },
  times: function(k) {
    return new artjs.Point(k * this.x, k * this.y);
  },
  toString: function() {
    return "[" + this.x + ", " + this.y + "]";
  }
};

artjs.Rectangle = artjs.math.Rectangle = function(left, top, right, bottom) {
  this.left = left;
  this.top = top;
  this.right = right;
  this.bottom = bottom;
};

artjs.Rectangle.prototype = {
  getWidth: function() {
    return this.right - this.left;
  },
  getHeight: function() {
    return this.bottom - this.top;
  },
  getArea: function() {
    return this.getWidth() * this.getHeight();
  },
  getLeftTop: function() {
    return new artjs.Point(this.left, this.top);
  },
  getRightTop: function() {
    return new artjs.Point(this.right, this.top);
  },
  getRightBottom: function() {
    return new artjs.Point(this.right, this.bottom);
  },
  getLeftBottom: function() {
    return new artjs.Point(this.left, this.bottom);
  },
  getSize: function() {
    return new artjs.Point(this.getWidth(), this.getHeight());
  },
  moveBy: function(p) {
    this.left += p.x;
    this.top += p.y;
    this.right += p.x;
    this.bottom += p.y;
  }
};

artjs.Component = artjs.dom.Component = artjs.Class(function(element) {
  this.element = element;
}, null, {
  _name: "Component",
  idToComponent: {},
  _onExtended: function() {
    this.super(arguments);
    this.instances = [];
  },
  find: function(id) {
    return this.idToComponent[id];
  },
  onLoad: function(id, delegate) {
    var component = this.find(id);
    if (component) {
      delegate.invoke(component);
    } else {
      artjs.ComponentScanner.addListener(id, delegate);
    }
  }
});

artjs.ComponentScanner = {
  _events: {},
  scan: function(element) {
    artjs.ArrayUtils.each(artjs.$find(element, ".art"), this._onFound, this);
  },
  addListener: function(id, delegate) {
    var event = this._events[id];
    if (!event) {
      event = this._events[id] = new artjs.CustomEvent("Component::Load::" + id);
    }
    event.add(delegate);
  },
  _onFound: function(i) {
    this.initElement(i);
  },
  initElement: function(i) {
    this._element = i;
    var classnames = artjs.ElementUtils.getClasses(i);
    artjs.ArrayUtils.removeItem(classnames, "art");
    artjs.ArrayUtils.each(classnames, this._eachClassName, this);
  },
  _eachClassName: function(i) {
    var path = i.split("-");
    var _class = artjs.ArrayUtils.inject(path, window, this._injectPathChunk, this);
    if (_class instanceof Function) {
      var instance = new _class(this._element);
      instance.ctor.instances.push(instance);
      var id = artjs.ElementUtils.getAttributes(instance.element).id;
      if (id) {
        artjs.Component.idToComponent[id] = instance;
      }
      var event = this._events[id];
      if (event) {
        event.fire(instance);
      }
    }
  },
  _injectPathChunk: function(result, i) {
    return result && result[i];
  }
};

artjs.ComponentSweeper = {
  init: function() {
    var clock = new artjs.Clock(2e3);
    clock.onChange.add(artjs.$D(this, "_onSweep"));
    clock.start();
  },
  _onSweep: function(clock) {
    artjs.ArrayUtils.each(artjs.Component.subclasses, this._sweepInstances, this);
  },
  _sweepInstances: function(i) {
    artjs.ArrayUtils.$select(i.instances, this._isOnStage, this);
  },
  _isOnStage: function(i) {
    return artjs.Selector.isDescendantOf(i.element);
  }
};

artjs.ElementBuilder = artjs.dom.ElementBuilder = artjs.Class(function(name, attributes, value, isEmpty) {
  this.name = name;
  this.attributes = attributes;
  this.value = value;
  this.isEmpty = Boolean(isEmpty);
}, {
  toString: function() {
    var attributes = this.attributes && artjs.ObjectUtils.isNotEmpty(this.attributes) ? " " + this.ctor._attributesString(this.attributes) + " " : "";
    var part;
    if (this.value) {
      part = ">" + this.value + "</" + this.name + ">";
    } else {
      if (this.empty) {
        part = "/>";
      } else {
        part = "></" + this.name + ">";
      }
    }
    return "<" + this.name + attributes + part;
  },
  getElement: function() {
    var e = document.createElement(this.name);
    var sa = this.ctor._setAttribute;
    sa.e = e;
    artjs.ObjectUtils.eachPair(this.attributes, sa);
    if (this.value && !this.isEmpty) {
      e.innerHTML = this.value;
    }
    return e;
  }
}, {
  _KEY_TRANSLATOR: {
    className: "class",
    forField: "for"
  },
  init: function() {
    artjs.$B = artjs.$DC(this, "build");
    artjs.$C = artjs.$DC(this, "create");
    artjs.$E = artjs.$DC(this, "getElement");
    artjs.$P = artjs.$DC(this, "parse");
  },
  build: function(name, attributes, value, empty) {
    return new this(name, attributes, value, empty);
  },
  parse: function(str) {
    var node = document.createElement("div");
    node.innerHTML = str;
    return node.firstChild;
  },
  create: function(name, attributes, value, empty) {
    return this.parse(this.build(name, attributes, value, empty).toString());
  },
  getElement: function(name, attributes, value, empty) {
    return this.build(name, attributes, value, empty).getElement();
  },
  getCollection: function(n, element) {
    this._getElement.element = element;
    return artjs.ArrayUtils.build(n, this._getElement).join("");
  },
  _getElement: function(i) {
    return arguments.callee.element;
  },
  _attributesString: function(attrs) {
    return artjs.ArrayUtils.map(artjs.ObjectUtils.toArray(attrs), this._attributePairToString, this).join(" ");
  },
  _setAttribute: function(k, v) {
    arguments.callee.e.setAttribute(k, v);
  },
  _attributePairToString: function(arr) {
    var key = this._KEY_TRANSLATOR[arr[0]] || arr[0];
    var value = arr[1];
    return key + '="' + value + '"';
  }
});

artjs.Selector = artjs.dom.Selector = {
  init: function() {
    artjs.$ = artjs.$DC(this, "getElements");
    artjs.$find = artjs.$DC(this, "find");
    artjs.$first = artjs.$DC(this, "first");
    artjs.$parent = artjs.$DC(this, "parent");
  },
  find: function(element, selector) {
    return this.getElements(selector, element);
  },
  first: function(element, selector) {
    return artjs.ArrayUtils.first(this.find(element, selector));
  },
  last: function(element, selector) {
    return artjs.ArrayUtils.last(this.find(element, selector));
  },
  parent: function(element, selector) {
    this._signature = new artjs.Signature(selector || "");
    return artjs.ArrayUtils.detect(this._getDescendants(element), this._signature.checkNode, this._signature);
  },
  getElements: function(selector, element) {
    this._root = element;
    var elements = this._findBySignature(new artjs.Signature(selector));
    var descendants = artjs.ArrayUtils.map(elements, this._elementToDescendants, this);
    descendants = artjs.ArrayUtils.select(descendants, this._hasElementDescendants, this);
    return artjs.ArrayUtils.pluck(descendants, "x");
  },
  isDescendantOf: function(element, root) {
    var descendants = this._getDescendants(element, root);
    return !artjs.ArrayUtils.isEmpty(descendants);
  },
  isSelfOrDescendantOf: function(element, root) {
    return element == root || this.isDescendantOf(element, root);
  },
  getElementById: function(v) {
    return document.getElementById(v);
  },
  getElementsByTagName: function(v) {
    return artjs.$A(document.getElementsByTagName(v));
  },
  getElementsByClassName: function(v) {
    return document.getElementsByClassName ? artjs.$A(document.getElementsByClassName(v)) : this._findByClassName(v);
  },
  _elementToDescendants: function(element) {
    return new artjs.Point(element, this._toDescendants(element));
  },
  _toDescendants: function(i) {
    return this._getDescendants(i, this._root);
  },
  _getDescendants: function(e, root) {
    var result = [];
    while (e = e.parentNode) {
      result.push(e);
    }
    var index = result.indexOf(root || document.body);
    return root && index == -1 ? null : result.slice(0, index);
  },
  _hasElementDescendants: function(point) {
    return !(point.y === null);
  },
  _findBySignature: function(signature) {
    var elements = [];
    if (signature.id) {
      var elementById = this.getElementById(signature.id);
      if (elementById) {
        elements.push(elementById);
      } else {
        return [];
      }
    }
    if (signature.tag) {
      var elementsByTag = this.getElementsByTagName(signature.tag);
      if (artjs.ArrayUtils.isEmpty(elementsByTag)) {
        return [];
      } else {
        if (artjs.ArrayUtils.isEmpty(elements)) {
          elements = elementsByTag;
        } else {
          elements = artjs.ArrayUtils.intersection([ elements, elementsByTag ]);
          if (artjs.ArrayUtils.isEmpty(elements)) {
            return [];
          }
        }
      }
    }
    if (!artjs.ArrayUtils.isEmpty(signature.classes)) {
      var elementsByClass = this._findByClassNames(signature.classes);
      if (artjs.ArrayUtils.isEmpty(elementsByClass)) {
        return [];
      }
      if (artjs.ArrayUtils.isEmpty(elements)) {
        elements = elementsByClass;
      } else {
        elements = artjs.ArrayUtils.intersection([ elements, elementsByClass ]);
        if (artjs.ArrayUtils.isEmpty(elements)) {
          return [];
        }
      }
    }
    this._filterByAttributes.attributes = signature.attributes;
    return artjs.ArrayUtils.compact(artjs.ArrayUtils.select(elements, this._filterByAttributes, this));
  },
  _findByClassNames: function(v) {
    return artjs.ArrayUtils.intersection(artjs.ArrayUtils.map(v, this.getElementsByClassName, this));
  },
  _elementHasClassName: function(e) {
    return artjs.ElementUtils.hasClass(e, arguments.callee.className);
  },
  _filterByAttributes: function(i) {
    var attributes = arguments.callee.attributes;
    return artjs.ObjectUtils.includesAll(artjs.ElementUtils.getAttributes(i), attributes);
  },
  _findByClassName: function(v) {
    var elements = artjs.ElementUtils.filterElements(artjs.$A(document.all));
    this._elementHasClassName.className = v;
    return artjs.ArrayUtils.select(elements, this._elementHasClassName);
  }
};

artjs.Signature = artjs.dom.Signature = artjs.Class(function(selector) {
  this._selector = selector;
  this.tag = this._getTag();
  this.id = this._getId();
  this.classes = this._getClasses();
  this.attributes = this._getAttributes();
}, {
  _tagRE: /^\w+/gi,
  _classesRE: /\.[\w\-]+/gi,
  _idRE: /#[\w\-]+/gi,
  _attrsRE: /\[.*\]/gi,
  checkNode: function(e) {
    return (!this.tag || e.tagName.toLowerCase() == this.tag) && (!this.id || e.id == this.id) && this._checkInclusion(artjs.ArrayUtils, this.classes, e.className.split(" ")) && this._checkInclusion(artjs.ObjectUtils, this.attributes, e.attributes);
  },
  _checkInclusion: function(utils, object, subset) {
    return utils.isEmpty(object) || artjs.ArrayUtils.includesAll(subset, object);
  },
  _getTag: function() {
    var matches = this._selector.match(this._tagRE);
    return matches && artjs.ArrayUtils.first(matches);
  },
  _getId: function() {
    var match = artjs.ArrayUtils.first(this._match(this._selector, this._idRE));
    return match && this._stripIdSelector(match);
  },
  _getClasses: function() {
    return artjs.ArrayUtils.map(this._match(this._selector, this._classesRE), this._stripClassSelector, this);
  },
  _getAttributes: function() {
    var matches = artjs.ArrayUtils.map(this._match(this._selector, this._attrsRE), this._stripAttributeSelector, this);
    var arr = artjs.ArrayUtils.map(matches[0] && matches[0].split(",") || [], this._attrToArray, this);
    return artjs.ObjectUtils.fromArray(arr);
  },
  _match: function(str, re) {
    var matches = str.match(re);
    return matches && artjs.$A(matches) || [];
  },
  _attrToArray: function(i) {
    return i.split("=");
  },
  _stripIdSelector: function(v) {
    return v.slice(1);
  },
  _stripClassSelector: function(v) {
    return v.slice(1);
  },
  _stripAttributeSelector: function(v) {
    return v.slice(1).slice(0, v.length - 2);
  }
});

artjs.Ajax = artjs.net.Ajax = artjs.Class(function(url, data, method) {
  this._onReadyStateChangeDC = artjs.$DC(this, this._onReadyStateChange, true);
  this._onProgressDC = artjs.$DC(this, this._onProgress, true);
  this._onErrorDC = artjs.$DC(this, this._onError, true);
  this.onSuccess = new artjs.CustomEvent("Ajax:onSuccess");
  this.onFailure = new artjs.CustomEvent("Ajax:onFailure");
  this.onProgress = new artjs.CustomEvent("Ajax:onProgress");
  var methods = artjs.Ajax.Methods;
  this.url = url;
  this.data = data;
  this.method = method;
  this.requestData = data;
  this.requestMethod = method || methods.GET;
  if (!artjs.ArrayUtils.includes(artjs.Ajax.SupportedMethods, this.requestMethod)) {
    this.requestData = this.requestData || {};
    this.requestData._method = this.requestMethod;
    this.requestMethod = methods.POST;
  }
  this._request = new XMLHttpRequest;
  this.requestUrl = this.url;
  if (this.requestData) {
    this.requestQueryData = artjs.ObjectUtils.toQueryString(this.requestData);
    if (this.requestMethod == methods.GET) {
      this.requestUrl += "?" + this.requestQueryData;
      this.requestQueryData = null;
    }
  }
  this._request.open(this.requestMethod, this.requestUrl, true);
  this.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  this.setRequestHeader("X-artjs-Version", artjs.VERSION);
  this.setRequestHeader("Accept", "text/javascript, text/html, application/xml, text/xml, */*");
  if (this.requestMethod == methods.POST) {
    this.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
  }
  this._request.onreadystatechange = this._onReadyStateChangeDC;
  this._request.onprogress = this._onProgressDC;
  this._request.onerror = this._onErrorDC;
}, {
  request: function() {
    this._request.send(this.requestQueryData);
  },
  abort: function() {
    this._request.abort();
  },
  getReadyState: function() {
    return this._request.readyState;
  },
  getStatus: function() {
    return this._request.status;
  },
  getStatusText: function() {
    return this._request.statusText;
  },
  getResponseText: function() {
    return this._request.responseText;
  },
  getResponseXML: function() {
    return this._request.responseXML;
  },
  setRequestHeader: function(header, value) {
    return this._request.setRequestHeader(header, value);
  },
  getResponseHeader: function(header) {
    return this._request.getResponseHeader(header);
  },
  getAllResponseHeaders: function() {
    return this._request.getAllResponseHeaders();
  },
  _onProgress: function(request, event) {
    var r = event.position / event.totalSize;
    this.onProgress.fire(this, r);
  },
  _onError: function(request, event) {
    this.onFailure.fire(this);
  },
  _onReadyStateChange: function(request) {
    if (this.getReadyState() == artjs.Ajax.ReadyState.LOADED) {
      this.onSuccess.fire(this);
    }
  }
}, {
  Methods: {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
  },
  ReadyState: {
    UNINITIALIZED: 0,
    OPEN: 1,
    SENT: 2,
    RECEIVING: 3,
    LOADED: 4
  },
  get: function(url, data, onSuccess) {
    return artjs.Ajax.request(url, data, artjs.Ajax.Methods.GET, onSuccess);
  },
  post: function(url, data, onSuccess) {
    return artjs.Ajax.request(url, data, artjs.Ajax.Methods.POST, onSuccess);
  },
  put: function(url, data, onSuccess) {
    return artjs.Ajax.request(url, data, artjs.Ajax.Methods.PUT, onSuccess);
  },
  del: function(url, data, onSuccess) {
    return artjs.Ajax.request(url, data, artjs.Ajax.Methods.DELETE, onSuccess);
  },
  request: function(url, data, method, onSuccess) {
    var ajax = new artjs.Ajax(url, data, method);
    if (onSuccess) {
      ajax.onSuccess.add(onSuccess);
    }
    ajax.request();
    return ajax;
  }
});

artjs.Ajax.SupportedMethods = [ artjs.Ajax.Methods.GET, artjs.Ajax.Methods.POST ];

artjs.$get = artjs.Ajax.get;

artjs.$post = artjs.Ajax.post;

artjs.$put = artjs.Ajax.put;

artjs.$del = artjs.Ajax.del;

artjs.List = artjs.data.List = artjs.Class(function(items) {
  this.items = items || {};
  this.i = 0;
  this.onChange = new artjs.CustomEvent("List::onChange");
  this.allowDuplicates = true;
  this.loop = false;
}, {
  addItem: function(item, noEvent) {
    if (this.allowDuplicates || !this.hasItem(item)) {
      this.items.push(item);
      if (!noEvent) {
        this.onChange.fire(this);
      }
    }
    return this.getLength();
  },
  addItemAt: function(item, position, noEvent) {
    if (this.allowDuplicates || !this.hasItem(item)) {
      this.items = artjs.ArrayUtils.insertAt(this.items, position, item);
      if (!noEvent) {
        this.onChange.fire(this);
      }
    }
    return this.getLength();
  },
  removeItem: function(item, onlyFirst, noEvent) {
    artjs.ArrayUtils.removeItem(this.items, item, onlyFirst);
    if (!noEvent) {
      this.onChange.fire(this);
    }
    return this.getLength();
  },
  removeItemAt: function(position, noEvent) {
    artjs.ArrayUtils.removeAt(this.items, position);
    if (!noEvent) {
      this.onChange.fire(this);
    }
    return this.getLength();
  },
  removeAll: function(noEvent) {
    this.items.splice(0);
    if (!noEvent) {
      this.onChange.fire(this);
    }
  },
  getItemAt: function(position) {
    position = this.loop ? artjs.MathUtils.sawtooth(position, 0, this.getLength()) : position;
    return this.items[position];
  },
  getItemIndex: function(item) {
    return this.items.indexOf(item);
  },
  moveItem: function(fromIndex, toIndex) {
    var item = this.getItemAt(fromIndex);
    this.removeItemAt(fromIndex, true);
    this.addItemAt(item, toIndex);
  },
  getLength: function() {
    return this.items.length;
  },
  getItems: function() {
    return this.items.concat();
  },
  setItems: function(items) {
    this.items = items;
    this.onChange.fire(this);
  },
  hasItem: function(item) {
    return artjs.ArrayUtils.includes(this.items, item);
  },
  setPointerAtItem: function(item) {
    if (!this.hasItem(item)) {
      artjs.p("{List} There is no item " + item + " in List!");
      return;
    }
    this.setPointer(this.getItemIndex(item));
  },
  reset: function() {
    this.i = 0;
  },
  getPointer: function() {
    return this.i;
  },
  setPointer: function(i) {
    this.i = i;
  },
  decrease: function() {
    this.i--;
  },
  increase: function() {
    this.i++;
  },
  getCurrent: function() {
    return this.getItemAt(this.i);
  },
  getPrevious: function() {
    return this.getItemAt(this.i - 1);
  },
  getNext: function() {
    return this.getItemAt(this.i + 1);
  },
  getFirst: function() {
    return artjs.ArrayUtils.first(this.items);
  },
  getLast: function() {
    return artjs.ArrayUtils.last(this.items);
  },
  isEmpty: function() {
    return artjs.ArrayUtils.isEmpty(this.items);
  },
  isLast: function() {
    return this.i == this.getLength() - 1;
  },
  toString: function() {
    return this.items.toString();
  }
});

artjs.Model = artjs.data.Model = artjs.Class();

artjs.Queue = artjs.data.Queue = artjs.Class(function(data) {
  this.onChange = new artjs.CustomEvent("Queue::onChange");
  this.list = new artjs.List(data);
  this.list.onChange.add(artjs.$D(this, this._onChange));
}, {
  _onChange: function() {
    this.onChange.fire(this);
  },
  addItem: function(item) {
    return this.list.addItem(item);
  },
  getItem: function() {
    var item = this.list.getItemAt(0);
    this.list.removeItemAt(0);
    return item;
  },
  setData: function(data) {
    this.list = new artjs.List(data);
  },
  getLength: function() {
    return this.list.getLength();
  },
  isEmpty: function() {
    return this.list.isEmpty();
  },
  toString: function() {
    return this.list.toString();
  }
});

artjs.Clock = artjs.events.Clock = artjs.Class(function(interval, repeat) {
  this._interval = interval;
  this._repeat = repeat;
  this._id = null;
  this._counter = 0;
  this._tickDC = artjs.$DC(this, this._tick);
  this.onChange = new artjs.CustomEvent("Clock:onChange");
  this.onComplete = new artjs.CustomEvent("Clock:onComplete");
}, {
  start: function(now) {
    this.stop();
    this.resume(now);
  },
  stop: function() {
    this.pause();
    this._counter = 0;
  },
  pause: function() {
    clearInterval(this._id);
    this._id = null;
  },
  resume: function(now) {
    this._id = setInterval(this._tickDC, this._interval);
    if (now) {
      this._tick();
    }
  },
  isRunning: function() {
    return this._id !== null;
  },
  _tick: function() {
    this._counter++;
    this.onChange.fire(this);
    if (this._counter == this._repeat) {
      this.stop();
      this.onComplete.fire(this);
    }
  }
});

artjs.Broadcaster = artjs.events.Broadcaster = {
  _events: {},
  register: function(id, event) {
    this._events[id] = event;
  },
  addListener: function(id, delegate) {
    this._events[id].add(delegate);
  },
  fire: function(id, data) {
    this._events[id].fire(data);
  }
};

artjs.ElementEvent = artjs.events.Element = artjs.Class(function(element, name, delegate) {
  this.element = element;
  this.delegate = delegate;
  artjs.$BA(this);
  if (element.addEventListener) {
    element.addEventListener(name, this._onEvent, false);
  } else {
    element.attachEvent("on" + name, this._onEvent);
  }
}, {
  getTargets: function(e, over) {
    if (e.target) {
      return {
        origin: e.target,
        current: e.currentTarget,
        related: e.relatedTarget
      };
    } else {
      var originRelated = [ e.fromElement, e.toElement ];
      if (over) originRelated.reverse();
      return {
        origin: originRelated[0],
        current: this.element,
        related: originRelated[1]
      };
    }
  },
  _onEvent: function(e) {
    this.delegate.invoke(e, this);
  }
});

artjs.MouseEvent = artjs.events.Mouse = artjs.Class(function(element, name, delegate, on) {
  this.super(arguments, element, name, delegate);
  this.over = false;
  this.on = on;
}, {
  _onEvent: function(e) {
    if (this._edge(e) && !(this.on == this.over)) {
      this.over = this.on;
      this.super(arguments, e);
    }
  },
  _edge: function(e) {
    var targets = this.getTargets(e, this.on);
    var t = targets.origin;
    var ct = targets.current;
    var rt = targets.related;
    var s = artjs.Selector;
    return t == ct && !s.isDescendantOf(rt, ct) || s.isDescendantOf(t, ct) && !s.isSelfOrDescendantOf(rt, ct);
  }
}, null, artjs.ElementEvent);

artjs.ClickEvent = artjs.events.Click = artjs.Class(function(element, delegate) {
  this.super(arguments, element, "click", delegate);
}, null, null, artjs.ElementEvent);

artjs.MouseMoveEvent = artjs.events.MouseMove = artjs.Class(function(element, delegate) {
  this.super(arguments, element, "mousemove", delegate);
}, null, null, artjs.ElementEvent);

artjs.MouseOverEvent = artjs.events.MouseOver = artjs.Class(function(element, delegate) {
  this.super(arguments, element, "mouseover", delegate, true);
}, null, null, artjs.MouseEvent);

artjs.MouseOutEvent = artjs.events.MouseOut = artjs.Class(function(element, delegate) {
  this.super(arguments, element, "mouseout", delegate);
}, null, null, artjs.MouseEvent);

artjs.ChangeEvent = artjs.events.Change = artjs.Class(function(element, delegate) {
  this.super(arguments, element, "change", delegate);
}, null, null, artjs.ElementEvent);

artjs.EventMapping = {
  mousemove: "MouseMoveEvent",
  mouseover: "MouseOverEvent",
  mouseout: "MouseOutEvent",
  click: "ClickEvent",
  change: "ChangeEvent"
};

artjs.on = function(eventName, target, delegate) {
  return new artjs[artjs.EventMapping[eventName]](target, delegate);
};

artjs.Timeline = artjs.events.Timeline = artjs.Class(null, {
  mark: function() {
    this._t2 = artjs.DateUtils.getTime();
    var interval = this._t2 - (this._t1 || this._t2);
    this._t1 = this._t2;
    return interval;
  }
});

artjs.Timeout = artjs.events.Timeout = artjs.Class(function(delay) {
  this._delay = delay;
  this._onTimeoutDC = artjs.$DC(this, this._onTimeout);
  this.onComplete = new artjs.CustomEvent("Timeout:onComplete");
}, {
  start: function() {
    this._id = setTimeout(this._onTimeoutDC, this._delay);
  },
  isRunning: function() {
    return this._id !== null;
  },
  getDelay: function() {
    return this._delay;
  },
  _onTimeout: function() {
    delete this._id;
    this.onComplete.fire(this);
  }
}, {
  fire: function(delegate, delay) {
    var instance = new this(delay);
    instance.onComplete.add(delegate);
    instance.start();
    return instance;
  },
  defer: function(delegate) {
    return this.fire(delegate, 0);
  }
});

artjs.TransitionBase = artjs.transition.Base = artjs.Class(function(property, element, value, duration, type, delay, from) {
  this.property = property;
  this.element = element;
  this.duration = artjs.ObjectUtils.getDefault(duration, 1);
  this.value = value;
  this.type = type || this.ctor.LINEAR;
  this.delay = delay || 0;
  this.from = from;
  this._deferredD = artjs.$D(this, this._deferred);
}, {
  run: function() {
    if (artjs.ObjectUtils.isPresent(this.from)) {
      this._setStyle(this.from);
      this._setEffectStyle("none");
    }
    artjs.Timeout.defer(this._deferredD);
  },
  _deferred: function() {
    this._setEffectStyle(this.property);
    this._setStyle(this.value);
  },
  _setStyle: function(value) {
    artjs.ElementUtils.setStyle(this.element, this.property, value);
  },
  _setEffectStyle: function(prop) {
    var effectStyle = artjs.ElementUtils.transitionStyle(prop, this.duration, this.type, this.delay);
    artjs.ElementUtils.extendStyle(this.element, effectStyle);
  }
}, {
  LINEAR: "linear",
  EASE: "ease",
  EASE_IN: "ease-in",
  EASE_IN_OUT: "ease-in-out",
  EASE_OUT: "ease-out",
  run: function(e, value, duration, type, delay, from) {
    var instance = new this(e, value, duration, type, delay, from);
    instance.run();
  }
});

artjs.Blind = artjs.transition.Blind = artjs.Class(function() {
  this.super(arguments, "height");
}, {
  _setStyle: function(value) {
    this.super(arguments, value + "px");
    artjs.ElementUtils.setStyle(this.element, "overflow", "hidden");
  }
}, {
  toggle: function(e, value, duration, type, delay) {
    var v = e.style.height == "0px" ? value : 0;
    this.run(e, v, duration, type, delay);
  }
}, artjs.TransitionBase);

artjs.Fade = artjs.transition.Fade = artjs.Class(function() {
  this.super(arguments, "opacity");
}, null, null, artjs.TransitionBase);

artjs.BaseMatcher = artjs.spec.matchers.Base = artjs.Class(function(expected, toText) {
  this.expected = expected;
  this.toText = toText || "be";
}, {
  resolve: function(actual) {
    return actual.value === this.expected;
  },
  _failureData: function(actual) {
    return [ actual.value, "expected to", this.toText, String(this.expected) ];
  },
  failureText: function(actual) {
    return this._failureData(actual).join(" ");
  }
});

artjs.AMatcher = artjs.spec.matchers.A = artjs.Class(function(expected) {
  this.super(arguments, expected);
}, {
  resolve: function(actual) {
    return typeof actual.value === this.expected;
  }
}, null, artjs.BaseMatcher);

function beA(expected) {
  return new artjs.AMatcher(expected);
}

artjs.EqMatcher = artjs.spec.matchers.Eq = artjs.Class(function(expected) {
  this.super(arguments, expected, "equal");
}, {
  resolve: function(actual) {
    if (artjs.ObjectUtils.isArray(actual.value)) {
      return artjs.ArrayUtils.equal([ actual.value, this.expected ]);
    } else {
      return this.super(arguments, actual);
    }
  }
}, null, artjs.BaseMatcher);

function eq(expected) {
  return new artjs.EqMatcher(expected);
}

artjs.FalseMatcher = artjs.spec.matchers.False = artjs.Class(function() {
  this.super(arguments, false);
}, null, null, artjs.BaseMatcher);

function beFalse() {
  return new artjs.FalseMatcher;
}

artjs.NullMatcher = artjs.spec.matchers.Null = artjs.Class(function() {
  this.super(arguments, null);
}, null, null, artjs.BaseMatcher);

function beNull() {
  return new artjs.NullMatcher;
}

artjs.ReceiveMatcher = artjs.spec.matchers.Receive = artjs.Class(function(expected) {
  this.super(arguments, expected, "receive");
}, {
  resolve: function(actual) {
    this.receiver = new artjs.SpecReceiver(this, actual);
    artjs.SpecRunner.pushReceiver(this.receiver);
    return this.receiver;
  },
  _failureData: function(actual) {
    var result = this.super(arguments, actual);
    var expectedArgs = this.receiver.args();
    if (expectedArgs) {
      var actualArgs = this.receiver.actualArgs();
      result.push("with");
      result.push(this._argsString(expectedArgs));
      if (actualArgs) {
        result.push("but was " + this._argsString(actualArgs));
      }
    }
    return result;
  },
  _mapArgs: function(i) {
    return "[" + i.join(", ") + "]";
  },
  _argsString: function(args) {
    return "(" + (this.receiver.isInSeries() ? artjs.ArrayUtils.map(args, this._mapArgs, this) : args).join(", ") + ")";
  }
}, null, artjs.BaseMatcher);

function receive(expected) {
  return new artjs.ReceiveMatcher(expected);
}

artjs.TrueMatcher = artjs.spec.matchers.True = artjs.Class(function() {
  this.super(arguments, true);
}, null, null, artjs.BaseMatcher);

function beTrue() {
  return new artjs.TrueMatcher;
}

artjs.Actual = artjs.spec.Actual = artjs.Class(function(value) {
  this.value = value;
}, {
  to: function(matcher) {
    var value = matcher.resolve(this);
    if (typeof value == "boolean") {
      artjs.SpecRunner.pushResult(new artjs.SpecResult(this, matcher, value));
    }
    return value;
  }
});

function expect(value) {
  return new artjs.Actual(value);
}

artjs.Mock = artjs.spec.Mock = artjs.Class(function() {}, {
  toString: function() {
    return "mock";
  }
});

function mock() {
  return new artjs.Mock;
}

artjs.SpecNode = artjs.spec.Node = artjs.Class(function(facet, body) {
  this.facet = facet;
  this.body = body;
}, {
  execute: function() {
    artjs.SpecRunner.pushNode(this);
    this.body();
    artjs.SpecRunner.popNode();
  }
});

artjs.Spec = artjs.Class(null, {
  execute: function() {
    artjs.SpecRunner.setSubject(this.facet);
    this.super(arguments);
  }
}, null, artjs.SpecNode);

artjs.Describe = artjs.Class(null, null, null, artjs.SpecNode);

artjs.Context = artjs.Class(null, null, null, artjs.SpecNode);

artjs.It = artjs.Class(null, {
  execute: function() {
    artjs.SpecRunner.setIt(this);
    artjs.SpecRunner.resetReceivers();
    this.super(arguments);
    artjs.SpecRunner.testReceivers();
  }
}, null, artjs.SpecNode);

function spec(facet, body) {
  var node = new artjs.Spec(facet, body);
  artjs.SpecRunner.pushSpec(node);
}

function _executeNode(type, facet, body) {
  var node = new type(facet, body);
  node.execute();
}

function describe(facet, body) {
  _executeNode(artjs.Describe, facet, body);
}

function context(facet, body) {
  _executeNode(artjs.Context, facet, body);
}

function it(facet, body) {
  _executeNode(artjs.It, facet, body);
}

artjs.SpecReceiver = artjs.spec.Receiver = artjs.Class(function(matcher, actual) {
  this._matcher = matcher;
  this._actual = actual;
  var actualValue = this._actual.value;
  var expected = this._matcher.expected;
  var dc = artjs.$DC(this, this.resolve);
  if (!this._isForMock()) {
    this._original = artjs.$D(actualValue, actualValue[expected]);
  }
  actualValue[expected] = dc;
  this._successCounter = 0;
  this._callCounter = 0;
  this._times = null;
  this._args = null;
  this._callOriginal = null;
  this._inSeries = null;
}, {
  resolve: function() {
    var args = artjs.$A(arguments);
    var returnValue;
    if (this._callOriginal) {
      this._original.args = args;
      returnValue = this._original.invoke();
    } else {
      returnValue = this._returnValue;
    }
    if (this._args == null) {
      this._successCounter++;
    } else {
      var expectedArgs = this._inSeries ? this._args[this._callCounter] : this._args;
      if (artjs.ArrayUtils.equal([ args, expectedArgs ])) {
        this._successCounter++;
      }
    }
    if (this._inSeries) {
      if (!this._actualArgs) {
        this._actualArgs = [];
      }
      this._actualArgs.push(args);
    } else {
      this._actualArgs = args;
    }
    this._callCounter++;
    return returnValue;
  },
  inSeries: function() {
    this._inSeries = true;
    return this;
  },
  withArgs: function() {
    this._args = artjs.$A(arguments);
    return this;
  },
  andReturn: function(returnValue) {
    this._returnValue = returnValue;
    return this;
  },
  andCallOriginal: function() {
    var forMock = this._isForMock();
    if (forMock) {
      artjs.log('WARNING: Using "andCallOriginal" for mock has no result.');
    }
    this._callOriginal = !forMock;
    return this;
  },
  once: function() {
    this.times(1);
    return this;
  },
  twice: function() {
    this.times(2);
    return this;
  },
  times: function(n) {
    this._times = n;
    return this;
  },
  args: function() {
    return this._args;
  },
  actualArgs: function() {
    return this._actualArgs;
  },
  isInSeries: function() {
    return this._inSeries;
  },
  getResult: function() {
    var times = this._inSeries ? this._args.length : this._times;
    var n = this._successCounter;
    var value = times == null ? n > 0 : n == times;
    return new artjs.SpecResult(this._actual, this._matcher, value);
  },
  rollback: function() {
    if (!this._isForMock()) {
      this._actual.value[this._matcher.expected] = this._original.method;
    }
  },
  _isForMock: function() {
    return this._actual.value instanceof artjs.Mock;
  }
});

artjs.SpecResult = artjs.spec.Result = artjs.Class(function(actual, matcher, value) {
  this.path = artjs.SpecRunner.getPath().concat();
  this.actual = actual;
  this.matcher = matcher;
  this.value = value;
}, {
  failureText: function() {
    return this.matcher.failureText(this.actual);
  }
});

artjs.SpecRunner = artjs.spec.Runner = {
  _specs: [],
  _duration: null,
  _it: null,
  _subject: null,
  _path: [],
  _results: [],
  _receivers: [],
  _timeline: new artjs.Timeline,
  onComplete: new artjs.CustomEvent("artjs.SpecRunner::onComplete"),
  onResult: new artjs.CustomEvent("artjs.SpecRunner::onResult"),
  run: function() {
    this._timeline.mark();
    artjs.ArrayUtils.invoke(this._specs, "execute");
    this._duration = this._timeline.mark();
    this.onComplete.fire(this);
  },
  pushSpec: function(spec) {
    this._specs.push(spec);
  },
  pushNode: function(node) {
    this._path.push(node);
  },
  popNode: function(node) {
    this._path.pop();
  },
  setSubject: function(subject) {
    this._subject = subject;
  },
  setIt: function(it) {
    this._it = it;
  },
  getDuration: function() {
    return this._duration;
  },
  getSubject: function() {
    return this._subject;
  },
  getPath: function() {
    return this._path;
  },
  getResults: function() {
    return this._results;
  },
  getLastResult: function() {
    return artjs.ArrayUtils.last(this._results);
  },
  alreadyFailed: function() {
    var lastResult = this.getLastResult();
    return lastResult && lastResult.it == this._it && !lastResult.value;
  },
  pushReceiver: function(receiver) {
    this._receivers.push(receiver);
  },
  resetReceivers: function() {
    this._receivers = [];
  },
  testReceivers: function() {
    artjs.ArrayUtils.each(this._receivers, this.testReceiver, this);
  },
  testReceiver: function(receiver) {
    var result = receiver.getResult();
    this.pushResult(result);
    receiver.rollback();
  },
  pushResult: function(result) {
    if (!this.alreadyFailed()) {
      result.it = this._it;
      this._results.push(result);
      this.onResult.fire(this);
    }
  }
};

function subject() {
  return artjs.SpecRunner.getSubject();
}

artjs.SpecView = artjs.spec.View = {
  init: function() {
    this._runnerTemplate = artjs.$C("div", {
      className: "runner"
    });
    this._testTemplate = artjs.$C("span");
    this._resultsTemplate = artjs.$C("div");
    artjs.SpecRunner.onResult.add(artjs.$D(this, "_onResult"));
    artjs.SpecRunner.onComplete.add(artjs.$D(this, "_onComplete"));
  },
  run: function() {
    this._element = artjs.$insert(document.body, this._runnerTemplate);
    artjs.SpecRunner.run();
  },
  _onResult: function(runner) {
    var result = runner.getLastResult();
    artjs.ElementUtils.setContent(this._testTemplate, result.value ? "." : "F");
    this._testTemplate.className = result.value ? "success" : "failure";
    artjs.ElementUtils.insert(this._element, this._testTemplate);
  },
  _onComplete: function(runner) {
    var results = runner.getResults();
    var duration = runner.getDuration();
    var failures = artjs.ArrayUtils.select(results, this._isFailure, this);
    var success = artjs.ArrayUtils.isEmpty(failures);
    var classNames = [ "results" ];
    var n = results.length;
    var k = failures.length;
    classNames.push(success ? "success" : "failure");
    this._resultsTemplate.className = classNames.join(" ");
    var resultsElement = artjs.$insert(document.body, this._resultsTemplate);
    var resultText = success ? "Success!" : "Failure!";
    var statsText = success ? n + " assertions in total." : k + " assertions failed of " + n + " total.";
    var durationText = "Duration: " + artjs.DateUtils.miliToHMSM(duration);
    var resultElement = artjs.$E("p", {
      className: "result"
    }, resultText);
    var statElement = artjs.$E("p", {
      className: "stat"
    }, statsText + "<br/>" + durationText);
    artjs.$insert(resultsElement, resultElement);
    artjs.$insert(resultsElement, statElement);
    if (!success) {
      var list = artjs.$E("ul");
      this._getFailureHtml.list = list;
      artjs.ArrayUtils.each(failures, this._getFailureHtml, this);
      artjs.$insert(resultsElement, list);
    }
  },
  _getFailureHtml: function(i) {
    var path = artjs.ArrayUtils.map(i.path, this._nodeToString).join(" ");
    var info = i.failureText();
    var pathElement = artjs.$E("p", {
      className: "path"
    }, path);
    var infoElement = artjs.$E("p", {
      className: "info"
    }, info);
    var item = artjs.$E("li");
    artjs.$insert(item, pathElement);
    artjs.$insert(item, infoElement);
    artjs.$insert(arguments.callee.list, item);
  },
  _nodeToString: function(i) {
    var facet = i.facet;
    return typeof facet == "string" ? facet : facet._name;
  },
  _isFailure: function(i) {
    return !i.value;
  }
};

artjs.TemplateCompiler = artjs.template.Compiler = artjs.Class(function(content, scope) {
  this._tagRegEx = /\{\{.+\}\}/g;
  this._methodRegEx = /^(\w+)\((.*)\)$/;
  this._content = content;
  this._scope = scope;
}, {
  compile: function() {
    var tags = this._content.match(this._tagRegEx);
    artjs.ArrayUtils.each(tags, this._eachTag, this);
    return this._content;
  },
  _eachTag: function(i) {
    var expression = artjs.StringUtils.sub(i, 2, -2);
    var result = this._parseExpression(expression);
    this._content = this._content.replace(i, result);
  },
  _parseExpression: function(expression) {
    this._methodRegEx.lastIndex = 0;
    var exec = this._methodRegEx.exec(expression);
    return exec ? this._parseMethod(exec) : this._fromScope(expression);
  },
  _parseMethod: function(exec) {
    exec.shift();
    var action = exec.shift();
    var argsStr = artjs.ArrayUtils.first(exec);
    var args = artjs.ArrayUtils.map(argsStr.split(","), this._stripArg, this);
    var argsValues = artjs.ArrayUtils.map(args, this._parseArg, this);
    return artjs.TemplateHelpers.perform(action, argsValues, this._scope);
  },
  _parseArg: function(i) {
    var str = i;
    str = artjs.StringUtils.trim(str, "'");
    str = artjs.StringUtils.trim(str, '"');
    return str == i ? this._parseExpression(i) : str;
  },
  _fromScope: function(i) {
    return this._scope[i] || "";
  },
  _stripArg: function(i) {
    return artjs.StringUtils.strip(i);
  }
});

artjs.TemplateBase = artjs.template.Base = {
  render: function(content, scope) {
    var compiler = new artjs.TemplateCompiler(content, scope);
    return compiler.compile(content, scope);
  },
  renderInto: function(element, content, scope) {
    artjs.ElementUtils.setContent(element, this.render(content, scope));
    this.evalScripts(element);
    artjs.ComponentScanner.scan(element);
  },
  renderElement: function(element, scope) {
    this.renderInto(element, element.innerHTML, scope);
  },
  renderTemplateInto: function(element, templateId, scope) {
    var template = artjs.TemplateLibrary.getTemplate(templateId);
    this.renderInto(element, template, scope);
  },
  evalScripts: function(element) {
    artjs.ArrayUtils.each(artjs.Selector.find(element, "script"), this.evalScript, this);
  },
  evalScript: function(script) {
    eval(artjs.ElementUtils.getContent(script));
  }
};

artjs.TemplateHelpers = artjs.template.Helpers = {
  render: function(templateId, scope) {
    var template = artjs.TemplateLibrary.getTemplate(templateId);
    return artjs.TemplateBase.render(template, scope);
  },
  renderInto: function(element, templateId, scope) {
    artjs.TemplateBase.renderTemplateInto(element, templateId, scope);
  },
  renderCollection: function(templateId, collection) {
    var callback = artjs.$DC(this, this._renderCollectionItem, false, templateId);
    return this._map(collection, callback);
  },
  renderIf: function(value, method) {
    return value ? this[method](value) : "";
  },
  renderSelect: function(options, selected) {
    this._selectedOption = selected;
    return this._renderElement("select", options, this.renderOptions(options));
  },
  renderOptions: function(options) {
    return this._map(options, this._renderOption);
  },
  renderTable: function(data) {
    var head = data.head ? this._renderElement("thead", null, this._map(data.head || [], this._renderTableHead)) : "";
    var foot = data.foot ? this._renderElement("tfoot", null, this._map(data.foot, this._renderTableFoot)) : "";
    var body = data.body ? this._renderElement("tbody", null, this._map(data.body || [], this._renderTableRow)) : "";
    return this._renderElement("table", null, head + foot + body);
  },
  _map: function(coll, func) {
    return artjs.ArrayUtils.map(coll, func, this).join("");
  },
  _renderOption: function(i) {
    var attrs = {
      value: i.value
    };
    if (i.value == this._selectedOption) {
      attrs.selected = "selected";
    }
    return this._renderElement("option", attrs, i.text);
  },
  _renderTableHead: function(i) {
    return this._renderTableCell("th", i);
  },
  _renderTableFoot: function(i) {
    return this._renderTableElement(i);
  },
  _renderTableRow: function(i) {
    return this._renderElement("tr", null, this._map(i, this._renderTableElement));
  },
  _renderTableElement: function(i) {
    return this._renderTableCell("td", i);
  },
  _renderTableCell: function(type, content) {
    return this._renderElement(type, null, content);
  },
  _renderElement: function(name, attrs, value) {
    return artjs.$B(name, attrs, value).toString();
  },
  registerAll: function(helpers) {
    artjs.ObjectUtils.eachPair(helpers, this.register, this);
  },
  register: function(name, method) {
    this[name] = method;
  },
  perform: function(action, args, scope) {
    return this[action].apply(this, args.concat(scope));
  },
  _renderCollectionItem: function(scope, idx, arr, templateId) {
    scope._index = idx;
    return this.render(templateId, scope);
  }
};

artjs.TemplateLibrary = artjs.template.Library = {
  BASE_TEMPLATES: [ "artjs/calendar" ],
  config: {
    PATH: "/templates",
    TEMPLATES: []
  },
  _templates: {},
  init: function() {
    artjs.$BA(this);
    artjs.onDocumentLoad.add(this._onLoadAll.delegate);
  },
  getTemplate: function(id) {
    return this._templates[id];
  },
  loadTemplate: function(id) {
    artjs.TemplateBase.renderElement(artjs.ElementUtils.insert(this._templatesContainer, artjs.$E("div", null, artjs.TemplateLibrary.getTemplate(id))));
  },
  _onLoadAll: function() {
    this._templatesToLoad = this.BASE_TEMPLATES.concat(this.config.TEMPLATES);
    artjs.ElementUtils.hide(document.body);
    artjs.ArrayUtils.each(this._templatesToLoad, this._load, this);
    this._loadCheck();
  },
  _load: function(i) {
    var request = artjs.$get(this.config.PATH + "/" + i + ".html", null, this._onLoadSuccess.delegate);
    request.id = i;
  },
  _onLoadSuccess: function(ajax) {
    this._templates[ajax.id] = ajax.getResponseText();
    this._loadCheck();
  },
  _loadCheck: function() {
    if (artjs.ObjectUtils.keys(this._templates).length == this._templatesToLoad.length) {
      this._onAllLoaded();
    }
  },
  _onAllLoaded: function() {
    var body = document.body;
    artjs.ElementUtils.show(body);
    artjs.TemplateBase.renderElement(body, window);
    this._templatesContainer = artjs.ElementUtils.insert(document.body, artjs.$E("div", {
      id: "artjs-Templates"
    }));
    artjs.onLibraryLoad.fire(this);
  }
};

artjs.DatePicker = artjs.ui.DatePicker = artjs.Class(function() {
  this.super(arguments);
  artjs.$BA(this);
  var now = new Date;
  var year = now.getFullYear();
  var month = now.getMonth();
  var data = artjs.ElementUtils.getData(this.element);
  var firstDay = parseInt(data["first-day"]);
  this.year = year;
  this.month = month;
  this.yearsRange = new artjs.Point(parseInt(data["year-from"]) || year - 100, parseInt(data["year-to"]) || year + 20);
  this.firstDay = isNaN(firstDay) ? 1 : firstDay;
  var img = artjs.ElementUtils.putAfter(artjs.$C("img", {
    src: "../images/cal.png",
    alt: "calendar_icon",
    className: "artjs-DatepickerImg"
  }), this.element);
  this.element.editable = false;
  artjs.ElementUtils.onClick(img, this._onImg.delegate);
  this.calendar = artjs.$("#artjs-Calendar");
  if (artjs.ArrayUtils.isEmpty(this.calendar)) {
    artjs.ComponentScanner.addListener("artjs-Calendar", artjs.$D(this, "_onCalendarLoad"));
  }
}, {
  _onCalendarLoad: function(component) {
    this.calendar = component;
  },
  _onImg: function(e) {
    e.preventDefault();
    var img = e.currentTarget;
    var imgRT = artjs.ElementUtils.getBounds(img).getRightTop();
    var position = imgRT.add(new artjs.Point(2, 2));
    this.calendar.source = this;
    this.calendar.setPosition(position);
    this.calendar.toggle();
  }
}, null, artjs.Component);

artjs.Calendar = artjs.ui.Calendar = artjs.Class(function() {
  this.super(arguments);
  artjs.$BA(this);
  this._hide();
  artjs.Component.onLoad("artjs-Calendar-years", this._onYearsSelectLoaded.delegate);
  artjs.Component.onLoad("artjs-Calendar-months", this._onMonthsSelectLoaded.delegate);
  artjs.Component.onLoad("artjs-Calendar-days", this._onDaysTableLoaded.delegate);
  artjs.Component.onLoad("artjs-Calendar-prev", this._onPrevLoaded.delegate);
  artjs.Component.onLoad("artjs-Calendar-next", this._onNextLoaded.delegate);
}, {
  _onYearsSelectLoaded: function(select) {
    this._years = select;
    this._years.onChange.add(this._onYearSelect.delegate);
  },
  _onMonthsSelectLoaded: function(select) {
    this._months = select;
    this._months.onChange.add(this._onMonthSelect.delegate);
    this._months.setOptions(artjs.ArrayUtils.map(this.ctor.MONTHS, this.ctor._toMonthOption));
  },
  _onDaysTableLoaded: function(table) {
    this._days = table;
    this._days.setData({
      head: this._getDaysRow(),
      body: artjs.ArrayUtils.build(this.ctor.ROWS_NUM, this._getDaysRow)
    });
    this._days.onItem.add(this._onItem.delegate);
  },
  _onPrevLoaded: function(prev) {
    prev.onClick.add(this._onPrevMonth.delegate);
  },
  _onNextLoaded: function(next) {
    next.onClick.add(this._onNextMonth.delegate);
  },
  _getDaysRow: function() {
    return artjs.ArrayUtils.build(7, artjs.StringUtils.blank);
  },
  toggle: function() {
    this._isHidden() ? this._show() : this._hide();
  },
  _show: function() {
    this._years.setOptions(artjs.ArrayUtils.map(artjs.ArrayUtils.fromRange(this.source.yearsRange), this.ctor._toYearOption));
    this._years.setSelected(this.source.year);
    this._months.setSelected(this.source.month);
    this.firstDay = this.source.firstDay;
    var value = this.source.element.value;
    this.selectedDate = artjs.StringUtils.isEmpty(value) ? new Date : artjs.DateUtils.fromYMD(value, this.ctor.SEPARATOR);
    this.currentDate = new Date(this.selectedDate);
    this._update();
    artjs.ElementUtils.show(this.element);
  },
  setPosition: function(position) {
    artjs.ElementUtils.setPosition(this.element, position);
  },
  _hide: function() {
    artjs.ElementUtils.hide(this.element);
  },
  _isHidden: function() {
    return artjs.ElementUtils.isHidden(this.element);
  },
  _update: function() {
    var monthFirstDate = artjs.DateUtils.firstDate(this.currentDate);
    var monthFirstDay = monthFirstDate.getDay();
    var monthDaysNum = artjs.DateUtils.monthDaysNum(this.currentDate);
    this._months.setSelected(this.currentDate.getMonth() + 1);
    this._years.setSelected(this.currentDate.getFullYear());
    this.startIndex = artjs.MathUtils.sawtooth(monthFirstDay - this.firstDay, 0, 7);
    var rowsNum = artjs.MathUtils.stairs(this.startIndex + monthDaysNum - 1, 0, 7) + 1;
    for (var i = 0; i < this.ctor.ROWS_NUM; i++) {
      this._days.setRowVisible(i, i < rowsNum);
    }
    this._days.updateHead(artjs.ArrayUtils.build(7, this._eachHeadData, this));
    this._days.iterate(this._onEachDay.delegate);
  },
  _eachHeadData: function(idx) {
    var index = artjs.MathUtils.sawtooth(this.firstDay + idx, 0, 7);
    return this.ctor.DAYS[index];
  },
  _onEachDay: function(item, idx) {
    var date = new Date(this.currentDate);
    date.setDate(idx - this.startIndex + 1);
    var value = date.getDate();
    var valid = date.getMonth() == this.currentDate.getMonth();
    var weekend = artjs.ArrayUtils.includes(this.ctor.WEEKEND_DAYS, (idx + this.firstDay) % 7);
    var selected = date.getTime() == this.selectedDate.getTime();
    item.style.background = this.ctor.CELL_BG[valid ? weekend ? "weekend" : "valid" : "invalid"];
    artjs.ElementUtils.setClass(item, "selected", selected);
    artjs.ElementUtils.setClass(item, "invalid", !valid);
    artjs.ElementUtils.setContent(item, value);
  },
  _onItem: function(item) {
    var value = artjs.ElementUtils.getContent(item);
    var valid = !artjs.ElementUtils.hasClass(item, "invalid");
    if (valid) {
      this.selectedDate.setFullYear(this.currentDate.getFullYear());
      this.selectedDate.setMonth(this.currentDate.getMonth());
      this.selectedDate.setDate(parseInt(value, 10));
      this._update();
      this.source.element.value = artjs.DateUtils.toYMD(this.selectedDate, this.ctor.SEPARATOR);
      this._hide();
    }
    return false;
  },
  _onPrevMonth: function(e) {
    e.preventDefault();
    this._onMonth(-1);
  },
  _onNextMonth: function(e) {
    e.preventDefault();
    this._onMonth(1);
  },
  _onMonth: function(v) {
    this.currentDate.setMonth(this.currentDate.getMonth() + v);
    this._update();
  },
  _onMonthSelect: function(select) {
    this.currentDate.setMonth(parseInt(select.getValue(), 10) - 1);
    this._update();
  },
  _onYearSelect: function(select) {
    this.currentDate.setFullYear(parseInt(select.getValue(), 10));
    this._update();
  },
  _setYearSpan: function(span) {
    this.yearSpan = span;
    this.years = artjs.ArrayUtils.build(this.yearSpan.y - this.yearSpan.x + 1, this._buildYearSpan);
  },
  _buildYearSpan: function(i) {
    return this.yearSpan.x + i;
  }
}, {
  MONTHS: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
  DAYS: [ "SU", "MO", "TU", "WE", "TH", "FR", "SA" ],
  WEEKEND_DAYS: [ 6, 0 ],
  ROWS_NUM: 7,
  SEPARATOR: "-",
  CELL_BG: {
    valid: "none",
    weekend: "#CFFFDF",
    invalid: "#AAAAAA"
  },
  init: function() {
    artjs.onLibraryLoad.add(artjs.$D(this, "_onLibraryLoad"));
  },
  _toMonthOption: function(i, idx) {
    return {
      value: idx + 1,
      text: i
    };
  },
  _toYearOption: function(i, idx) {
    return {
      value: i,
      text: i
    };
  },
  _onLibraryLoad: function() {
    artjs.TemplateLibrary.loadTemplate("artjs/calendar");
  }
}, artjs.Component);

artjs.Link = artjs.ui.Link = artjs.Class(function() {
  this.super(arguments);
  this.onClick = new artjs.CustomEvent("artjs.Link::onClick");
  artjs.on("click", this.element, artjs.$D(this, "_onClick"));
}, {
  _onClick: function(e) {
    this.onClick.fire(e);
  }
}, null, artjs.Component);

artjs.Select = artjs.ui.Select = artjs.Class(function() {
  this.super(arguments);
  this.onChange = new artjs.CustomEvent("artjs.Select::onChange");
  artjs.on("change", this.element, artjs.$D(this, "_onChange"));
}, {
  setOptions: function(options) {
    this._options = options;
    this._update();
  },
  setSelected: function(selected) {
    var oldOption = artjs.$first(this.element, "option[selected=selected]");
    if (oldOption) {
      oldOption.removeAttribute("selected");
    }
    var newOption = artjs.$first(this.element, "option[value=" + selected + "]");
    newOption.setAttribute("selected", "selected");
  },
  getValue: function() {
    return this.element.value;
  },
  _update: function() {
    artjs.ElementUtils.setContent(this.element, artjs.TemplateHelpers.renderOptions(this._options));
  },
  _onChange: function(e) {
    this.onChange.fire(this);
  }
}, null, artjs.Component);

artjs.Table = artjs.ui.Table = artjs.Class(function() {
  this.super(arguments);
  artjs.$BA(this);
  this.onItem = new artjs.CustomEvent("artjs.Table::onItem");
}, {
  setData: function(data) {
    this._data = data;
    this._update();
  },
  updateHead: function(data) {
    artjs.ArrayUtils.each(data, this._updateHead, this);
  },
  iterate: function(delegate) {
    artjs.ArrayUtils.each(this._items, delegate.method, delegate.object);
  },
  setRowVisible: function(i, visible) {
    artjs.ElementUtils.setVisible(this._rows[i], visible);
  },
  _updateHead: function(i, idx) {
    artjs.ElementUtils.setContent(this._headCells[idx], i);
  },
  _update: function() {
    artjs.ElementUtils.setContent(this.element, artjs.TemplateHelpers.renderTable(this._data));
    var head = artjs.$first(this.element, "thead");
    var body = artjs.$first(this.element, "tbody");
    this._headCells = artjs.$find(head, "th");
    this._rows = artjs.$find(body, "tr");
    this._items = artjs.$find(body, "td");
    artjs.ArrayUtils.each(this._items, this._initItem, this);
  },
  _initItem: function(item) {
    artjs.ElementUtils.onClick(item, this._onItem.delegate);
  },
  _onItem: function(e) {
    this.onItem.fire(e.currentTarget);
  }
}, null, artjs.Component);

artjs.Tree = artjs.ui.Tree = artjs.Class(function() {
  this.super(arguments);
  artjs.$BA(this);
  this._leafClassToggler = new artjs.ClassToggler("selected");
  this.onLeaf = new artjs.CustomEvent("artjs.Tree::onLeaf");
}, {
  setData: function(data) {
    var content = artjs.$P(this._renderNode(data));
    artjs.ElementUtils.insert(this.element, content);
    var point = artjs.ArrayUtils.partition(artjs.Selector.find(this.element, "li"), function(item, idx) {
      return artjs.ArrayUtils.isNotEmpty(artjs.Selector.find(item, "ul"));
    });
    this._nodes = point.x;
    this._leaves = point.y;
    artjs.ArrayUtils.each(this._nodes, this._eachNode, this);
    artjs.ArrayUtils.each(this._leaves, this._eachLeaf, this);
  },
  open: function() {
    this._toggleNode(artjs.ElementUtils.firstElement(artjs.ArrayUtils.first(this._nodes)));
    this._leafAction(artjs.ElementUtils.firstElement(artjs.ArrayUtils.first(this._leaves)));
  },
  _renderNode: function(node) {
    return artjs.$B("ul", null, artjs.ObjectUtils.map(node, this._mapNode, this).join("")).toString();
  },
  _mapNode: function(k, v) {
    var leaf = typeof v == "string";
    var href = leaf ? v : "#";
    var value = artjs.$B("a", {
      href: href
    }, k).toString() + (leaf ? "" : this._renderNode(v));
    return artjs.$B("li", null, value).toString();
  },
  _eachNode: function(i) {
    artjs.on("click", artjs.ElementUtils.firstElement(i), this._onNode.delegate);
    artjs.ElementUtils.hide(artjs.$first(i, "ul"));
  },
  _onNode: function(originalEvent, elementEvent) {
    originalEvent.preventDefault();
    this._toggleNode(elementEvent.element);
  },
  _toggleNode: function(a) {
    var ul = artjs.ElementUtils.next(a);
    artjs.ElementUtils.toggle(ul);
    artjs.ElementUtils.setClass(artjs.$parent(a), "expanded", !artjs.ElementUtils.isHidden(ul));
  },
  _eachLeaf: function(i) {
    artjs.on("click", artjs.ElementUtils.firstElement(i), this._onLeaf.delegate);
    artjs.ElementUtils.addClass(i, "leaf");
  },
  _onLeaf: function(originalEvent, elementEvent) {
    originalEvent.preventDefault();
    this._leafAction(elementEvent.element);
  },
  _leafAction: function(element) {
    this._leafClassToggler.toggle(element);
    this.onLeaf.fire(this);
  },
  getCurrent: function() {
    return this._leafClassToggler.getCurrent();
  }
}, null, artjs.Component);

artjs.ElementInspector = artjs.ui.ElementInspector = artjs.Class(function() {
  artjs.on("mousemove", document, artjs.$D(this, this._onMouseMove));
  this._toggler = new artjs.Toggler(true);
  this._toggler.onActivate.add(artjs.$D(this, this._onActivate));
  this._toggler.onDeactivate.add(artjs.$D(this, this._onDeactivate));
}, {
  _onMouseMove: function(e, ee) {
    var targets = ee.getTargets(e);
    var origin = targets.origin;
    var eu = artjs.ElementUtils;
    if (eu.children(origin).any(eu.isText)) {
      this._toggler.toggle(origin);
    }
  },
  _onActivate: function(toggler) {
    var current = toggler.current;
    if (current) {
      artjs.ElementUtils.addClass(current, "inspected");
    }
  },
  _onDeactivate: function(toggler) {
    var current = toggler.current;
    if (current) {
      artjs.ElementUtils.removeClass(current, "inspected");
    }
  }
});

artjs.onDocumentLoad = new artjs.CustomEvent("document:load");

artjs.onWindowLoad = new artjs.CustomEvent("window:load");

artjs.onLibraryLoad = new artjs.CustomEvent("library:load");

document.addEventListener("DOMContentLoaded", function() {
  artjs.onDocumentLoad.fire();
}, false);

window.addEventListener("load", function() {
  artjs.onWindowLoad.fire();
}, false);

artjs.ArrayUtils.init();

artjs.ComponentSweeper.init();

artjs.ObjectUtils.init();

artjs.ElementBuilder.init();

artjs.ElementUtils.init();

artjs.Selector.init();

artjs.TemplateLibrary.init();

artjs.Calendar.init();

artjs.SpecView.init();