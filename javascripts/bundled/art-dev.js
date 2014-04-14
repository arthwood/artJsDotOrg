var ArtJs = {
  VERSION: "2.0",
  name: "ArtJs",
  globalize: function() {
    var copy = this.ObjectUtils.copy(this);
    delete copy.globalize;
    delete copy.doInjection;
    delete copy.VERSION;
    this.ObjectUtils.copyProps(copy, window);
  },
  doInjection: function() {
    this.ArrayUtils.doInjection();
    this.ObjectUtils.doInjection();
    this.StringUtils.doInjection();
    this.DateUtils.doInjection();
    this.Selector.doInjection();
    this.ElementUtils.doInjection();
    this.Delegate.doInjection();
    this.Blind.doInjection();
  }
};

var com = {
  arthwood: {
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
  }
};

ArtJs.log = function() {
  if (console) {
    console.log(ArtJs.$A(arguments));
  }
};

ArtJs.p = ArtJs.log;

ArtJs.ObjectUtils = com.arthwood.utils.Object = {
  _name: "ObjectUtils",
  QUERY_DELIMITER: "&",
  _init: function() {
    this._invertedRemoveValueDC = ArtJs.$DC(this, this._invertedRemoveValue);
    this._eachPairDeleteValueDC = ArtJs.$DC(this, this._eachPairDeleteValue);
    this._invertedIncludesDC = ArtJs.$DC(this, this._invertedIncludes);
    this._pairToQueryStringDC = ArtJs.$DC(this, this._pairToQueryString);
    this._parseArrayValueDC = ArtJs.$DC(this, this._parseArrayValue);
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
  removeValues: function(obj, values) {
    this._invertedRemoveValueDC.delegate.args = [ obj ];
    ArtJs.ArrayUtils.eachItem(values, this._invertedRemoveValueDC);
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
    this.eachPair(obj, function(i, j) {
      if (func.call(context, j)) {
        result[i] = j;
      }
    });
    return result;
  },
  selectWithKey: function(obj, func, context) {
    var result = {};
    this.eachPair(obj, function(i, j) {
      if (func.call(context, i, j)) {
        result[i] = j;
      }
    });
    return result;
  },
  reject: function(obj, func, context) {
    var result = {};
    this.eachPair(obj, function(i, j) {
      if (!func.call(context, j)) {
        result[i] = j;
      }
    });
    return result;
  },
  isArray: function(obj) {
    return typeof obj === "object" && typeof obj.length === "number";
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
    prefix = ArtJs.StringUtils.isBlank(prefix) ? key : prefix + "[" + key + "]";
    if (typeof value == "object") {
      if (isNaN(value.length)) {
        result = this._toQueryStringWithPrefix(value, prefix);
      } else {
        this._parseArrayValueDC.delegate.args = [ prefix + "[]" ];
        result = ArtJs.ArrayUtils.map(value, this._parseArrayValueDC).join(this.QUERY_DELIMITER);
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
      delete obj[i];
    }
  },
  _invertedRemoveValue: function(val, arr, obj) {
    this.removeValue(obj, val);
  },
  doInjection: function() {
    var proto = Object.prototype;
    var dc = ArtJs.$DC;
    proto.all = dc(this, this.all, true);
    proto.copy = dc(this, this.copy, true);
    proto.copyProps = dc(this, this.copyProps, true);
    proto.each = dc(this, this.each, true);
    proto.eachPair = dc(this, this.eachPair, true);
    proto.extend = dc(this, this.extend, true);
    proto.keys = dc(this, this.keys, true);
    proto.values = dc(this, this.values, true);
    proto.includes = dc(this, this.includes, true);
    proto.includesAll = dc(this, this.includesAll, true);
    proto.isArray = dc(this, this.isArray, true);
    proto.isEmpty = dc(this, this.isEmpty, true);
    proto.isNotEmpty = dc(this, this.isNotEmpty, true);
    proto.map = dc(this, this.map, true);
    proto.mapKey = dc(this, this.mapKey, true);
    proto.mapValue = dc(this, this.mapValue, true);
    proto.merge = dc(this, this.merge, true);
    proto.removeValue = dc(this, this.removeValue, true);
    proto.removeValues = dc(this, this.removeValues, true);
    proto.reject = dc(this, this.reject, true);
    proto.select = dc(this, this.select, true);
    proto.selectWithKey = dc(this, this.selectWithKey, true);
    proto.toArray = dc(this, this.toArray, true);
    proto.toQueryString = dc(this, this.toQueryString, true);
    proto.update = dc(this, this.update, true);
  }
};

ArtJs.ArrayUtils = com.arthwood.utils.Array = {
  _name: "ArrayUtils",
  _init: function() {
    this._areItemsEqualCallback = ArtJs.$DC(this, this.areItemsEqual);
    this._invokeCallback = ArtJs.$DC(this, this._invoke);
  },
  build: function(n, func) {
    var arr = new Array(n);
    for (var i = 0; i < n; i++) {
      arr[i] = func(i);
    }
    return arr;
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
    var point = new ArtJs.Point([], []);
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
          result.push(new ArtJs.Point(group, values[group] = []));
        }
        values[group].push(item);
      }
    }
    if (!keepOrder) {
      result = ArtJs.ObjectUtils.fromPoints(result);
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
    return this.reject(arr, this.isNullLike, this);
  },
  isNullLike: function(i) {
    return i === null || i === undefined;
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
    ArtJs.p(i);
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
    return this.isNullLike(i) ? "" : i.toString();
  },
  _indexOf: function(arr, item) {
    for (var i in arr) {
      if (arr.hasOwnProperty(i) && arr[i] === item) {
        return parseInt(i);
      }
    }
    return -1;
  },
  doInjection: function() {
    var proto = Array.prototype;
    var dc = ArtJs.$DC;
    proto.all = dc(this, this.all, true);
    proto.any = dc(this, this.any, true);
    proto.beforeLast = dc(this, this.beforeLast, true);
    proto.compact = dc(this, this.compact, true);
    proto.detect = dc(this, this.detect, true);
    proto.each = dc(this, this.each, true);
    proto.eachIndex = dc(this, this.eachIndex, true);
    proto.eachItem = dc(this, this.eachItem, true);
    proto.equal = dc(this, this.equal, true);
    proto.first = dc(this, this.first, true);
    proto.flatten = dc(this, this.flatten, true);
    proto.getItem = dc(this, this.getItem, true);
    proto.includes = dc(this, this.includes, true);
    proto.includesAll = dc(this, this.includesAll, true);
    proto.inject = dc(this, this.inject, true);
    proto.insertAt = dc(this, this.insertAt, true);
    proto.intersection = dc(this, this.intersection, true);
    proto.invoke = dc(this, this.invoke, true);
    proto.isEmpty = dc(this, this.isEmpty, true);
    proto.itemsEqual = dc(this, this.itemsEqual, true);
    proto.last = dc(this, this.last, true);
    proto.map = dc(this, this.map, true);
    proto.isNotEmpty = dc(this, this.isNotEmpty, true);
    proto.numerize = dc(this, this.numerize, true);
    proto.partition = dc(this, this.partition, true);
    proto.pluck = dc(this, this.pluck, true);
    proto.print = dc(this, this.print, true);
    proto.reject = dc(this, this.reject, true);
    proto.$reject = dc(this, this.$reject, true);
    proto.removeAt = dc(this, this.removeAt, true);
    proto.removeItem = dc(this, this.removeItem, true);
    proto.second = dc(this, this.second, true);
    proto.select = dc(this, this.select, true);
    proto.$select = dc(this, this.$select, true);
    proto.selectNonEmpty = dc(this, this.selectNonEmpty, true);
    proto.stringify = dc(this, this.stringify, true);
    proto.sum = dc(this, this.sum, true);
    proto.third = dc(this, this.third, true);
    proto.transpose = dc(this, this.transpose, true);
    proto.uniq = dc(this, this.uniq, true);
  }
};

ArtJs.$A = ArtJs.ArrayUtils.arrify;

ArtJs.Class = com.arthwood.utils.Class = function(ctor, proto, stat, superclass) {
  var builder = new ArtJs.ClassBuilder(ctor, proto, stat, superclass);
  return builder.ctor;
};

ArtJs.Class._name = "Class";

ArtJs.ClassBuilder = function(ctor, proto, stat, superclass) {
  this.ctor = ctor || this._defaultConstructor();
  this.ctor._onCreated = this._defaultOnCreated;
  this.ctor._onExtended = this._defaultOnExtended;
  if (superclass) {
    var _super_ = function() {
      var ctor = arguments.callee.ctor;
      var _arguments_ = ArtJs.$A(arguments);
      var __arguments__ = _arguments_.shift();
      var _callee_ = __arguments__.callee;
      var _super_ = _callee_.superclass || _callee_.super;
      return _super_.apply(this, _arguments_.concat(ArtJs.$A(__arguments__)));
    };
    _super_.ctor = this.ctor;
    ArtJs.ObjectUtils.extend(this.ctor, superclass);
    ArtJs.ObjectUtils.extend(this.ctor.prototype, superclass.prototype);
    this.ctor.superclass = superclass;
    this.ctor.super = _super_;
    this.ctor.prototype.super = _super_;
  } else {
    this.ctor.prototype = {};
  }
  this.ctor.prototype.ctor = this.ctor;
  if (proto) {
    ArtJs.ObjectUtils.eachPair(proto, this._eachProto, this);
  }
  if (stat) {
    ArtJs.ObjectUtils.eachPair(stat, this._eachStat, this);
  }
  this.ctor._onCreated();
  if (superclass) {
    this.ctor._onExtended();
  }
};

ArtJs.ClassBuilder.prototype = {
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

ArtJs.Delegate = com.arthwood.events.Delegate = ArtJs.Class(function(object, method) {
  this.object = object;
  this.method = method;
  this.args = ArtJs.$A(arguments, 2);
}, {
  invoke: function() {
    var args = ArtJs.$A(arguments).concat(this.args);
    return this.method.apply(this.object, args);
  },
  callback: function(withSource) {
    var result = function() {
      var callee = arguments.callee;
      var delegate = callee.delegate;
      var args = ArtJs.$A(arguments);
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
  injected: false,
  callback: function(object, method, withSource) {
    var delegate = new ArtJs.Delegate(object, method);
    var callback = delegate.callback(withSource);
    delegate.args = ArtJs.$A(arguments, 3);
    return callback;
  },
  create: function(object, method) {
    var delegate = new ArtJs.Delegate(object, method);
    delegate.args = ArtJs.$A(arguments, 2);
    return delegate;
  },
  doInjection: function() {
    Function.prototype.bind = function(obj, withSource) {
      return ArtJs.$DC.apply(ArtJs.$DC, [ obj, this, withSource ].concat(ArtJs.$A(arguments, 2)));
    };
    this.injected = true;
  }
});

ArtJs.$DC = ArtJs.Delegate.callback;

ArtJs.$D = ArtJs.Delegate.create;

ArtJs.MathUtils = com.arthwood.utils.Math = {
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

ArtJs.StringUtils = com.arthwood.utils.String = {
  _name: "StringUtils",
  first: function(str) {
    return str.substr(0, 1);
  },
  last: function(str) {
    return str.substr(str.length - 1, 1);
  },
  strip: function(str) {
    return str.replace(/\s/g, "");
  },
  isBlank: function(str) {
    return str === null || str === undefined || this.isEmpty(str);
  },
  isEmpty: function(str) {
    return this.strip(str) == "";
  },
  nullifyEmpty: function(str) {
    return this.isEmpty(str) ? null : str;
  },
  toS: function(str) {
    return str || "";
  },
  countPattern: function(str, pattern) {
    return str.match(new RegExp(pattern, "g")).length;
  },
  align: function(str, n, char, left) {
    var c = this.getMultiPattern(char, n - str.length);
    return left ? str + c : c + str;
  },
  getMultiPattern: function(pattern, n) {
    var str = "";
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
    return text + (n == 1 ? "" : "s");
  },
  capitalize: function(str) {
    return ArtJs.ArrayUtils.map(str.split(" "), this.capitalizeWord).join(" ");
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
    return eval("(" + str + ")");
  },
  doInjection: function() {
    var proto = String.prototype;
    var dc = ArtJs.$DC;
    proto.align = dc(this, this.align, true);
    proto.isBlank = dc(this, this.isBlank, true);
    proto.capitalize = dc(this, this.capitalize, true);
    proto.capitalizeUnderscored = dc(this, this.capitalizeUnderscored, true);
    proto.capitalizeWord = dc(this, this.capitalizeWord, true);
    proto.countPattern = dc(this, this.countPattern, true);
    proto.first = dc(this, this.first, true);
    proto.getMultiPattern = dc(this, this.getMultiPattern, true);
    proto.isEmpty = dc(this, this.isEmpty, true);
    proto.last = dc(this, this.last, true);
    proto.nullifyEmpty = dc(this, this.nullifyEmpty, true);
    proto.singularOrPlural = dc(this, this.singularOrPlural, false);
    proto.strip = dc(this, this.strip, true);
    proto.sub = dc(this, this.sub, true);
    proto.toS = dc(this, this.toS, true);
    proto.toJson = dc(this, this.toJson, true);
    proto.truncate = dc(this, this.truncate, true);
    proto.trim = dc(this, this.trim, true);
  }
};

ArtJs.DateUtils = com.arthwood.utils.Date = {
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
    var su = ArtJs.StringUtils;
    separator = separator || ":";
    return su.addZeros(date.getHours().toString(), 2, false) + separator + su.addZeros(date.getMinutes().toString(), 2, false) + separator + su.addZeros(date.getSeconds().toString(), 2, false);
  },
  toYMD: function(date, separator) {
    var su = ArtJs.StringUtils;
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
    var au = ArtJs.ArrayUtils;
    return new Date(parseInt(au.first(arr), 10), parseInt(au.second(arr), 10) - 1, parseInt(au.third(arr), 10));
  },
  fromDMY: function(str, separator) {
    separator = separator || "-";
    var arr = str.split(separator);
    var au = ArtJs.ArrayUtils;
    return new Date(parseInt(au.third(arr), 10), parseInt(au.second(arr), 10) - 1, parseInt(au.first(arr), 10));
  },
  minutesToHM: function(minutes, separator) {
    separator = separator || ":";
    return Math.floor(minutes / 60) + separator + ArtJs.StringUtils.addZeros((minutes % 60).toString(), 2);
  },
  hmToMinutes: function(hm, separator) {
    separator = separator || ":";
    var arr = hm.split(separator);
    return 60 * parseInt(arr[0], 10) + parseInt(arr[1], 10);
  },
  secondsToMS: function(s, separator) {
    var seconds = s % 60;
    var minutes = (s - seconds) / 60;
    var su = ArtJs.StringUtils;
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
    return this.minutesToHM(minutes, separator) + separator + ArtJs.StringUtils.addZeros(seconds.toString(), 2);
  },
  miliToHMSM: function(v) {
    var mili = v % 1e3;
    var totalSeconds = (v - mili) / 1e3;
    var seconds = totalSeconds % 60;
    var totalMinutes = (totalSeconds - seconds) / 60;
    var minutes = totalMinutes % 60;
    var totalHours = (totalMinutes - minutes) / 60;
    var hours = totalHours;
    return hours.toString() + ":" + ArtJs.StringUtils.addZeros(minutes.toString(), 2) + ":" + ArtJs.StringUtils.addZeros(seconds.toString(), 2) + "." + ArtJs.StringUtils.addZeros(mili.toString(), 3);
  },
  miliToMSM: function(v) {
    var mili = v % 1e3;
    var totalSeconds = (v - mili) / 1e3;
    var seconds = totalSeconds % 60;
    var totalMinutes = (totalSeconds - seconds) / 60;
    var minutes = totalMinutes;
    return minutes.toString() + ":" + ArtJs.StringUtils.addZeros(seconds.toString(), 2) + "." + ArtJs.StringUtils.addZeros(mili.toString(), 3);
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
  },
  doInjection: function() {
    var proto = Date.prototype;
    var dc = ArtJs.$DC;
    proto.monthDaysNum = dc(this, this.monthDaysNum, true);
    proto.firstDay = dc(this, this.firstDay, true);
    proto.toHMS = dc(this, this.toHMS, true);
    proto.toYMD = dc(this, this.toYMD, true);
    proto.toDMY = dc(this, this.toDMY, true);
    proto.minutesToHM = dc(this, this.minutesToHM, false);
    proto.hmToMinutes = dc(this, this.hmToMinutes, false);
    proto.secondsToMS = dc(this, this.secondsToMS, false);
    proto.copy = dc(this, this.copy, true);
    proto.getDateShifted = dc(this, this.getDateShifted, true);
    proto.stripDayTime = dc(this, this.stripDayTime, true);
  }
};

ArtJs.ElementUtils = com.arthwood.utils.Element = {
  HIDDEN_ELEMENTS: [],
  DEFAULT_DISPLAY: "",
  MAIN_OBJ_RE: /^\w+/,
  SUB_OBJ_RE: /\[\w+\]/g,
  SIZE_STYLE_RE: /^(\d+)px$/,
  BROWSERS_STYLES: [ "", "-o-", "-ms-", "-moz-", "-khtml-", "-webkit-" ],
  _init: function() {
    this.detectHiddenElementDC = ArtJs.$DC(this, this.detectHiddenElement);
    ArtJs.$insert = ArtJs.$DC(this, this.insert);
  },
  show: function(e) {
    var hidden = this.getHidden(e);
    ArtJs.ArrayUtils.removeItem(this.HIDDEN_ELEMENTS, hidden);
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
    return ArtJs.ArrayUtils.detect(this.HIDDEN_ELEMENTS, this.detectHiddenElementDC);
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
    var layout = new ArtJs.Rectangle(b.left, b.top, b.right, b.bottom);
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
    ArtJs.ObjectUtils.extend(e.style, style);
  },
  transitionStyle: function(prop, duration, type, delay) {
    return this._effectStyle(new ArtJs.Point("transition", this._getTransitionStyleValue(prop, duration, type, delay)));
  },
  _getTransitionStyleValue: function(prop, duration, type, delay) {
    return [ prop, duration + "s", type, delay + "s" ].join(" ");
  },
  _effectStyle: function(data) {
    this._browserMap.data = data;
    return ArtJs.ObjectUtils.fromArray(ArtJs.ArrayUtils.map(this.BROWSERS_STYLES, this._browserMap, this));
  },
  _browserMap: function(browser) {
    var data = arguments.callee.data;
    return [ browser + data.x, data.y ];
  },
  getSizeStyle: function(e, prop) {
    return this.getSizeStyleValue(this.getStyle(e, prop));
  },
  getSizeStyleValue: function(value) {
    var v = value.match(this.SIZE_STYLE_RE);
    return v && Number(v[1]) || 0;
  },
  children: function(e) {
    return ArtJs.$A(e.childNodes);
  },
  elements: function(e) {
    return this.filterElements(this.children(e));
  },
  filterElements: function(items) {
    return ArtJs.ArrayUtils.select(items, this.isElement, this);
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
    return ArtJs.ArrayUtils.first(this.elements(e));
  },
  lastElement: function(e) {
    return ArtJs.ArrayUtils.last(this.elements(e));
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
    var first = ArtJs.ArrayUtils.first(this.children(ref));
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
    var s = ArtJs.Selector;
    var au = ArtJs.ArrayUtils;
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
    var main = ArtJs.ArrayUtils.first(name.match(this.MAIN_OBJ_RE));
    var subobjectMatches = name.match(this.SUB_OBJ_RE);
    var props = subobjectMatches && ArtJs.ArrayUtils.map(ArtJs.$A(subobjectMatches), this.mapSub, this) || [];
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
    return ArtJs.StringUtils.sub(i, 1, -1);
  },
  getContent: function(e) {
    return e.innerHTML;
  },
  setContent: function(e, v) {
    e.innerHTML = v;
  },
  hasClass: function(e, className) {
    return ArtJs.ArrayUtils.includes(this.getClasses(e), className);
  },
  getClasses: function(e) {
    var className = ArtJs.StringUtils.trim(e.className);
    return ArtJs.StringUtils.isBlank(className) ? [] : className.split(" ");
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
      ArtJs.ArrayUtils.removeItem(classes, className);
      e.className = classes.join(" ");
    }
  },
  toggleClass: function(e, className) {
    this.setClass(e, className, !this.hasClass(e, className));
  },
  getAttributes: function(e) {
    return ArtJs.ObjectUtils.fromArray(ArtJs.ArrayUtils.map(ArtJs.$A(e.attributes), this.mapAttribute, this));
  },
  mapAttribute: function(i) {
    return [ i.name, i.value ];
  },
  setAlpha: function(e, v) {
    e.style.opacity = v;
    e.style.filter = "alpha(opacity=" + 100 * v + ")";
  },
  getAlpha: function(e) {
    if (e.style.filter) {
      var re = /alpha\(opacity=(\d+(\.\d+)?)\)/;
      return Number(ArtJs.ArrayUtils.second(e.style.filter.match(re)));
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
    return new ArtJs.Rectangle(this.getSizeStyle(e, "padding-left") || this.getSizeStyle(e, "paddingLeft"), this.getSizeStyle(e, "padding-top") || this.getSizeStyle(e, "paddingTop"), this.getSizeStyle(e, "padding-right") || this.getSizeStyle(e, "paddingRight"), this.getSizeStyle(e, "padding-bottom") || this.getSizeStyle(e, "paddingBottom"));
  },
  getDocumentSize: function() {
    var doc = window.document;
    var body = doc.body;
    return new ArtJs.Point(body.clientWidth || doc.width, body.clientHeight || doc.height);
  },
  getWindowSize: function() {
    var de = document.documentElement;
    return new ArtJs.Point(de.clientWidth || window.innerWidth, de.clientHeight || window.innerHeight);
  },
  getScrollPosition: function() {
    var de = document.documentElement;
    return new ArtJs.Point(de.scrollLeft || window.scrollX, de.scrollTop || window.scrollY);
  },
  onClick: function(e, delegate) {
    return ArtJs.on(e, "click", delegate);
  },
  toString: function(e) {
    var classes = this.getClasses(e);
    var attr = this.getAttributes(e);
    delete attr["id"];
    delete attr["class"];
    return this.toTagString(e) + this.toIdString(e) + ArtJs.ArrayUtils.map(classes, this.toClassString).join("") + ArtJs.ObjectUtils.map(attr, this.toAttrString).join("");
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
  },
  doInjection: function() {
    var proto = Element.prototype;
    var dc = ArtJs.$DC;
    proto.addClass = dc(this, this.addClass, true);
    proto.center = dc(this, this.center, true);
    proto.centerH = dc(this, this.centerH, true);
    proto.centerV = dc(this, this.centerV, true);
    proto.clone = dc(this, this.clone, true);
    proto.disable = dc(this, this.disable, true);
    proto.elements = dc(this, this.elements, true);
    proto.enable = dc(this, this.enable, true);
    proto.extendStyle = dc(this, this.extendStyle, true);
    proto.firstElement = dc(this, this.firstElement, true);
    proto.getAlpha = dc(this, this.getAlpha, true);
    proto.getAttributes = dc(this, this.getAttributes, true);
    proto.getBounds = dc(this, this.getBounds, true);
    proto.getClasses = dc(this, this.getClasses, true);
    proto.getContent = dc(this, this.getContent, true);
    proto.getPadding = dc(this, this.getPadding, true);
    proto.getPosition = dc(this, this.getPosition, true);
    proto.getSize = dc(this, this.getSize, true);
    proto.getStyle = dc(this, this.getStyle, true);
    proto.hasClass = dc(this, this.hasClass, true);
    proto.hide = dc(this, this.hide, true);
    proto.insert = dc(this, this.insert, true);
    proto.isElement = dc(this, this.isElement, true);
    proto.isHidden = dc(this, this.isHidden, true);
    proto.lastElement = dc(this, this.lastElement, true);
    proto.next = dc(this, this.next, true);
    proto.onClick = dc(this, this.onClick, true);
    proto.parent = dc(this, this.parent, true);
    proto.prev = dc(this, this.prev, true);
    proto.putAtBottom = dc(this, this.putAtBottom, true);
    proto.putAtTop = dc(this, this.putAtTop, true);
    proto.putAfter = dc(this, this.putAfter, true);
    proto.putBefore = dc(this, this.putBefore, true);
    proto.remove = dc(this, this.remove, true);
    proto.removeClass = dc(this, this.removeClass, true);
    proto.removeStyle = dc(this, this.removeStyle, true);
    proto.replace = dc(this, this.replace, true);
    proto.show = dc(this, this.show, true);
    proto.serialize = dc(this, this.serialize, true);
    proto.setAlpha = dc(this, this.setAlpha, true);
    proto.setClass = dc(this, this.setClass, true);
    proto.setContent = dc(this, this.setContent, true);
    proto.setEnabled = dc(this, this.setEnabled, true);
    proto.setHeight = dc(this, this.setHeight, true);
    proto.setPosition = dc(this, this.setPosition, true);
    proto.setStyle = dc(this, this.setStyle, true);
    proto.setVisible = dc(this, this.setVisible, true);
    proto.setWidth = dc(this, this.setWidth, true);
    proto.setX = dc(this, this.setX, true);
    proto.setY = dc(this, this.setY, true);
    proto.toggle = dc(this, this.toggle, true);
    proto.toggleClass = dc(this, this.toggleClass, true);
  }
};

ArtJs.Toggler = com.arthwood.utils.Toggler = ArtJs.Class(function(unique) {
  this.unique = unique;
  this.current = null;
  this.onActivate = new ArtJs.CustomEvent("Toggler::onActivate");
  this.onDeactivate = new ArtJs.CustomEvent("Toggler::onDeactivate");
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

ArtJs.ClassToggler = com.arthwood.utils.ClassToggler = ArtJs.Class(function(className) {
  this._className = className;
  this._toggler = new ArtJs.Toggler;
  this._toggler.onActivate.add(ArtJs.$D(this, this._onActivate));
  this._toggler.onDeactivate.add(ArtJs.$D(this, this._onDeactivate));
  this.onActivate = new ArtJs.CustomEvent("ClassToggler::onActivate");
  this.onDeactivate = new ArtJs.CustomEvent("ClassToggler::onDeactivate");
}, {
  toggle: function(item) {
    this._toggler.toggle(item);
  },
  getCurrent: function() {
    return this._toggler.current;
  },
  _onActivate: function(t) {
    if (t.current) ArtJs.ElementUtils.addClass(t.current, this._className);
    this.onActivate.fire(this);
  },
  _onDeactivate: function(t) {
    if (t.current) ArtJs.ElementUtils.removeClass(t.current, this._className);
    this.onDeactivate.fire(this);
  }
}, {
  _name: "ClassToggler"
});

ArtJs.Locator = com.arthwood.module.Locator = {
  register: function(object) {
    object.instances = [];
    ArtJs.ObjectUtils.extend(object, this.extensions);
  },
  extensions: {
    find: function(i) {
      this.identifier = i;
      return ArtJs.ArrayUtils.detect(this.instances, this.found, this);
    },
    found: function(i) {
      return i.getIdentifier() == this.identifier;
    }
  }
};

ArtJs.DelegateCollection = com.arthwood.events.DelegateCollection = ArtJs.Class(function(items) {
  this._items = items || [];
}, {
  invoke: function() {
    this._args = ArtJs.$A(arguments);
    return ArtJs.ArrayUtils.map(this._items, this._delegateToResult, this);
  },
  add: function(delegate) {
    this._items.push(delegate);
  },
  removeAt: function(i) {
    ArtJs.ArrayUtils.removeAt(this._items, i);
  },
  remove: function(delegate) {
    ArtJs.ArrayUtils.removeItem(this._items, delegate);
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

ArtJs.CustomEvent = com.arthwood.events.CustomEvent = ArtJs.Class(function(name) {
  this.name = name;
  this.collection = new ArtJs.DelegateCollection;
}, {
  fire: function() {
    return this.collection.invoke.apply(this.collection, ArtJs.$A(arguments));
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

ArtJs.Point = com.arthwood.math.Point = function(x, y) {
  this.x = x;
  this.y = y;
};

ArtJs.Point.prototype = {
  getLength: function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  },
  dot: function(p) {
    return this.x * p.x + this.y * p.y;
  },
  add: function(p) {
    return new ArtJs.Point(this.x + p.x, this.y + p.y);
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
    return new ArtJs.Point(this.y, this.x);
  },
  reverse: function() {
    this.reverseX();
    this.reverseY();
    return this;
  },
  times: function(k) {
    return new ArtJs.Point(k * this.x, k * this.y);
  },
  toString: function() {
    return "[" + this.x + ", " + this.y + "]";
  }
};

ArtJs.Rectangle = com.arthwood.math.Rectangle = function(left, top, right, bottom) {
  this.left = left;
  this.top = top;
  this.right = right;
  this.bottom = bottom;
};

ArtJs.Rectangle.prototype = {
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
    return new ArtJs.Point(this.left, this.top);
  },
  getRightTop: function() {
    return new ArtJs.Point(this.right, this.top);
  },
  getRightBottom: function() {
    return new ArtJs.Point(this.right, this.bottom);
  },
  getLeftBottom: function() {
    return new ArtJs.Point(this.left, this.bottom);
  },
  getSize: function() {
    return new ArtJs.Point(this.getWidth(), this.getHeight());
  },
  moveBy: function(p) {
    this.left += p.x;
    this.top += p.y;
    this.right += p.x;
    this.bottom += p.y;
  }
};

ArtJs.Component = com.arthwood.dom.Component = ArtJs.Class(function(element) {
  this.element = element;
}, {
  onDependency: function() {}
}, {
  _name: "Component",
  dependsOn: function() {
    this.dependees = ArtJs.$A(arguments);
    ArtJs.ArrayUtils.each(this.dependees, this._eachDependee, this);
  },
  _onExtended: function() {
    this.super(arguments);
    this.instances = [];
    this.dependants = [];
  },
  _init: function() {
    var clock = new ArtJs.Clock(2e3);
    clock.onChange.add(ArtJs.$D(this, this._onSweep));
    clock.start();
  },
  _onSweep: function(clock) {
    ArtJs.ArrayUtils.each(this.subclasses, this._sweepInstances, this);
  },
  _sweepInstances: function(i) {
    ArtJs.ArrayUtils.$select(i.instances, this._isOnStage, this);
  },
  _isOnStage: function(i) {
    return ArtJs.Selector.isDescendantOf(i.element);
  },
  _eachDependee: function(i) {
    i.dependants.push(this);
  },
  _scan: function(element) {
    ArtJs.ArrayUtils.each(ArtJs.$find(element, ".art"), this._onFound, this);
  },
  _onFound: function(i) {
    this._element = i;
    var classnames = ArtJs.ElementUtils.getClasses(i);
    ArtJs.ArrayUtils.removeItem(classnames, "art");
    ArtJs.ArrayUtils.each(classnames, this._eachClassName, this);
  },
  _eachClassName: function(i) {
    var path = i.split("-");
    var _class = ArtJs.ArrayUtils.inject(path, window, this._injectPathChunk, this);
    if (_class instanceof Function) {
      this._create(_class);
    }
  },
  _create: function(_class) {
    var instance = new _class(this._element);
    _class.instances.push(instance);
    this._eachDependeeInstance.instance = instance;
    ArtJs.ArrayUtils.each(ArtJs.ArrayUtils.flatten(ArtJs.ArrayUtils.map(_class.dependees, this._toInstances, this)), this._eachDependeeInstance, this);
    this._eachDependantInstance.instance = instance;
    ArtJs.ArrayUtils.each(ArtJs.ArrayUtils.flatten(ArtJs.ArrayUtils.map(_class.dependants, this._toInstances, this)), this._eachDependantInstance, this);
  },
  _toInstances: function(i) {
    return i.instances;
  },
  _eachDependeeInstance: function(i) {
    var instance = arguments.callee.instance;
    instance.onDependency(i);
  },
  _eachDependantInstance: function(i) {
    var instance = arguments.callee.instance;
    i.onDependency(instance);
  },
  _injectPathChunk: function(result, i) {
    return result && result[i];
  }
});

ArtJs.ElementBuilder = com.arthwood.dom.ElementBuilder = ArtJs.Class(function(name, attributes, value, isEmpty) {
  this.name = name;
  this.attributes = attributes;
  this.value = value;
  this.isEmpty = Boolean(isEmpty);
}, {
  toString: function() {
    var attributes = this.attributes && ArtJs.ObjectUtils.isNotEmpty(this.attributes) ? " " + this.ctor._attributesString(this.attributes) + " " : "";
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
    ArtJs.ObjectUtils.eachPair(this.attributes, sa);
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
  _init: function() {
    ArtJs.$B = ArtJs.$DC(this, this.build);
    ArtJs.$C = ArtJs.$DC(this, this.create);
    ArtJs.$E = ArtJs.$DC(this, this.getElement);
    ArtJs.$P = ArtJs.$DC(this, this.parse);
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
    return this.parse(this.build(name, attributes, value, empty));
  },
  getElement: function(name, attributes, value, empty) {
    return this.build(name, attributes, value, empty).getElement();
  },
  getCollection: function(n, element) {
    this._getElement.element = element;
    return ArtJs.ArrayUtils.build(n, this._getElement).join("");
  },
  _getElement: function(i) {
    return arguments.callee.element;
  },
  _attributesString: function(attrs) {
    return ArtJs.ArrayUtils.map(ArtJs.ObjectUtils.toArray(attrs), this._attributePairToString, this).join(" ");
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

ArtJs.Selector = com.arthwood.dom.Selector = {
  _init: function() {
    ArtJs.$ = ArtJs.$DC(this, this.getElements);
    ArtJs.$find = ArtJs.$DC(this, this.find);
    ArtJs.$parent = ArtJs.$DC(this, this.parent);
  },
  find: function(element, selector) {
    return this.getElements(selector, element);
  },
  first: function(element, selector) {
    return ArtJs.ArrayUtils.first(this.find(element, selector));
  },
  last: function(element, selector) {
    return ArtJs.ArrayUtils.last(this.find(element, selector));
  },
  parent: function(element, selector) {
    this._signature = new ArtJs.Signature(selector || "");
    return ArtJs.ArrayUtils.detect(this._getDescendants(element), this._signature.checkNode, this._signature);
  },
  getElements: function(selector, element) {
    this._root = element;
    var elements = this._findBySignature(new ArtJs.Signature(selector));
    var descendants = ArtJs.ArrayUtils.map(elements, this._elementToDescendants, this);
    descendants = ArtJs.ArrayUtils.select(descendants, this._hasElementDescendants, this);
    return ArtJs.ArrayUtils.pluck(descendants, "x");
  },
  isDescendantOf: function(element, root) {
    var descendants = this._getDescendants(element, root);
    return !ArtJs.ArrayUtils.isEmpty(descendants);
  },
  isSelfOrDescendantOf: function(element, root) {
    return element == root || this.isDescendantOf(element, root);
  },
  getElementById: function(v) {
    return document.getElementById(v);
  },
  getElementsByTagName: function(v) {
    return ArtJs.$A(document.getElementsByTagName(v));
  },
  getElementsByClassName: function(v) {
    return document.getElementsByClassName ? ArtJs.$A(document.getElementsByClassName(v)) : this._findByClassName(v);
  },
  _elementToDescendants: function(element) {
    return new ArtJs.Point(element, this._toDescendants(element));
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
      if (ArtJs.ArrayUtils.isEmpty(elementsByTag)) {
        return [];
      } else {
        if (ArtJs.ArrayUtils.isEmpty(elements)) {
          elements = elementsByTag;
        } else {
          elements = ArtJs.ArrayUtils.intersection([ elements, elementsByTag ]);
          if (ArtJs.ArrayUtils.isEmpty(elements)) {
            return [];
          }
        }
      }
    }
    if (!ArtJs.ArrayUtils.isEmpty(signature.classes)) {
      var elementsByClass = this._findByClassNames(signature.classes);
      if (ArtJs.ArrayUtils.isEmpty(elementsByClass)) {
        return [];
      }
      if (ArtJs.ArrayUtils.isEmpty(elements)) {
        elements = elementsByClass;
      } else {
        elements = ArtJs.ArrayUtils.intersection([ elements, elementsByClass ]);
        if (ArtJs.ArrayUtils.isEmpty(elements)) {
          return [];
        }
      }
    }
    this._filterByAttributes.attributes = signature.attributes;
    return ArtJs.ArrayUtils.compact(ArtJs.ArrayUtils.select(elements, this._filterByAttributes, this));
  },
  _findByClassNames: function(v) {
    return ArtJs.ArrayUtils.intersection(ArtJs.ArrayUtils.map(v, this.getElementsByClassName, this));
  },
  _elementHasClassName: function(e) {
    return ArtJs.ElementUtils.hasClass(e, arguments.callee.className);
  },
  _filterByAttributes: function(i) {
    var attributes = arguments.callee.attributes;
    return ArtJs.ObjectUtils.includesAll(ArtJs.ElementUtils.getAttributes(i), attributes);
  },
  _findByClassName: function(v) {
    var elements = ArtJs.ElementUtils.filterElements(ArtJs.$A(document.all));
    this._elementHasClassName.className = v;
    return ArtJs.ArrayUtils.select(elements, this._elementHasClassName);
  },
  doInjection: function() {
    var proto = Element.prototype;
    var dc = ArtJs.$DC;
    proto.find = dc(this, this.find, true);
    proto.first = dc(this, this.first, true);
    proto.getElementById = dc(this, this.getElementById, true);
    proto.getElementsByTagName = dc(this, this.getElementsByTagName, true);
    proto.getElementsByClassName = dc(this, this.getElementsByClassName, true);
    proto.isDescendantOf = dc(this, this.isDescendantOf, true);
    proto.last = dc(this, this.last, true);
    proto.parent = dc(this, this.parent, true);
    proto.isSelfOrDescendantOf = dc(this, this.isSelfOrDescendantOf, true);
  }
};

ArtJs.Signature = com.arthwood.dom.Signature = ArtJs.Class(function(selector) {
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
    return (!this.tag || e.tagName.toLowerCase() == this.tag) && (!this.id || e.id == this.id) && this._checkInclusion(ArtJs.ArrayUtils, this.classes, e.className.split(" ")) && this._checkInclusion(ArtJs.ObjectUtils, this.attributes, e.attributes);
  },
  _checkInclusion: function(utils, object, subset) {
    return utils.isEmpty(object) || ArtJs.ArrayUtils.includesAll(subset, object);
  },
  _getTag: function() {
    var matches = this._selector.match(this._tagRE);
    return matches && ArtJs.ArrayUtils.first(matches);
  },
  _getId: function() {
    var match = ArtJs.ArrayUtils.first(this._match(this._selector, this._idRE));
    return match && this._stripIdSelector(match);
  },
  _getClasses: function() {
    return ArtJs.ArrayUtils.map(this._match(this._selector, this._classesRE), this._stripClassSelector, this);
  },
  _getAttributes: function() {
    var matches = ArtJs.ArrayUtils.map(this._match(this._selector, this._attrsRE), this._stripAttributeSelector, this);
    var arr = ArtJs.ArrayUtils.map(matches[0] && matches[0].split(",") || [], this._attrToArray, this);
    return ArtJs.ObjectUtils.fromArray(arr);
  },
  _match: function(str, re) {
    var matches = str.match(re);
    return matches && ArtJs.$A(matches) || [];
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

ArtJs.Ajax = com.arthwood.net.Ajax = ArtJs.Class(function(url, data, method) {
  this._onReadyStateChangeDC = ArtJs.$DC(this, this._onReadyStateChange, true);
  this._onProgressDC = ArtJs.$DC(this, this._onProgress, true);
  this._onErrorDC = ArtJs.$DC(this, this._onError, true);
  this.onSuccess = new ArtJs.CustomEvent("Ajax:onSuccess");
  this.onFailure = new ArtJs.CustomEvent("Ajax:onFailure");
  this.onProgress = new ArtJs.CustomEvent("Ajax:onProgress");
  var methods = ArtJs.Ajax.Methods;
  this.url = url;
  this.data = data;
  this.method = method;
  this.requestData = data;
  this.requestMethod = method || methods.GET;
  if (!ArtJs.ArrayUtils.includes(ArtJs.Ajax.SupportedMethods, this.requestMethod)) {
    this.requestData = this.requestData || {};
    this.requestData._method = this.requestMethod;
    this.requestMethod = methods.POST;
  }
  this._request = new XMLHttpRequest;
  this.requestUrl = this.url;
  if (this.requestData) {
    this.requestQueryData = ArtJs.ObjectUtils.toQueryString(this.requestData);
    if (this.requestMethod == methods.GET) {
      this.requestUrl += "?" + this.requestQueryData;
      this.requestQueryData = null;
    }
  }
  this._request.open(this.requestMethod, this.requestUrl, true);
  this.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  this.setRequestHeader("X-ArtJs-Version", ArtJs.VERSION);
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
    if (this.getReadyState() == ArtJs.Ajax.ReadyState.LOADED) {
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
    return ArtJs.Ajax.request(url, data, ArtJs.Ajax.Methods.GET, onSuccess);
  },
  post: function(url, data, onSuccess) {
    return ArtJs.Ajax.request(url, data, ArtJs.Ajax.Methods.POST, onSuccess);
  },
  put: function(url, data, onSuccess) {
    return ArtJs.Ajax.request(url, data, ArtJs.Ajax.Methods.PUT, onSuccess);
  },
  del: function(url, data, onSuccess) {
    return ArtJs.Ajax.request(url, data, ArtJs.Ajax.Methods.DELETE, onSuccess);
  },
  request: function(url, data, method, onSuccess) {
    var ajax = new ArtJs.Ajax(url, data, method);
    if (onSuccess) {
      ajax.onSuccess.add(onSuccess);
    }
    ajax.request();
    return ajax;
  }
});

ArtJs.Ajax.SupportedMethods = [ ArtJs.Ajax.Methods.GET, ArtJs.Ajax.Methods.POST ];

ArtJs.$get = ArtJs.Ajax.get;

ArtJs.$post = ArtJs.Ajax.post;

ArtJs.$put = ArtJs.Ajax.put;

ArtJs.$del = ArtJs.Ajax.del;

ArtJs.List = com.arthwood.data.List = ArtJs.Class(function(items) {
  this.items = items || {};
  this.i = 0;
  this.onChange = new ArtJs.CustomEvent("List::onChange");
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
      this.items = ArtJs.ArrayUtils.insertAt(this.items, position, item);
      if (!noEvent) {
        this.onChange.fire(this);
      }
    }
    return this.getLength();
  },
  removeItem: function(item, onlyFirst, noEvent) {
    ArtJs.ArrayUtils.removeItem(this.items, item, onlyFirst);
    if (!noEvent) {
      this.onChange.fire(this);
    }
    return this.getLength();
  },
  removeItemAt: function(position, noEvent) {
    ArtJs.ArrayUtils.removeAt(this.items, position);
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
    position = this.loop ? ArtJs.MathUtils.sawtooth(position, 0, this.getLength()) : position;
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
    return ArtJs.ArrayUtils.includes(this.items, item);
  },
  setPointerAtItem: function(item) {
    if (!this.hasItem(item)) {
      ArtJs.p("{List} There is no item " + item + " in List!");
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
    return ArtJs.ArrayUtils.first(this.items);
  },
  getLast: function() {
    return ArtJs.ArrayUtils.last(this.items);
  },
  isEmpty: function() {
    return ArtJs.ArrayUtils.isEmpty(this.items);
  },
  isLast: function() {
    return this.i == this.getLength() - 1;
  },
  toString: function() {
    return this.items.toString();
  }
});

ArtJs.Model = com.arthwood.data.Model = ArtJs.Class();

ArtJs.Queue = com.arthwood.data.Queue = ArtJs.Class(function(data) {
  this.onChange = new ArtJs.CustomEvent("Queue::onChange");
  this.list = new ArtJs.List(data);
  this.list.onChange.add(ArtJs.$D(this, this._onChange));
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
    this.list = new ArtJs.List(data);
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

ArtJs.Clock = com.arthwood.events.Clock = ArtJs.Class(function(interval, repeat) {
  this._interval = interval;
  this._repeat = repeat;
  this._id = null;
  this._counter = 0;
  this._tickDC = ArtJs.$DC(this, this._tick);
  this.onChange = new ArtJs.CustomEvent("Clock:onChange");
  this.onComplete = new ArtJs.CustomEvent("Clock:onComplete");
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

ArtJs.ElementEvent = com.arthwood.events.Element = ArtJs.Class(function(element, name, delegate) {
  this.element = element;
  this.delegate = delegate;
  var on = ArtJs.$DC(this, this._on, false);
  if (element.addEventListener) {
    element.addEventListener(name, on, false);
  } else {
    element.attachEvent("on" + name, on);
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
  _on: function(e) {
    this.delegate.invoke(e, this);
  }
});

ArtJs.MouseEvent = com.arthwood.events.Mouse = ArtJs.Class(function(element, name, delegate, on) {
  this.super(arguments, element, name, delegate);
  this.over = false;
  this.on = on;
}, {
  _on: function(e) {
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
    var s = ArtJs.Selector;
    return t == ct && !s.isDescendantOf(rt, ct) || s.isDescendantOf(t, ct) && !s.isSelfOrDescendantOf(rt, ct);
  }
}, null, ArtJs.ElementEvent);

ArtJs.ClickEvent = com.arthwood.events.Click = ArtJs.Class(function(element, delegate) {
  this.super(arguments, element, "click", delegate);
}, null, null, ArtJs.ElementEvent);

ArtJs.MouseMoveEvent = com.arthwood.events.MouseMove = ArtJs.Class(function(element, delegate) {
  this.super(arguments, element, "mousemove", delegate);
}, null, null, ArtJs.ElementEvent);

ArtJs.MouseOverEvent = com.arthwood.events.MouseOver = ArtJs.Class(function(element, delegate) {
  this.super(arguments, element, "mouseover", delegate, true);
}, null, null, ArtJs.MouseEvent);

ArtJs.MouseOutEvent = com.arthwood.events.MouseOut = ArtJs.Class(function(element, delegate) {
  this.super(arguments, element, "mouseout", delegate, false);
}, null, null, ArtJs.MouseEvent);

ArtJs.EventMapping = {
  mousemove: ArtJs.MouseMoveEvent,
  mouseover: ArtJs.MouseOverEvent,
  mouseout: ArtJs.MouseOutEvent,
  click: ArtJs.ClickEvent
};

ArtJs.on = function(target, eventName, delegate) {
  return new ArtJs.EventMapping[eventName](target, delegate);
};

ArtJs.Timeline = com.arthwood.events.Timeline = ArtJs.Class(null, {
  mark: function() {
    this._t2 = ArtJs.DateUtils.getTime();
    var interval = this._t2 - (this._t1 || this._t2);
    this._t1 = this._t2;
    return interval;
  }
});

ArtJs.Timeout = com.arthwood.events.Timeout = ArtJs.Class(function(delay) {
  this._delay = delay;
  this._onTimeoutDC = ArtJs.$DC(this, this._onTimeout);
  this.onComplete = new ArtJs.CustomEvent("Timeout:onComplete");
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
  }
});

ArtJs.Blind = com.arthwood.transition.Blind = {
  EASE_IN_OUT: "ease-in-out",
  blindToggle: function(e, value, duration, type, delay) {
    this.blindTo(e, e.style.height == "0px" ? value : 0, duration, type, delay);
  },
  blindTo: function(e, value, duration, type, delay) {
    var eu = ArtJs.ElementUtils;
    var baseStyle = {
      overflow: "hidden",
      height: value + "px"
    };
    var effectStyle = eu.transitionStyle("height", duration || .4, type || this.EASE_IN_OUT, delay || 0);
    eu.extendStyle(e, baseStyle);
    eu.extendStyle(e, effectStyle);
  },
  doInjection: function() {
    var proto = Element.prototype;
    proto.blindToggle = ArtJs.$DC(this, this.blindToggle, true);
    proto.blindTo = ArtJs.$DC(this, this.blindTo, true);
  }
};

ArtJs.BaseMatcher = com.arthwood.spec.matchers.Base = ArtJs.Class(function(expected, toText) {
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

ArtJs.AMatcher = com.arthwood.spec.matchers.A = ArtJs.Class(function(expected) {
  this.super(arguments, expected);
}, {
  resolve: function(actual) {
    return typeof actual.value === this.expected;
  }
}, null, ArtJs.BaseMatcher);

function beA(expected) {
  return new ArtJs.AMatcher(expected);
}

ArtJs.EqMatcher = com.arthwood.spec.matchers.Eq = ArtJs.Class(function(expected) {
  this.super(arguments, expected, "equal");
}, {
  resolve: function(actual) {
    if (ArtJs.ObjectUtils.isArray(actual.value)) {
      return ArtJs.ArrayUtils.equal([ actual.value, this.expected ]);
    } else {
      return this.super(arguments, actual);
    }
  }
}, null, ArtJs.BaseMatcher);

function eq(expected) {
  return new ArtJs.EqMatcher(expected);
}

ArtJs.FalseMatcher = com.arthwood.spec.matchers.False = ArtJs.Class(function() {
  this.super(arguments, false);
}, null, null, ArtJs.BaseMatcher);

function beFalse() {
  return new ArtJs.FalseMatcher;
}

ArtJs.NullMatcher = com.arthwood.spec.matchers.Null = ArtJs.Class(function() {
  this.super(arguments, null);
}, null, null, ArtJs.BaseMatcher);

function beNull() {
  return new ArtJs.NullMatcher;
}

ArtJs.ReceiveMatcher = com.arthwood.spec.matchers.Receive = ArtJs.Class(function(expected) {
  this.super(arguments, expected, "receive");
}, {
  resolve: function(actual) {
    this.receiver = new ArtJs.SpecReceiver(this, actual);
    runner.receivers.push(this.receiver);
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
    return "(" + (this.receiver.isInSeries() ? ArtJs.ArrayUtils.map(args, this._mapArgs, this) : args).join(", ") + ")";
  }
}, null, ArtJs.BaseMatcher);

function receive(expected) {
  return new ArtJs.ReceiveMatcher(expected);
}

ArtJs.TrueMatcher = com.arthwood.spec.matchers.True = ArtJs.Class(function() {
  this.super(arguments, true);
}, null, null, ArtJs.BaseMatcher);

function beTrue() {
  return new ArtJs.TrueMatcher;
}

ArtJs.Actual = com.arthwood.spec.Actual = ArtJs.Class(function(value) {
  this.value = value;
}, {
  to: function(matcher) {
    var value = matcher.resolve(this);
    if (typeof value == "boolean") {
      runner.pushResult(new ArtJs.SpecResult(this, matcher, value));
    }
    return value;
  }
});

function expect(value) {
  return new ArtJs.Actual(value);
}

ArtJs.Mock = com.arthwood.spec.Mock = ArtJs.Class(function() {}, {
  toString: function() {
    return "mock";
  }
});

function mock() {
  return new ArtJs.Mock;
}

ArtJs.SpecNode = com.arthwood.spec.Node = ArtJs.Class(function(facet, body) {
  this.facet = facet;
  this.body = body;
}, {
  execute: function() {
    runner.path.push(this);
    this.body();
    runner.path.pop();
  }
});

ArtJs.Spec = ArtJs.Class(null, {
  execute: function() {
    runner.subject = this.facet;
    this.super(arguments);
  }
}, null, ArtJs.SpecNode);

ArtJs.Describe = ArtJs.Class(null, null, null, ArtJs.SpecNode);

ArtJs.Context = ArtJs.Class(null, null, null, ArtJs.SpecNode);

ArtJs.It = ArtJs.Class(null, {
  execute: function() {
    runner.it = this;
    runner.receivers = [];
    this.super(arguments);
    runner._testReceivers();
  }
}, null, ArtJs.SpecNode);

function spec(facet, body) {
  var node = new ArtJs.Spec(facet, body);
  runner.specs.push(node);
}

function _executeNode(type, facet, body) {
  var node = new type(facet, body);
  node.execute();
}

function describe(facet, body) {
  _executeNode(ArtJs.Describe, facet, body);
}

function context(facet, body) {
  _executeNode(ArtJs.Context, facet, body);
}

function it(facet, body) {
  _executeNode(ArtJs.It, facet, body);
}

ArtJs.SpecReceiver = com.arthwood.spec.Receiver = ArtJs.Class(function(matcher, actual) {
  this._matcher = matcher;
  this._actual = actual;
  var actualValue = this._actual.value;
  var expected = this._matcher.expected;
  var dc = ArtJs.$DC(this, this.resolve);
  if (!this._isForMock()) {
    this._original = ArtJs.$D(actualValue, actualValue[expected]);
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
    var args = ArtJs.$A(arguments);
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
      if (ArtJs.ArrayUtils.equal([ args, expectedArgs ])) {
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
    this._args = ArtJs.$A(arguments);
    return this;
  },
  andReturn: function(returnValue) {
    this._returnValue = returnValue;
    return this;
  },
  andCallOriginal: function() {
    var forMock = this._isForMock();
    if (forMock) {
      ArtJs.log('WARNING: Using "andCallOriginal" for mock has no result.');
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
    return new ArtJs.SpecResult(this._actual, this._matcher, value);
  },
  rollback: function() {
    if (!this._isForMock()) {
      this._actual.value[this._matcher.expected] = this._original.method;
    }
  },
  _isForMock: function() {
    return this._actual.value instanceof ArtJs.Mock;
  }
});

ArtJs.SpecResult = com.arthwood.spec.Result = ArtJs.Class(function(actual, matcher, value) {
  this.path = runner.path.concat();
  this.actual = actual;
  this.matcher = matcher;
  this.value = value;
}, {
  failureText: function() {
    return this.matcher.failureText(this.actual);
  }
});

ArtJs.SpecRunner = com.arthwood.spec.Runner = ArtJs.Class(function() {
  this.timeline = new ArtJs.Timeline;
  this.init();
}, {
  runnerTemplate: ArtJs.ElementBuilder.create("div", {
    className: "runner"
  }),
  testTemplate: ArtJs.ElementBuilder.create("span"),
  resultsTemplate: ArtJs.ElementBuilder.create("div"),
  init: function() {
    this.specs = [];
    this.path = [];
    this.results = [];
    this.receivers = [];
  },
  run: function() {
    this.timeline.mark();
    this.runnerElement = ArtJs.$insert(document.body, this.runnerTemplate);
    ArtJs.ArrayUtils.invoke(this.specs, "execute");
    var duration = this.timeline.mark();
    var failures = ArtJs.ArrayUtils.select(this.results, this._isFailure, this);
    var success = ArtJs.ArrayUtils.isEmpty(failures);
    var classNames = [ "results" ];
    var n = this.results.length;
    var k = failures.length;
    classNames.push(success ? "success" : "failure");
    this.resultsTemplate.className = classNames.join(" ");
    this.resultsElement = ArtJs.$insert(document.body, this.resultsTemplate);
    var resultText = success ? "Success!" : "Failure!";
    var statsText = success ? n + " assertions in total." : k + " assertions failed of " + n + " total.";
    var durationText = "Duration: " + ArtJs.DateUtils.miliToHMSM(duration);
    var resultElement = ArtJs.$E("p", {
      className: "result"
    }, resultText);
    var statElement = ArtJs.$E("p", {
      className: "stat"
    }, statsText + "<br/>" + durationText);
    ArtJs.$insert(this.resultsElement, resultElement);
    ArtJs.$insert(this.resultsElement, statElement);
    if (!success) {
      var list = ArtJs.$E("ul");
      this._getFailureHtml.list = list;
      ArtJs.ArrayUtils.each(failures, this._getFailureHtml, this);
      ArtJs.$insert(this.resultsElement, list);
    }
  },
  alreadyFailed: function() {
    var lastResult = ArtJs.ArrayUtils.last(this.results);
    return lastResult && lastResult.it == this.it && !lastResult.value;
  },
  pushResult: function(result) {
    if (!this.alreadyFailed()) {
      result.it = this.it;
      this.results.push(result);
      ArtJs.ElementUtils.setContent(this.testTemplate, result.value ? "." : "F");
      this.testTemplate.className = result.value ? "success" : "failure";
      ArtJs.ElementUtils.insert(this.runnerElement, this.testTemplate);
    }
  },
  _testReceivers: function() {
    ArtJs.ArrayUtils.each(this.receivers, this.testReceiver, this);
  },
  testReceiver: function(receiver) {
    var result = receiver.getResult();
    this.pushResult(result);
    receiver.rollback();
  },
  _getFailureHtml: function(i) {
    var path = ArtJs.ArrayUtils.map(i.path, this._nodeToString).join(" ");
    var info = i.failureText();
    var pathElement = ArtJs.$E("p", {
      className: "path"
    }, path);
    var infoElement = ArtJs.$E("p", {
      className: "info"
    }, info);
    var item = ArtJs.$E("li");
    ArtJs.$insert(item, pathElement);
    ArtJs.$insert(item, infoElement);
    ArtJs.$insert(arguments.callee.list, item);
  },
  _nodeToString: function(i) {
    var facet = i.facet;
    return typeof facet == "string" ? facet : facet._name;
  },
  _isFailure: function(i) {
    return !i.value;
  }
});

function subject() {
  return runner.subject;
}

ArtJs.TemplateBase = com.arthwood.template.Base = ArtJs.Class(function(content, scope) {
  this.content = content;
  this.scope = scope;
}, {
  TAG_RE: /\{.+\}/g,
  METHOD_RE: /^(\w+)\((.*)\)$/,
  compile: function() {
    ArtJs.ArrayUtils.each(this.content.match(this.TAG_RE), this._eachTag, this);
  },
  _eachTag: function(i) {
    this.METHOD_RE.lastIndex = 0;
    var expression = ArtJs.StringUtils.sub(i, 1, -1);
    var exec = this.METHOD_RE.exec(expression);
    var result;
    if (exec) {
      exec.shift();
      var action = exec.shift();
      var argsStr = ArtJs.ArrayUtils.first(exec);
      var args = ArtJs.ArrayUtils.map(argsStr.split(","), this._stripArg, this);
      var argsValues = ArtJs.ArrayUtils.map(args, this._parseArg, this);
      result = ArtJs.TemplateHelpers.perform(action, argsValues);
    } else {
      result = this._fromScope(expression);
    }
    this.content = this.content.replace(i, result);
  },
  _parseArg: function(i) {
    var str = i;
    str = ArtJs.StringUtils.trim(str, "'");
    str = ArtJs.StringUtils.trim(str, '"');
    return str == i ? this.scope[i] || "" : str;
  },
  _fromScope: function(i) {
    return this.scope[i];
  },
  _stripArg: function(i) {
    return ArtJs.StringUtils.strip(i);
  }
}, {
  renderContent: function(content, scope) {
    var instance = new this(content, scope);
    instance.compile();
    return instance.content;
  },
  renderInto: function(element, content, scope) {
    this.render(element, this.renderContent(content, scope));
  },
  renderTemplate: function(templateId, scope) {
    var template = ArtJs.TemplateLibrary.getTemplate(templateId);
    return this.renderContent(template, scope);
  },
  renderTemplateInto: function(element, templateId, scope) {
    this.render(element, this.renderTemplate(templateId, scope));
  },
  render: function(element, content) {
    ArtJs.ElementUtils.setContent(element, content);
    ArtJs.Component._scan(element);
  }
});

ArtJs.TemplateHelpers = com.arthwood.template.Helpers = {
  render: function(templateId, scope) {
    return ArtJs.TemplateBase.renderTemplate(templateId, scope);
  },
  renderInto: function(element, templateId, scope) {
    ArtJs.TemplateBase.renderTemplateInto(element, templateId, scope);
  },
  renderCollection: function(templateId, collection) {
    var callback = ArtJs.$DC(this, this._renderCollectionItem, false, templateId);
    return ArtJs.ArrayUtils.map(collection, callback).join("");
  },
  renderIf: function(value, method) {
    return value ? this[method](value) : "";
  },
  registerAll: function(helpers) {
    ArtJs.ObjectUtils.eachPair(helpers, this.register, this);
  },
  register: function(name, method) {
    this[name] = method;
  },
  perform: function(action, args) {
    return this[action].apply(this, args);
  },
  _renderCollectionItem: function(scope, idx, arr, templateId) {
    scope._index = idx;
    return this.render(templateId, scope);
  }
};

ArtJs.TemplateLibrary = com.arthwood.template.Library = {
  config: {
    PATH: "/templates",
    TEMPLATES: []
  },
  _templates: {},
  _init: function() {
    this._onLoadSuccessBind = ArtJs.$D(this, this._onLoadSuccess);
    ArtJs.onDocumentLoad.add(ArtJs.$D(this, this._loadAll));
  },
  _loadAll: function() {
    ArtJs.ElementUtils.hide(document.body);
    ArtJs.ArrayUtils.each(this.config.TEMPLATES, this._load, this);
    this._loadCheck();
  },
  _load: function(i) {
    var request = ArtJs.$get(this.config.PATH + "/" + i + ".html", null, this._onLoadSuccessBind);
    request.id = i;
  },
  _onLoadSuccess: function(ajax) {
    this._templates[ajax.id] = ajax.getResponseText();
    this._loadCheck();
  },
  getTemplate: function(id) {
    return this._templates[id];
  },
  _loadCheck: function() {
    if (ArtJs.ObjectUtils.keys(this._templates).length == this.config.TEMPLATES.length) {
      ArtJs.ElementUtils.show(document.body);
      ArtJs.TemplateBase.renderInto(document.body, document.body.innerHTML);
      ArtJs.onLibraryLoad.fire(this);
    }
  }
};

ArtJs.ElementInspector = com.arthwood.ui.ElementInspector = ArtJs.Class(function() {
  ArtJs.on(document, "mousemove", ArtJs.$D(this, this._onMouseMove));
  this._toggler = new ArtJs.Toggler(true);
  this._toggler.onActivate.add(ArtJs.$D(this, this._onActivate));
  this._toggler.onDeactivate.add(ArtJs.$D(this, this._onDeactivate));
}, {
  _onMouseMove: function(e, ee) {
    var targets = ee.getTargets(e);
    var origin = targets.origin;
    var eu = ArtJs.ElementUtils;
    if (eu.children(origin).any(eu.isText)) {
      this._toggler.toggle(origin);
    }
  },
  _onActivate: function(toggler) {
    var current = toggler.current;
    if (current) {
      ArtJs.ElementUtils.addClass(current, "inspected");
    }
  },
  _onDeactivate: function(toggler) {
    var current = toggler.current;
    if (current) {
      ArtJs.ElementUtils.removeClass(current, "inspected");
    }
  }
});

ArtJs.Tree = com.arthwood.ui.Tree = ArtJs.Class(function(data, element) {
  this.data = data;
  this._onNodeDelegate = ArtJs.$D(this, this._onNode);
  this._onLeafDelegate = ArtJs.$D(this, this._onLeaf);
  this._leafClassToggler = new ArtJs.ClassToggler("selected");
  this.onLeaf = new ArtJs.CustomEvent("onLeaf");
  ArtJs.ElementUtils.insert(element, this.render());
  var point = ArtJs.ArrayUtils.partition(ArtJs.Selector.find(element, "li"), function(item, idx) {
    return ArtJs.ArrayUtils.isNotEmpty(ArtJs.Selector.find(item, "ul"));
  });
  this._nodes = point.x;
  this._leaves = point.y;
  ArtJs.ArrayUtils.each(this._nodes, ArtJs.$DC(this, this._eachNode));
  ArtJs.ArrayUtils.each(this._leaves, ArtJs.$DC(this, this._eachLeaf));
}, {
  render: function() {
    return ArtJs.$P(this._renderNode(this.data));
  },
  open: function() {
    this._expandNode(ArtJs.ElementUtils.firstElement(ArtJs.ArrayUtils.first(this._nodes)));
    this._leafAction(ArtJs.ElementUtils.firstElement(ArtJs.ArrayUtils.first(this._leaves)));
  },
  _renderNode: function(node) {
    return ArtJs.$B("ul", null, ArtJs.ObjectUtils.map(node, this._mapNode, this).join("")).toString();
  },
  _mapNode: function(k, v) {
    var leaf = typeof v == "string";
    var href = leaf ? v : "#";
    var value = ArtJs.$B("a", {
      href: href
    }, k).toString() + (leaf ? "" : this._renderNode(v));
    return ArtJs.$B("li", null, value).toString();
  },
  _eachNode: function(i) {
    ArtJs.ElementUtils.onClick(ArtJs.ElementUtils.firstElement(i), this._onNodeDelegate);
    ArtJs.ElementUtils.hide(ArtJs.ArrayUtils.first(ArtJs.Selector.find(i, "ul")));
    i.style.listStyleImage = this.ctor.FOLDED;
  },
  _onNode: function(originalEvent, elementEvent) {
    originalEvent.preventDefault();
    this._expandNode(elementEvent.element);
  },
  _expandNode: function(a) {
    var ul = ArtJs.ElementUtils.next(a);
    ArtJs.ElementUtils.toggle(ul);
    ArtJs.Selector.parent(a).style.listStyleImage = ArtJs.ElementUtils.isHidden(ul) ? this.ctor.FOLDED : this.ctor.UNFOLDED;
  },
  _eachLeaf: function(i) {
    ArtJs.ElementUtils.onClick(ArtJs.ElementUtils.firstElement(i), this._onLeafDelegate);
    i.style.listStyleImage = this.ctor.LEAF;
  },
  _onLeaf: function(originalEvent, elementEvent) {
    originalEvent.preventDefault();
    this._leafAction(elementEvent.element);
  },
  _leafAction: function(element) {
    this._leafClassToggler.toggle(element);
    this.onLeaf.fire(element);
  }
}, {
  FOLDED: "url(../images/plus.png)",
  UNFOLDED: "url(../images/minus.png)",
  LEAF: "url(../images/leaf.png)"
});

ArtJs.onDocumentLoad = new ArtJs.CustomEvent("document:load");

ArtJs.onWindowLoad = new ArtJs.CustomEvent("window:load");

ArtJs.onLibraryLoad = new ArtJs.CustomEvent("library:load");

document.addEventListener("DOMContentLoaded", function() {
  ArtJs.onDocumentLoad.fire();
}, false);

window.addEventListener("load", function() {
  ArtJs.onWindowLoad.fire();
}, false);

ArtJs.ArrayUtils._init();

ArtJs.Component._init();

ArtJs.ObjectUtils._init();

ArtJs.ElementBuilder._init();

ArtJs.ElementUtils._init();

ArtJs.Selector._init();

ArtJs.TemplateLibrary._init();