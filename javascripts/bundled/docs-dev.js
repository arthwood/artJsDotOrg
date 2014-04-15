var art = {
  component: {},
  model: {}
};

ArtJs.TemplateLibrary.config = {
  PATH: "../templates",
  TEMPLATES: [ "doc", "member", "section", "ga" ]
};

ArtJs.globalize();

ArtJs.doInjection();

art.model.Member = ArtJs.Class(function(header, description, example, params, more) {
  this.super(arguments);
  this.header = header;
  this.description = description;
  this.example = example;
  this.params = params;
  this.more = more;
}, null, null, ArtJs.Model);

art.DB = {
  tree: {
    Global: {
      ArtJs: "main"
    },
    "com.arthwood.data": {
      List: "list",
      Queue: "queue"
    },
    "com.arthwood.dom": {
      Component: "component",
      ElementBuilder: "element_builder",
      Selector: "selector"
    },
    "com.arthwood.events": {
      Clock: "clock",
      CustomEvent: "custom_event",
      Delegate: "delegate",
      QueuedClock: "queued_clock",
      Timeline: "timeline",
      Timeout: "timeout"
    },
    "com.arthwood.math": {
      Point: "point",
      Rectangle: "rectangle"
    },
    "com.arthwood.net": {
      Ajax: "ajax"
    },
    "com.arthwood.template": {
      Helpers: "template/helpers",
      Library: "template/library"
    },
    "com.arthwood.transition": {
      Blind: "transition/blind"
    },
    "com.arthwood.utils": {
      Array: "array",
      Class: "class",
      Date: "date",
      Element: "element",
      Log: "log",
      Math: "math",
      Object: "object",
      String: "string",
      Toggler: "toggler"
    }
  },
  content: {
    main: {
      name: "ArtJs",
      "package": "ArtJs",
      description: "This is top level object that stores information about framework and few methods that allows you to select the framework mode.",
      sections: [ {
        name: "Constants",
        members: [ new art.model.Member("VERSION:String", "Current version of framework") ]
      }, {
        name: "Methods",
        members: [ new art.model.Member("doInjection():Void", "After calling this method you are able to call Utils methods on native objects", [ "ArtJs.doInjection();", "", "// After that action you will be able to use:", "", "myArray.last(); // 3", "", "instead of:", "", "ArtJs.ArrayUtils.last(myArray); // 3" ], null, "Some of the class methods from framework can get injected into native classes." + "For example most of com.arthwood.utils.ArrayUtils would then affect native Array object." + 'To see which native classes can be affected by framework see other parts of documentation, especially "utils" package.'), new art.model.Member("globalize():Void", "Makes all classes accessible globally in window object", [ "ArtJs.globalize();" ], null, "<p>Normally after framework is loaded you have two ways of accessing its classes:</p>" + "<ul><li>using full qualified path (com.arthwood.utils.ArrayUtils)</li><li>by looking into top ArtJs namespace (ArtJs.ArrayUtils)</li></ul>" + "<p>For now there is no classes with the same name in whole framework so accessing it via ArtJs is fine." + "However, if at some point it happens, full qualified name is necessary." + "When all framework classes are loaded and accessible (e.g. in js file following the framework file) simply use:</p>"), new art.model.Member("$():Element", "Alias for ElementUtils.getElements()", [ "var nav = ArtJs.$('.main p.item span');" ]), new art.model.Member("$D():Delegate", "Alias for Delegate.create()", [ "var delegate = ArtJs.$D(this, this.onClick);" ]), new art.model.Member("$DC():Function", "Alias for Delegate.callback()", [ "var callback = ArtJs.$DC(this, this.onClick, true);" ]), new art.model.Member("$del():Ajax", "Alias for Ajax.del()", [ "var ajax = ArtJs.$del('http://mydomain.com', {id: 4}, new Delegate(this, this.onAjaxSuccess));" ]), new art.model.Member("$find():Array", "Alias for ElementUtils.find()", [ "var nav = ArtJs.$('navigation');", "var items = ArtJs.$down(nav, '.item');" ]), new art.model.Member("$get():Ajax", "Alias for Ajax.get()", [ "var ajax = ArtJs.$get('http://mydomain.com', null, new Delegate(this, this.onAjaxSuccess));" ]), new art.model.Member("p():Void", "Debug info. If debug console is accessible output to the console; uses alert() otherwise.", [ "p('myVariable: ' +  myVariable);" ]), new art.model.Member("$P():Element", "Alias for ElementBuilder.parse()", [ "var element = ArtJs.$P('<span class=\"desc\">Blue t-shirt</span>');" ]), new art.model.Member("$post():Ajax", "Alias for Ajax.post()", [ "var ajax = ArtJs.$post('http://mydomain.com', {id: 4}, new Delegate(this, this.onAjaxSuccess));" ]), new art.model.Member("$put():Ajax", "Alias for Ajax.$put()", [ "var ajax = ArtJs.$put('http://mydomain.com', {id: 4}, new Delegate(this, this.onAjaxSuccess));" ]), new art.model.Member("$up():Element", "Alias for ElementUtils.up()", [ "var nav = ArtJs.$('navigation');", "var parent = ArtJs.$up(nav);" ]) ]
      }, {
        name: "Events",
        members: [ new art.model.Member("onDocumentLoad", "Triggered when DOM is loaded."), new art.model.Member("onWindowLoad", "Triggered when whole window is loaded (executes after onDocumentLoad)."), new art.model.Member("onLibraryLoad", "Triggered when all library templates are loaded (executes after onWindowLoad).") ]
      } ]
    },
    list: {
      name: "List",
      "package": "com.arthwood.data",
      description: "List data model implementation.",
      sections: [ {
        name: "Constructor",
        members: [ {
          header: "List(data:Array = [])",
          description: '<span class="param">data</span> - collection data',
          example: [ "var list = new List([1, 2, 3, 4, 5]);" ]
        } ]
      }, {
        name: "Events",
        members: [ {
          header: "onChange(list:List)",
          description: "Dispatched every time the collection changes",
          example: [ "var list = new List([1, 2, 3, 4, 5]);", "", "list.onChange.add(new ArtJs.Delegate(this, this.onChange));", "function onChange(list) {", "'  alert('list has changed!');'", "}" ]
        } ]
      }, {
        name: "Properties",
        members: [ {
          header: "allowDuplicates:Boolean = true",
          description: "Flag that allows having duplicates in collection",
          more: "'If this flag is set to true, adding existing item won't do anything.'"
        }, {
          header: "loop:Boolean = false",
          description: "Flag that allows periodically return the item, even if index is out of collection bounds",
          more: "If this flag is set to true and you try to fetch an item by index out of collection bounds, " + "you will receive item as if you were fetching it from infinite collection consisting of periodically " + "repeated items of initial collection.",
          example: [ "var list = new List([1, 2, 3, 4, 5]);", "", "list.loop = true;", "list.getItemAt(-1); //5", "list.getItemAt(6); //2" ]
        } ]
      }, {
        name: "Methods",
        members: [ {
          header: "addItem(item:Object, noEvent:Boolean):Number",
          description: 'Adds <span class="code">item</span> to the end of collection and returns new length.' + "" + 'If <span class="code">noEvent</span> is set to true, this action wont dispatch the <span class="code">change</span> event.',
          example: [ "var list = new List([1, 2, 3, 4, 5]);", "", "list.addItem(6); // 6", "list.toString() // 1, 2, 3, 4, 5, 6" ]
        }, {
          header: "addItemAt(item:Object, idx:Number, noEvent:Boolean):Number",
          description: 'Adds <span class="code">item</span> to collection at specific position and returns new length',
          example: [ "var list = new List([1, 2, 3, 4, 5]);", "", "list.addItemAt(6, 2); // 6", "list.toString() // 1, 2, 6, 3, 4, 5" ]
        }, {
          header: "decrease():Void",
          description: "Decreases pointer",
          example: [ "var list = new List([1, 2, 3, 4, 5]);", "", "list.setPointer(2);", "list.decrease();", "list.getPointer(); // 1" ]
        }, {
          header: "isEmpty():Boolean",
          description: "Returns true if collection is empty; false otherwise",
          example: [ "var list = new List([1, 2, 3, 4, 5]);", "", "list.isEmpty(); // false", "list.removeAll();", "list.isEmpty(); // true" ]
        }, {
          header: "getCurrent():Object",
          description: "Returns current item",
          example: [ "var list = new List([1, 2, 3, 4, 5]);", "", "list.setPointer(2);", "list.getCurrent(); // 3" ]
        }, {
          header: "getFirst():Object",
          description: "Returns first item of collection",
          example: [ "var list = new List([1, 2, 3, 4, 5]);", "", "list.getFirst(); // 1" ]
        }, {
          header: "getItemAt(idx:Number):Object",
          description: 'Retrieves <span class="code">item</span> at specific position',
          example: [ "var list = new List([1, 2, 3, 4, 5]);", "", "list.getItemAt(3); // 4" ]
        }, {
          header: "getItemIndex(item:Object):Number",
          description: 'Retrieves <span class="code">item</span>\'s index',
          example: [ "var list = new List([1, 2, 3, 4, 5]);", "", "list.getItemIndex(3); // 2" ]
        }, {
          header: "getItems():Array",
          description: "Returns copy of collection",
          example: [ "var list = new List([1, 2, 3, 4, 5]);", "", "list.getItems().toString(); // 1, 2, 3, 4, 5" ]
        }, {
          header: "getLast():Object",
          description: "Returns last item of collection",
          example: [ "var list = new List([1, 2, 3, 4, 5]);", "", "list.getLast(); // 5" ]
        }, {
          header: "getLength():Number",
          description: "Returns length of collection",
          example: [ "var list = new List([1, 2, 3, 4, 5]);", "", "list.getLength(); // 5" ]
        }, {
          header: "getNext():Object",
          description: "Returns item after current",
          example: [ "var list = new List([1, 2, 3, 4, 5]);", "", "list.setPointer(2);", "list.getNext(); // 4" ]
        }, {
          header: "getPointer():Number",
          description: "Returns pointer",
          example: [ "var list = new List([1, 2, 3, 4, 5]);", "", "list.getPointer(); // 0", "list.increase();", "list.getPointer(); // 1" ]
        }, {
          header: "getPrevious():Object",
          description: "Returns item before current",
          example: [ "var list = new List([1, 2, 3, 4, 5]);", "", "list.setPointer(2);", "list.getPrevious(); // 2" ]
        }, {
          header: "hasItem(item:Object):Boolean",
          description: 'Returns true if <span class="code">item</span> is in collection; false otherwise',
          example: [ "var list = new List([1, 2, 3, 4, 5]);", "", "list.hasItem(4); // true", "list.hasItem(7); // false" ]
        }, {
          header: "increase():Void",
          description: "Increases pointer",
          example: [ "var list = new List([1, 2, 3, 4, 5]);", "", "list.setPointer(2);", "list.increase();", "list.getPointer(); // 3" ]
        }, {
          header: "isLast():Boolean",
          description: "Returns true if pointer is set to last item in collection; false otherwise",
          example: [ "var list = new List([1, 2, 3, 4, 5]);", "", "list.setPointer(4);", "list.isLast(); // true" ]
        }, {
          header: "moveItem(fromIndex:Number, toIndex:Number):Void",
          description: 'Moves <span class="code">item</span> from, to specific position',
          example: [ "var list = new List([1, 2, 3, 4, 5]);", "", "list.moveItem(3, 0);", "list.toString(); // 4, 1, 2, 3, 5;" ]
        }, {
          header: "removeAll(noEvent:Boolean):Void",
          description: "Removes all items from collection",
          example: [ "var list = new List([1, 2, 3, 4, 5]);", "", "list.removeAll();", "list.toString() //" ]
        }, {
          header: "removeItem(item:Object, onlyFirst:Boolean, noEvent:Boolean):Void",
          description: 'Removes <span class="code">item</span> from collection',
          example: [ "var list = new List([1, 2, 3, 4, 5]);", "", "list.removeItem(2); // 4", "list.toString() // 1, 3, 4, 5" ]
        }, {
          header: "removeItemAt(idx:Number, noEvent:Boolean):Void",
          description: 'Removes <span class="code">item</span> at specific position from collection',
          example: [ "var list = new List([1, 2, 3, 4, 5]);", "", "list.removeItemAt(2); // 4", "list.toString() // 1, 2, 4, 5" ]
        }, {
          header: "reset():Void",
          description: "Sets pointer to zero",
          example: [ "var list = new List([1, 2, 3, 4, 5]);", "", "list.setPointer(2);", "list.getPointer(); // 2", "list.reset();", "list.getPointer(); // 0" ]
        }, {
          header: "setItems(items:Array):Void",
          description: "Set the collection",
          example: [ "var list = new List([1, 2, 3, 4, 5]);", "", "list.toString(); // 1, 2, 3, 4, 5", "list.setItems([4, 5, 6]);", "list.toString(); // 4, 5, 6" ]
        }, {
          header: "setPointerAtItem(item:Object):Void",
          description: 'Set the pointer at position of <span class="code">item</span>',
          example: [ "var list = new List([1, 2, 3, 4, 5]);", "", "list.setPointerAtItem(2);", "list.getPointer(); // 1" ]
        }, {
          header: "setPointer(i:Number):Void",
          description: "Sets pointer",
          example: [ "var list = new List([1, 2, 3, 4, 5]);", "", "list.setPointer(2);", "list.getPointer(); // 2" ]
        } ]
      } ]
    },
    queue: {
      name: "Queue",
      "package": "com.arthwood.data",
      description: "Queue data model implementation",
      sections: [ {
        name: "Constructor",
        members: [ {
          header: "Queue(data:Array = [])",
          description: '<span class="param">data</span> - collection data',
          example: [ "var queue = new Queue([1, 2, 3, 4, 5]);" ]
        } ]
      }, {
        name: "Events",
        members: [ {
          header: "onChange(list:List)",
          description: "Dispatched every time the collection changes",
          example: [ "var queue = new Queue([1, 2, 3, 4, 5]);", "", "queue.onChange.add(new ArtJs.Delegate(this, this.onChange));", "", "function onChange(queue) {", "'  alert('queue has changed!');'", "}" ]
        } ]
      }, {
        name: "Methods",
        members: [ {
          header: "addItem(item:Object):Void",
          description: 'Adds <span class="code">item</span> to the end of collection',
          example: [ "var queue = new Queue([1, 2, 3, 4, 5]);", "", "queue.addItem(6); // 6", "", "queue.toString() // 1, 2, 3, 4, 5, 6" ]
        }, {
          header: "empty():Boolean",
          description: "Returns true if collection is empty; false otherwise",
          example: [ "var queue = new Queue([3]);", "", "queue.isEmpty(); // false", "", "var item = queue.getItem();", "", "queue.isEmpty(); // true" ]
        }, {
          header: "getItem():Object",
          description: "Pops and returns current item",
          example: [ "var queue = new Queue([1, 2, 3, 4, 5]);", "var item = queue.getItem(); // 1", "", "queue.toString(); // 2, 3, 4, 5" ]
        }, {
          header: "getLength():Number",
          description: "Returns length of collection",
          example: [ "var queue = new Queue([1, 2, 3, 4, 5]);", "", "queue.getLength(); // 5" ]
        }, {
          header: "setData(data:Array):Void",
          description: "Sets the collection",
          example: [ "var queue = new Queue([1, 2, 3, 4, 5]);", "", "", "queue.toString(); // 1, 2, 3, 4, 5", "", "queue.setData([4, 5, 6]);", "", "queue.toString(); // 4, 5, 6" ]
        } ]
      } ]
    },
    component: {
      name: "Component",
      "package": "com.arthwood.dom",
      description: "Components allow you to attach your own view class to element node. " + 'In order to do this simply assign "art" class to your element along with class name of your custom class ' + "e.g. com-domain-Navigation and define com.domain.Navigation class.",
      sections: [ {
        name: "Static methods",
        members: [ {
          header: "dependsOn(*dependencies:Class)",
          description: "Registers dependency. Whenever any of dependency classes is instantiated it is passed " + "to onDependency() method which you may want to implement.",
          example: [ "/* ", " * This will cause two invocations on Content instance:", " * onDependency(sidebar) and onDependency(footer)", " * but not necessarily in this order.", " */", "Content.dependsOn(Sidebar, Footer);" ]
        } ]
      } ]
    },
    element_builder: {
      name: "ElementBuilder",
      "package": "com.arthwood.dom",
      description: "Allows to create DOM elements",
      sections: [ {
        name: "Constructor",
        members: [ {
          header: "ElementBuilder(name:String, attributes:Object, value:String, empty:Boolean)",
          params: {
            name: "element name",
            attributes: "element attributes",
            value: "element inner text",
            empty: "if true, empty element will be created"
          },
          example: [ "var builder = new ElementBuilder('span', {class: 'price'}, '$199');", "", 'builder.toString(); // &lt;span class="price"&gt;$199&lt;/span&gt;' ]
        } ]
      }, {
        name: "Properties",
        members: [ {
          header: "attributes:Object",
          description: "The same property as in constructor"
        }, {
          header: "empty:Boolean",
          description: "The same property as in constructor"
        }, {
          header: "name:String",
          description: "The same property as in constructor"
        }, {
          header: "value:Object",
          description: "The same property as in constructor"
        } ]
      }, {
        name: "Methods",
        members: [ {
          header: "getElement():Element",
          description: "Builds and returns new Element",
          example: [ "var builder = new ElementBuilder('span', {class: 'price'}, '$199');", "", "var element = builder.getElement();", "", "element.toString(); // [object HTMLSpanElement]" ]
        }, {
          header: "toString():String",
          description: "String representation of element",
          example: [ "var builder = new ElementBuilder('span', {class: 'price'}, '$199');", "", 'builder.toString(); // &lt;span class="price"&gt;$199&lt;/span&gt;' ]
        } ]
      }, {
        name: "Static Methods",
        members: [ {
          header: "build(name:String, attributes:Object, value:String, empty:Boolean):ElementBuilder",
          description: "Returns new instance while passing all arguments",
          example: [ "var builder = ElementBuilder.build('span', {class: 'price'}, '$199');", "", 'builder.toString(); // &lt;span class="price"&gt;$199&lt;/span&gt;' ]
        }, {
          header: "parse(string:String):Element",
          description: 'Returns <span class="code">string</span> as an Element',
          example: [ "var element = ElementBuilder.parse('&lt;span class=\"price\"&gt;$199&lt;/span&gt;');", "", "element.toString(); // [object HTMLSpanElement]" ]
        }, {
          header: "create(name:String, attributes:Object, value:String, empty:Boolean):Element",
          description: "Performs build and parse methods in one step",
          example: [ "var element = ElementBuilder.create('span', {class: 'price'}, '$199');", "", "element.toString(); // [object HTMLSpanElement]" ]
        }, {
          header: "getElement(name:String, attributes:Object, value:String, empty:Boolean):Element",
          description: "Works the same as corresponding instance method",
          example: [ "var element = ElementBuilder.getElement('span', {class: 'price'}, '$199');", "", "element.toString(); // [object HTMLSpanElement]" ]
        }, {
          header: "getCollection(n:Integer, element:ElementBuilder):String",
          description: "Returns html string with element repeated n times",
          example: [ "var element = ElementBuilder.getElement('span', {class: 'price'});", "var html = ElementBuilder.getCollection(3, element);", "", 'element.toString(); // &lt;span class="price"&gt;&lt;/span&gt;&lt;span class="price"&gt;&lt;/span&gt;&lt;span class="price"&gt;&lt;/span&gt;' ]
        } ]
      } ]
    },
    selector: {
      name: "Selector",
      "package": "com.arthwood.dom",
      description: "Allows to easily traverse DOM.",
      sections: [ {
        name: "Methods",
        members: [ {
          header: "find(element:Element, selector:String):Array",
          description: "Same as #getElements but with reversed arguments."
        }, {
          header: "first(element:Element, selector:String):Element",
          description: "Returns first result of #find."
        }, {
          header: "last(element:Element, selector:String):Element",
          description: "Returns last result of #find."
        }, {
          header: "parent(element:Element, selector:String):Element",
          description: "Returns first ancestor that matches the selector."
        }, {
          header: "getElements(selector:String, element:Element):Array",
          description: "Returns all descendants that match the selector.",
          more: "Selector parameter must be a single selector without spaces",
          example: [ "var main = getElements('#main');", "var titles = getElements('p.title', main);" ]
        }, {
          header: "isDescendantOf(element:Element, root:Element):Boolean",
          description: "Returns true if element is descendant of root."
        }, {
          header: "isSelfOrDescendantOf(element:Element, root:Element):Boolean",
          description: "Same as #isDescendantOf but returns true also if element is the root itself."
        }, {
          header: "getElementById(id:String):Element",
          description: "Returns Element by id."
        }, {
          header: "getElementsByTagName(name:String):Array",
          description: "Returns array of Elements by tag name."
        }, {
          header: "getElementsByClassName(name:String):Array",
          description: "Returns array of Elements by class name."
        } ]
      } ]
    },
    clock: {
      name: "Clock",
      "package": "com.arthwood.events",
      description: "Allows trigger events periodically",
      sections: [ {
        name: "Constructor",
        members: [ {
          header: "Clock(interval:Number, repeat:Number)",
          params: {
            interval: "interval between ticks in miliseconds",
            repeat: "number of ticks"
          },
          example: [ "var clock = new Clock(1000, 5);" ]
        } ]
      }, {
        name: "Events",
        members: [ {
          header: "onChange(clock:Clock)",
          description: "Triggered on each tick",
          example: [ "var clock = new Clock(1000, 5);", "", "clock.onChange.add(new Delegate(this, this.onClockChange);", "", "function onClockChange(clock) {", "  console.log('clock change!');", "}" ]
        }, {
          header: "onFinish(clock:Clock)",
          description: "Triggered after last tick",
          example: [ "var clock = new Clock(1000, 5);", "", "clock.onComplete.add(new Delegate(this, this.onClockComplete);", "", "function onClockComplete(clock) {", "  console.log('clock complete!');", "}" ]
        } ]
      }, {
        name: "Properties",
        members: [ {
          header: "counter:Number",
          description: "Number of released ticks"
        }, {
          header: "interval:Number",
          description: "The same property as in constructor"
        }, {
          header: "repeat:Number",
          description: "The same property as in constructor"
        } ]
      }, {
        name: "Methods",
        members: [ {
          header: "isRunning():Void",
          description: "Returns true if clock is running; false otherwise",
          example: [ "var clock = new Clock(1000, 5);", "", "clock.isRunning(); // false", "clock.start(true);", "clock.isRunning(); // true", "clock.stop();", "clock.isRunning(); // false" ]
        }, {
          header: "pause():Void",
          description: "'Same as stop() but doesn't reset the counter'",
          example: [ "var clock = new Clock(1000, 5);", "", "clock.start(true);", "// ... and some time later", "clock.counter; // 3", "clock.pause();", "clock.counter; // 3" ]
        }, {
          header: "resume():Void",
          description: "Resumes ticking after it has been paused",
          example: [ "var clock = new Clock(1000, 5);", "", "clock.start();", "// ... and some time later", "clock.counter; // 3", "clock.pause();", "// ... and some time later", "clock.resume();", "clock.counter; // 3" ]
        }, {
          header: "start(now:Boolean):Void",
          description: "Starts the clock. First tick after interval or immediately if 'now' param is true",
          example: [ "var clock = new Clock(1000, 5);", "", "clock.start();" ]
        }, {
          header: "stop():Void",
          description: "Stops the clock and sets counter to zero",
          example: [ "var clock = new Clock(1000, 5);", "", "clock.start();", "// ... and some time later", "clock.counter; // 3", "clock.stop();", "clock.counter; // 0" ]
        } ]
      } ]
    },
    custom_event: {
      name: "CustomEvent",
      "package": "com.arthwood.events",
      description: "Defines object capable of dispatching events.",
      sections: [ {
        name: "Constructor",
        members: [ {
          header: "CustomEvent(name:String = null)",
          params: {
            name: "name of the event"
          },
          example: [ "var myEvent = new CustomEvent('MyClass::myEvent');" ]
        } ]
      }, {
        name: "Properties",
        members: [ {
          header: "name:Name",
          description: "The same property as in constructor"
        }, {
          header: "collection:DelegateCollection",
          description: "Collection of registered listeners",
          example: [ "var myEvent = new CustomEvent('MyClass::myEvent');", "", "myEvent.collection.length // 0", "myEvent.add(new Delegate(null, function() {", "console.log('event!')", "}));", "myEvent.collection.length // 1" ]
        } ]
      }, {
        name: "Methods",
        members: [ {
          header: "add(delegate:Delegate):Void",
          description: "Registers listener",
          example: [ "var myEvent = new CustomEvent('MyClass::myEvent');", "", "myEvent.add(new Delegate(null, function() {", "  console.log('event!')", "}));" ]
        }, {
          header: "fire():Array",
          description: "Triggers the event and returns responses from handlers as an array",
          example: [ "var myEvent = new CustomEvent('MyClass::myEvent');", "", "myEvent.add(new Delegate(null, function() {", "  console.log('event!');", "  return 2;", "}));", "// ...then at some point you dispatch the event", "myEvent.fire(this, 'hello'); // [2]" ]
        }, {
          header: "getLength():Number",
          description: "Amount of listeners currently registered",
          example: [ "var myEvent = new CustomEvent('MyClass::myEvent');", "var delegateOne = new Delegate(null, function(msg) {", "  console.log('event says to delegate 1: ' + msg);", "});", "var delegateTwo = new Delegate(null, function(msg) {", "  console.log('event says to delegate 2: ' + msg);", "});", "", "myEvent.getLength(); // 0", "myEvent.add(delegateOne);", "myEvent.getLength(); // 1", "myEvent.add(delegateTwo);", "myEvent.getLength(); // 2", "myEvent.removeAll();", "myEvent.getLength(); // 0" ]
        }, {
          header: "remove(delegate:Delegate):Void",
          description: "Removes listener",
          example: [ "var myEvent = new CustomEvent('MyClass::myEvent');", "var delegate = new Delegate(null, function(msg) {", "  console.log('event says: ' + msg)", "});", "", "myEvent.add(delegate);", "myEvent.fire('hello!'); // delegate handles event", "myEvent.remove(delegate);", "myEvent.fire('hello!'); // nothing happens" ]
        }, {
          header: "removeAll():Void",
          description: "Removes all listeners",
          example: [ "var myEvent = new CustomEvent('MyClass::myEvent');", "var delegateOne = new Delegate(null, function(msg) {", "  console.log('event says to delegate 1: ' + msg);", "});", "var delegateTwo = new Delegate(null, function(msg) {", "  console.log('event says to delegate 2: ' + msg);", "});", "", "myEvent.add(delegateOne);", "myEvent.add(delegateTwo);", "myEvent.fire('hello!'); // delegates handle event", "myEvent.removeAll();", "myEvent.fire('hello!');// nothing happens" ]
        } ]
      } ]
    },
    delegate: {
      name: "Delegate",
      "package": "com.arthwood.events",
      description: "Allows to keep context object along with function.",
      sections: [ {
        name: "Constructor",
        members: [ {
          header: "Delegate(object:Object, method:Function, ...rest)",
          params: {
            object: "context object",
            method: "any function"
          },
          description: "Delegate wraps context object, any function and optional arguments into single Delegate object." + "When you ask for callback function:" + '<span class="block code">' + "var delegate = new Delegate(this, this.onChange, 'hello');" + "var callback = delegate.callback();" + "</span>" + 'you will get a Function object that when called will have set <span class="code" >this</span> to context object.' + 'Optionally when you pass <span class="code">true</span> to <span class="code">delegate.callback()</span>' + 'the <span class="code">callback</span> handler will receive "source" as first argument' + '("source" points to object who actually called the callback).' + "Arguments list that are passed to callback function are:" + "- source object (if specified)" + "- arguments that are passed directly when it is being called" + "- optional arguments (...rest) passed to delegate when creating the instance",
          example: [ "function onClick(link, e, msg) {", "  alert('Link clicked! ' + msg);", "  return false;", "}", "", "var delegate = new Delegate(this, onClick, 'hello');", "", "link.onclick = delegate.callback(true);" ]
        } ]
      }, {
        name: "Properties",
        members: [ {
          header: "args:Array",
          description: "Optional set of arguments"
        }, {
          header: "method:Function",
          description: "The same property as in constructor"
        }, {
          header: "object:Object",
          description: "The same property as in constructor"
        } ]
      }, {
        name: "Methods",
        members: [ {
          header: "callback(withSource:Boolean):Function",
          description: "Returns Function object, than when called will receive source object as first argument if" + '<span class="code">withSource</span> is true, and <span class="code">this</span> in that function' + "will always point to context object",
          example: [ "var obj = {id: 4};", "", "function meth(source, name, greeting) {", "  console.log('source: ' + source + ', id: ' + this.id + ': ' + greeting + \", it's \" + name);", "}", "", "var delegate = new Delegate(obj, meth, 'hello');", "var callback = delegate.callback(true);", "", "callback('Steve');" ]
        }, {
          header: "invoke():Object",
          description: "Calls the delegate method with object as a context",
          example: [ "function method(value, message) {", "  alert('method called! value:' + value + ', message: ' + message);", "  return true;", "}", "", "var delegate = new Delegate(this, method, 'hello');", "var result = delegate.invoke(5); // true" ]
        } ]
      }, {
        name: "Static Methods",
        members: [ {
          header: "callback(object:Object, method:Function, withSource:Boolean, ...rest):Function",
          description: "A shorthand function that allows to create delegate and returns it's callback at one step",
          example: [ "var obj = {id: 4};", "", "function meth(source, name, greeting) {", "  console.log('source: ' + source + ', id: ' + this.id + ': ' + greeting + \", it's \" + name);", "}", "", "var callback = Delegate.callback(obj, meth, true, 'hello');", "", "callback('Steve');" ]
        }, {
          header: "create(object:Object, method:Function, ...rest):Delegate",
          description: "A shorthand function that allows to create and return new delegate object",
          example: [ "var obj = {id: 4};", "", "function meth(source, name, greeting) {", "  console.log('source: ' + source + ', id: ' + this.id + ': ' + greeting + \", it's \" + name);", "}", "", "var delegate = Delegate.create(obj, meth, 'hello');", "var callback = delegate.callback(true);", "", "callback('Steve');" ]
        } ]
      } ]
    },
    queued_clock: {
      name: "QueuedClock",
      "package": "com.arthwood.events",
      description: "Allows to trigger events periodically.",
      sections: [ {
        name: "Constructor",
        members: [ {
          header: "QueuedClock(interval:Number)",
          params: {
            interval: "interval between clock ticks in miliseconds"
          },
          description: "The class works like queue. You add Delegate items and then clock periodically removes current item and calls invoke() on it.",
          example: [ "var qc = new QueuedClock(1000);", "", "// add one delegate item", "qc.addItem(new Delegate(this, this.onTick)) // 1;", "qc.getLength(); // 1", "qc.start();", "// after first tick the collection is empty", "qc.getLength(); // 0" ]
        } ]
      }, {
        name: "Properties",
        members: [ {
          header: "interval:Number",
          description: "The same property as in constructor"
        } ]
      }, {
        name: "Methods",
        members: [ {
          header: "addItem(item:Delegate):Number",
          description: "Adds delegate to collection and returns its new length",
          example: [ "var qc = new QueuedClock(1000);", "", "qc.addItem(new Delegate(this, this.onTick)) // 1;" ]
        }, {
          header: "getLength():Number",
          description: "Returns current length of collection",
          example: [ "var qc = new QueuedClock(1000);", "", "qc.getLength(); // 0", "qc.addItem(new Delegate(this, this.onTick));", "qc.getLength(); // 1" ]
        }, {
          header: "start():Void",
          description: "Starts execution",
          example: [ "var qc = new QueuedClock(1000);", "", "qc.addItem(new Delegate(this, this.onTick));", "", "qc.start();" ]
        } ]
      } ]
    },
    timeline: {
      name: "Timeline",
      "package": "com.arthwood.events",
      description: "Useful for measuring time intervals between events.",
      sections: [ {
        name: "Constructor",
        members: [ {
          header: "Timeline()"
        } ]
      }, {
        name: "Methods",
        members: [ {
          header: "mark():Integer",
          description: "Marks the point on the timeline. Returns miliseconds since recent mark."
        } ]
      } ]
    },
    timeout: {
      name: "Timeout",
      "package": "com.arthwood.events",
      description: "Allows you to perform action with delay.",
      sections: [ {
        name: "Constructor",
        members: [ {
          header: "Timeout(delay:Number)",
          params: {
            delay: "Delay in miliseconds before onComplete event is triggered."
          }
        } ]
      }, {
        name: "Methods",
        members: [ {
          header: "start():Void",
          description: "Initializes the timeout. After amount of time specified in constructor the onComplete will be triggered."
        }, {
          header: "getDelay():Number",
          description: "Returns delay specified in constructor."
        }, {
          header: "isRunning():Boolean",
          description: "Returns true if timeout has been started but not yet finished."
        } ]
      }, {
        name: "Events",
        members: [ {
          header: "onComplete(delegate:Delegate):Void",
          description: "Triggered when timeout finishes."
        } ]
      }, {
        name: "Static methods",
        members: [ {
          header: "fire(delegate:Delegate, delay:Number):Timeout",
          description: "Instantiates Timeout and registers handler at once."
        } ]
      } ]
    },
    point: {
      name: "Point",
      "package": "com.arthwood.math",
      description: "Math 2-dimentional vector implementation",
      sections: [ {
        name: "Constructor",
        members: [ {
          header: "Point(x:Number, y:Number)",
          params: {
            x: "x coordinate",
            y: "y coordinate"
          },
          example: [ "var point = new Point(20, 40);" ]
        } ]
      }, {
        name: "Properties",
        members: [ {
          header: "x:Number",
          description: "The same property as in constructor"
        }, {
          header: "y:Number",
          description: "The same property as in constructor"
        } ]
      }, {
        name: "Methods",
        members: [ {
          header: "add():Point",
          description: "Adds other vector",
          example: [ "var p1 = new Point(2, 3);", "var p2 = new Point(4, -1);", "", "p1.add(p2); // (6, 2)" ]
        }, {
          header: "dot():Number",
          description: "Dot product of this vector and other vector",
          example: [ "var p1 = new Point(2, 3);", "var p2 = new Point(4, -1);", "", "p1.dot(p2); // 5" ]
        }, {
          header: "getLength():Number",
          description: "Length of a vector",
          example: [ "var point = new Point(3, 4);", "", "point.getLength(); // 5" ]
        }, {
          header: "getReversed():Point",
          description: "Returns reversed vector",
          example: [ "var p = new Point(2, 3);", "", "p.getReversed(); // (-2, -3)", "p; // (2, 3)" ]
        }, {
          header: "getTransposed():Point",
          description: "Returns new transposed vector",
          example: [ "var p = new Point(2, 3);", "", "p.getTransposed(); // (3, 2)", "p; // (2, 3)" ]
        }, {
          header: "reverse():Point",
          description: "Reverses vector and returns this vector",
          example: [ "var p = new Point(2, 3);", "", "p.reverse(); // (-2, -3)", "p; // (-2, -3)" ]
        }, {
          header: "reverseX():Point",
          description: "Reverses x coordinate and returns this vector",
          example: [ "var p = new Point(2, 3);", "", "p.reverse(); // (-2, 3)", "p; // (-2, 3)" ]
        }, {
          header: "reverseY():Point",
          description: "Reverses y coordinate and returns this vector",
          example: [ "var p = new Point(2, 3);", "", "p.reverse(); // (2, -3)", "p; // (2, -3)" ]
        }, {
          header: "sub():Void",
          description: "Subtracts other vector",
          example: [ "var p1 = new Point(2, 3);", "var p2 = new Point(4, -1);", "", "p1.sub(p2); // (-2, 4)" ]
        }, {
          header: "times(k:Number):Point",
          description: 'Returns new vector multiplied by <span class="code">k</span>',
          example: [ "var p = new Point(2, 3);", "", "p.times(-3); // (-9, -6)", "p; // (2, 3)" ]
        }, {
          header: "toString():String",
          description: "Returns string representation od vector",
          example: [ "var p = new Point(2, 3);", "", "p.toString(); // [2, 3]" ]
        }, {
          header: "transpose():Point",
          description: "Transposes coordinates and returns this vector",
          example: [ "var p = new Point(2, 3);", "", "p.transpose(); // (3, 2)", "p; // (3, 2)" ]
        } ]
      } ]
    },
    rectangle: {
      name: "Rectangle",
      "package": "com.arthwood.math",
      description: "Math rectangle implementation",
      sections: [ {
        name: "Constructor",
        members: [ {
          header: "Rectangle(left:Number, top:Number, right:Number, bottom:Number)",
          params: {
            left: "left edge",
            top: "top edge",
            right: "right edge",
            bottom: "bottom edge"
          },
          example: [ "var rectangle = new Rectangle(10, 10, 30, 20);" ]
        } ]
      }, {
        name: "Properties",
        members: [ {
          header: "bottom:Number",
          description: "The same property as in constructor"
        }, {
          header: "left:Number",
          description: "The same property as in constructor"
        }, {
          header: "right:Number",
          description: "The same property as in constructor"
        }, {
          header: "top:Number",
          description: "The same property as in constructor"
        } ]
      }, {
        name: "Methods",
        members: [ {
          header: "getArea():Number",
          description: "Area of rectangle",
          example: [ "var rectangle = new Rectangle(10, 10, 30, 20);", "", "rectangle.getArea(); // 200" ]
        }, {
          header: "getHeight():Number",
          description: "Height of rectangle",
          example: [ "var rectangle = new Rectangle(10, 10, 30, 20);", "", "rectangle.getHeight(); // 10" ]
        }, {
          header: "getLeftBottom():Point",
          description: "Left-bottom corner vector",
          example: [ "var rectangle = new Rectangle(10, 10, 30, 20);", "", "rectangle.getRightBottom(); // [10, 20]" ]
        }, {
          header: "getLeftTop():Point",
          description: "Left-top corner vector",
          example: [ "var rectangle = new Rectangle(10, 10, 30, 20);", "", "rectangle.getLeftTop(); // [10, 10]" ]
        }, {
          header: "getRightBottom():Point",
          description: "Right-bottom corner vector",
          example: [ "var rectangle = new Rectangle(10, 10, 30, 20);", "", "rectangle.getRightBottom(); // [30, 20]" ]
        }, {
          header: "getRightTop():Point",
          description: "Right-top corner vector",
          example: [ "var rectangle = new Rectangle(10, 10, 30, 20);", "", "rectangle.getRightTop(); // [30, 10]" ]
        }, {
          header: "getSize():Point",
          description: "Width and height as a vector",
          example: [ "var rectangle = new Rectangle(10, 10, 30, 20);", "", "rectangle.getSize(); // [20, 10]" ]
        }, {
          header: "getWidth():Number",
          description: "Width of rectangle",
          example: [ "var rectangle = new Rectangle(10, 10, 30, 20);", "", "rectangle.getWidth(); // 20" ]
        }, {
          header: "moveBy(point:Point):Void",
          description: "Moves rectangle by a vector",
          example: [ "var rectangle = new Rectangle(10, 10, 30, 20);", "", "rectangle.moveBy(new Point(-10, -10);", "rectangle.toString(); // [0, 0, 20, 10]" ]
        } ]
      } ]
    },
    ajax: {
      name: "Ajax",
      "package": "com.arthwood.net",
      description: "Facilitates AJAX requests",
      sections: [ {
        name: "Constructor",
        members: [ {
          header: "Ajax(url:String, data:Object, method:String)",
          params: {
            url: "request URL",
            data: "request data",
            method: "request method"
          },
          example: [ "var ajax = new Ajax('/users', {only_active: 1}, ArtJs.Ajax.Methods.GET);", "", "ajax.onSuccess.add(new Delegate(this, this.onAjaxSuccess));", "", "ajax.request();" ]
        } ]
      }, {
        name: "Events",
        members: [ {
          header: "onFailure(ajax:Ajax)",
          description: "Dispatched after request failed",
          example: [ "var ajax = new Ajax('/users', {only_active: 1}, ArtJs.Ajax.Methods.GET);", "", "ajax.onFailure.add(new Delegate(null, onAjaxFailure));", "", "function onAjaxFailure(ajax) {", "  alert('failure...');", "}", "", "ajax.request();" ]
        }, {
          header: "onSuccess(ajax:Ajax)",
          description: "Dispatched after successful response",
          example: [ "var ajax = new Ajax('/users', {only_active: 1}, ArtJs.Ajax.Methods.GET);", "", "ajax.onSuccess.add(new Delegate(null, onAjaxSuccess));", "", "function onAjaxSuccess(ajax) {", "  alert('success!');", "}", "", "ajax.request();" ]
        } ]
      }, {
        name: "Properties",
        members: [ {
          header: "data:Object",
          description: "The same property as in constructor"
        }, {
          header: "method:String",
          description: "The same property as in constructor"
        }, {
          header: "requestData:Object",
          description: "Data that is actually send to server"
        }, {
          header: "requestMethod:String",
          description: "Method that is actually used for request"
        }, {
          header: "requestQueryData:String",
          description: "Request data transformed to a String (this is what is actually send to server)"
        }, {
          header: "url:String",
          description: "The same property as in constructor"
        } ]
      }, {
        name: "Methods",
        members: [ {
          header: "abort():Void",
          description: "Aborts request",
          example: [ "var ajax = new Ajax('/users', {only_active: 1}, ArtJs.Ajax.Methods.GET);", "", "ajax.request();", "", "// ... at some point during the request", "ajax.abort();" ]
        }, {
          header: "getAllRequestHeaders():String",
          description: "Returns all request headers",
          example: [ "var ajax = new Ajax('/users', {only_active: 1}, ArtJs.Ajax.Methods.GET);", "", "ajax.getAllRequestHeaders();" ]
        }, {
          header: "getReadyState():Number",
          description: "Returns request ready state",
          example: [ "var ajax = new Ajax('/users', {only_active: 1}, ArtJs.Ajax.Methods.GET);", "", "ajax.request();", "", "// ... at some point during request", "ajax.getReadyState();" ]
        }, {
          header: "getRequestHeader(header:String):String",
          description: "Returns request header",
          example: [ "var ajax = new Ajax('/users', {only_active: 1}, ArtJs.Ajax.Methods.GET);", "", "ajax.getRequestHeader('Accept');" ]
        }, {
          header: "getResponseText():String",
          description: "Returns response text",
          example: [ "var ajax = new Ajax('/users', {only_active: 1}, ArtJs.Ajax.Methods.GET);", "", "ajax.onSuccess.add(new Delegate(null, onAjaxSuccess));", "", "function onAjaxSuccess(ajax) {", "  alert(ajax.getResponseText());", "}", "", "ajax.request();" ]
        }, {
          header: "getStatus():Number",
          description: "Returns request status",
          example: [ "var ajax = new Ajax('/users', {only_active: 1}, ArtJs.Ajax.Methods.GET);", "", "ajax.request();", "", "// ... at some point during request", "ajax.getStatus();" ]
        }, {
          header: "getStatusText():String",
          description: "Returns request status text",
          example: [ "var ajax = new Ajax('/users', {only_active: 1}, ArtJs.Ajax.Methods.GET);", "", "ajax.request();", "", "// ... at some point during request", "ajax.getStatusText();" ]
        }, {
          header: "request():Void",
          description: "Performs request",
          example: [ "var ajax = new Ajax('/users', {only_active: 1}, ArtJs.Ajax.Methods.GET);", "", "ajax.onSuccess.add(new Delegate(this, this.onAjaxSuccess));", "", "ajax.request();" ]
        }, {
          header: "setRequestHeader(header:String, value:String):Void",
          description: "Sets request header",
          example: [ "var ajax = new Ajax('/users', {only_active: 1}, ArtJs.Ajax.Methods.GET);", "", "ajax.setRequestHeader('X-My-Header', 'hello');" ]
        } ]
      }, {
        name: "Static properties",
        members: [ {
          header: "Methods.DELETE",
          description: "DELETE method name ('DELETE')"
        }, {
          header: "Methods.GET",
          description: "GET method name ('GET')"
        }, {
          header: "Methods.POST",
          description: "POST method name ('POST')"
        }, {
          header: "Methods.PUT",
          description: "PUT method name ('PUT')"
        }, {
          header: "ReadyState.LOADED",
          description: "LOADED ready state (4)"
        }, {
          header: "ReadyState.OPEN",
          description: "OPEN ready state (1)"
        }, {
          header: "ReadyState.RECEIVING",
          description: "RECEIVING ready state (3)"
        }, {
          header: "ReadyState.SENT",
          description: "SENT ready state (2)"
        }, {
          header: "ReadyState.UNINITIALIZED",
          description: "UNINITIALIZED ready state (0)"
        } ]
      }, {
        name: "Static methods",
        members: [ {
          header: "del(url:String, data:Object, onSuccess:Delegate)",
          description: "Performs DELETE request",
          example: [ "var ajax = Ajax.del('/users/3', {name: 'Michael'}, new Delegate(this, this.onAjaxSuccess);" ]
        }, {
          header: "get(url:String, data:Object, onSuccess:Delegate)",
          description: "Performs GET request",
          example: [ "var ajax = Ajax.get('/users', {only_active: 1}, new Delegate(this, this.onAjaxSuccess);" ]
        }, {
          header: "post(url:String, data:Object, onSuccess:Delegate)",
          description: "Performs POST request",
          example: [ "var ajax = Ajax.post('/users', {name: 'Michael'}, new Delegate(this, this.onAjaxSuccess);" ]
        }, {
          header: "put(url:String, data:Object, onSuccess:Delegate)",
          description: "Performs PUT request",
          example: [ "var ajax = Ajax.put('/users/3', {name: 'Michael'}, new Delegate(this, this.onAjaxSuccess);" ]
        } ]
      } ]
    },
    array: {
      name: "ArrayUtils",
      "package": "com.arthwood.utils",
      description: "Provides set of methods that operates on any Array instance.<br/>" + 'Most of examples show optional use of a method when <span class="code">ArtJs.doInjection()</span> has been performed.',
      sections: [ {
        name: "Static methods",
        members: [ {
          header: "build(n:Integer, func:Function):Array",
          description: "Creates a new array with n items using func as factory. func receives index as the only parameter.",
          example: [ "var array = ArrayUtils.build(4, function(i) { return i * i; });" ]
        }, {
          header: "first():Object",
          description: "Returns first element of the array."
        }, {
          header: "second():Object",
          description: "Returns second element of the array."
        }, {
          header: "third():Object",
          description: "Returns third element of the array."
        }, {
          header: "last():Object",
          description: "Returns last element of the array."
        }, {
          header: "beforeLast():Object",
          description: "Returns last but one element of the array."
        }, {
          header: "getItem(i:Integer):Object",
          description: "Returns element on i-th position in the array."
        }, {
          header: "includes(i:*):Boolean",
          description: "Returns true if element exists in the array; false otherwise."
        }, {
          header: "includesAll(subset:Array):Boolean",
          description: "Returns true if all items in subet exist in the array."
        }, {
          header: "insertAt(index:Integer, insertion:Array):Void",
          description: "Inserts insertion array at index posion."
        }, {
          header: "removeAt(index:Integer):Void",
          description: "Removes element on index position."
        }, {
          header: "removeItem(i:*, onlyFirst:Boolean = false):Void",
          description: "Removes all occurences of i from the array or only first if second argument is true."
        }, {
          header: "arrify(index:Integer = 0):Array",
          description: 'Converts enumerable to array starting from index. Useful for "arguments" object conversion.'
        }, {
          header: "map(f:Function, context:Object = null):Array",
          description: "Maps an array using f iterator. Use context to set this reference inside the iterator."
        }, {
          header: "invoke(method:String, args:Array = []):Array",
          description: "Calls method on every item while passing args as an argument list. Returns array of results."
        }, {
          header: "pluck(property:String):Array",
          description: "Maps every item to its property value."
        }, {
          header: "each(f:Function, context:Object = null):Void",
          description: "Calls f for every item. Use context to set this reference inside the callback. " + "Callback receives item, index and array as a list of arguments."
        }, {
          header: "eachItem(f:Function, context:Object = null):Void",
          description: "Same as each but does not pass index to the callback."
        }, {
          header: "eachIndex(f:Function, context:Object = null):Void",
          description: "Same as each but does not pass item to the callback."
        }, {
          header: "inject(init:Object, f:Function, context:Object = null):Object",
          description: "Builds an object from array using f as an iterator. Use context to set this reference inside the iterator." + "Iterator receives result, item, index and array as a list of arguments." + "You can either update result object inside iterator or return the value which will update the result."
        }, {
          header: "flatten():Array",
          description: "Converts multidimentional array to 1-dim Array. Currently it flattens only 1 level deep."
        }, {
          header: "select(f:Function, context:Object = null):Array",
          description: "Filters the array leaving only elements for which iterator f returns true. " + "Use context to set this reference inside the iterator. " + "Iterator receives item, index and array as a list of arguments. " + "Returns new array without affecting the subject."
        }, {
          header: "$select(f:Function, context:Object = null):Void",
          description: "Filters the array by leaving elements for which iterator f returns true. " + "Use context to set this reference inside the iterator. " + "Iterator receives item, index and array as a list of arguments. " + "This method affects the subject."
        }, {
          header: "reject(f:Function, context:Object = null):Array",
          description: "Filters the array removing elements for which iterator f returns true. " + "Use context to set this reference inside the iterator. " + "Iterator receives item, index and array as a list of arguments. " + "Returns new array without affecting the subject."
        }, {
          header: "$reject(f:Function, context:Object = null):Void",
          description: "Filters the array by removing elements for which iterator f returns true. " + "Use context to set this reference inside the iterator. " + "Iterator receives item, index and array as a list of arguments. " + "This method affects the subject."
        }, {
          header: "detect(f:Function, context:Object = null):Object",
          description: "Returns first element for which iterator f returns true. " + "Use context to set this reference inside the iterator. " + "Iterator receives item, index and array as a list of arguments."
        }, {
          header: "equal(f:Function, context:Object = null):Boolean",
          description: "Returns true if all arrays in subject have the same items. " + "You can optionally pass f iterator to define equality criteria. See #uniq for more information." + "Use context to set this reference inside the iterator."
        }, {
          header: "areItemsEqual(f:Function, context:Object = null):Boolean",
          description: "Returns true if all items are equal. " + "You can optionally pass f iterator to define equality criteria. See #uniq for more information." + "Use context to set this reference inside the iterator."
        }, {
          header: "transpose():Array",
          description: "Returns new Array with switched rows and columns. "
        }, {
          header: "all(f:Function, context:Object = null):Boolean",
          description: "Returns true if iterartor f returns true for all items. " + "Use context to set this reference inside the iterator."
        }, {
          header: "any(f:Function, context:Object = null):Boolean",
          description: "Returns true if iterartor f returns true for at least one item. " + "Use context to set this reference inside the iterator."
        }, {
          header: "partition(f:Function, context:Object = null):Array",
          description: "Returns Point object with x property set to array of elements for each f iterator returns true and " + "y property for each f iterator returns false. " + "Use context to set this reference inside the iterator."
        }, {
          header: "uniq(f:Function = identity, context:Object = null):Array",
          description: "Returns new Array with first occurences of duplicatied objects. " + "Use f iterator to define equality criteria. " + "Use context to set this reference inside the iterator."
        }, {
          header: "groupBy(f:Function = identity, context:Object = null, keepOrder:Boolean = false):Object",
          description: "Returns Object whose keys are unique results of f iterator and values are items for which iterator returns that key. " + "Use f iterator to define equality criteria." + "Use context to set this reference inside the iterator. " + "If you pass keepOrder as true, then the result is an Array of Points object with x and y values equal to key and values as described above respectively."
        }, {
          header: "indexOf(item:Object):Integer",
          description: "Returns position of given item."
        }, {
          header: "intersection(arr:Array):Array",
          description: "Returns Array of shared elements. Argument is an array of arrays to be tested."
        }, {
          header: "selectNonEmpty():Array",
          description: "Should be called on 2-dim array. Returns new Array with empty Arrays removed."
        }, {
          header: "compact():Array",
          description: "Returns new Array with null or undefined items removed."
        }, {
          header: "isEmpty():Boolean",
          description: "Returns true if array is empty; false otherwise."
        }, {
          header: "numerize():Array",
          description: "Returns new array with items cast to Number."
        }, {
          header: "print():Void",
          description: "Prints out every item using ArtJs.p method."
        }, {
          header: "sum():Number",
          description: "Returns sum of all elements."
        }, {
          header: "stringify():Array",
          description: "Returns new array with items cast to String."
        } ]
      } ]
    },
    object: {
      name: "ObjectUtils",
      "package": "com.arthwood.utils",
      description: "Provides set of methods that operates on any Object instance.<br/>" + 'Most of examples show optional use of a method when <span class="code">ArtJs.doInjection()</span> has been performed.',
      sections: [ {
        name: "Static methods",
        members: [ new art.model.Member("all(object:Object, callback:Function):Boolean", 'Returns true if for all values <span class="code">callback</span> returns true; false otherwise', [ "var object = {color: 'white', id: 5};", "", "ObjectUtils.all(object, function(i) {", "  return i !== false;", "}); // true ", "// or ", "// object.all(function(i) {", "  return i !== false;", "});", "", "ObjectUtils.all(object, function(i) {", "  return !isNaN(parseInt(i));", "}); // false", "// or", "// object.all(function(i) {", "  return !isNaN(parseInt(i));", "});" ]), new art.model.Member("copy(object:Object):Object", 'Creates a copy of an <span class="param">object</span>.', [ "var object = {id: 4};", "var copy = ObjectUtils.copy(object);", "", "// or", "// var copy = object.copy();", "", "object.id = 5;", "object.id; // 5", "copy.id; // 4" ]), new art.model.Member("copyProps(source:Object, target:Object):Void", 'Copies properties from <span class="param">source</span> object to <span class="param">target</span> object.', [ "var source = {id: 4};", "var target = {active: true};", "", "ObjectUtils.copyProps(source, target);", "", "// or", "// source.copyProps(target);", "", "source; // {id: 4}", "target; // {active: true, id: 4}" ]), new art.model.Member("each(object:Object, callback:Function):Void", 'Iterates over properties and passes value to <span class="param">callback</span>', [ "var object = {id: 4, active: true, project_id: 4, status: '4'};", "ObjectUtils.each(object, function(i) {", "  alert(i);", "});", "", "// or", "// object.each(function(i) {", "//   alert(i);", "// });" ]), new art.model.Member("eachKey(object:Object, callback:Function):Void", 'Iterates over properties and passes key to <span class="param">callback</span>', [ "var object = {id: 4, active: true, project_id: 4, status: '4'};", "ObjectUtils.eachKey(object, function(i) {", "  alert(i);", "});", "", "// or", "// object.eachKey(function(i) {", "//   alert(i);", "// });" ]), new art.model.Member("eachPair(object:Object, callback:Function):Void", 'Iterates over properties and passes key and value to <span class="code">callback</span>', [ "var object = {id: 4, active: true, project_id: 4, status: '4'};", "ObjectUtils.eachPair(object, function(k, v) {", "  alert(k + ' -> ' + v);", "});", "", "// or", "// object.eachPair(function(k, v) {", "//   alert(k + ' -> ' + v);", "// });" ]), new art.model.Member("isEmpty(object:Object):Boolean", 'Returns true if <span class="code">object</span> has no properties; false otherwise', [ "var object = {id: 4, active: true, project_id: 4, status: '4'};", "var empty = {};", "", "ObjectUtils.isEmpty(object); // false", "// or", "// object.isEmpty();", "", "ObjectUtils.isEmpty(empty); // true", "// or", "// empty.isEmpty();" ]), new art.model.Member("extend(target:Object, base:Object):Void", 'Copies properties from <span class="param">base</span> object to <span class="param">target</span> object.' + 'In fact it works the same as <span class="code">copyProps()</span>, the only difference is arguments order.', [ "var base = {id: 4};", "var target = {active: true};", "", "ObjectUtils.extend(target, base);", "", "// or", "// target.extend(base);", "", "base; // {id: 4}", "target; // {active: true, id: 4}" ]), new art.model.Member("fromArray(array:Array):Object", 'Transforms 2-dim <span class="code">array</span> into object', [ "var array = [['color', 'white'], ['id', 5]];", "", "ObjectUtils.fromArray(array); // {color: 'white', id: 5}" ]), new art.model.Member("include(object:Object, item:Object):Boolean", 'Returns true if any <span class="code">object</span> value is equal to <span class="code">item</span>; false otherwise', [ "var object = {color: 'white', id: 5};", "", "ObjectUtils.include(object, 5); // true", "// or", "// object.include(5);", "", "ObjectUtils.include(object, true); // false", "// or", "// object.include(true);" ]), new art.model.Member("includeAll(object:Object, subset:Object):Boolean", 'Returns true if all <span class="code">subset</span> values can be found among <span class="code">object</span>\'s values; false otherwise', [ "var object = {color: 'white', id: 5};", "", "ObjectUtils.includeAll(object, {color: 'white', id: 5}); // true", "// or", "// object.includeAll({color: 'white', id: 5});", "", "ObjectUtils.includeAll(object, {id: 5, name: 'Mike'}); // false", "// or", "// object.includeAll({id: 5, name: 'Mike'});" ]), new art.model.Member("map(object:Object, callback:Function):Array", 'Maps key and value to Array item using <span class="param">callback</span> function', [ "var object = {id: 4, active: true, project_id: 4, status: '4'};", "var mapped = ObjectUtils.map(object, function(k, v) {return k + ':' + v});", "", "// or", "// var mapped = object.map(function(k, v) {return k + ':' + v});", "", "mapped; // ['id:4', 'active:true', 'project_id:4', 'status:4']" ]), new art.model.Member("mapKey(object:Object, callback:Function):Object", 'Transforms key using <span class="param">callback</span> function', [ "var object = {id: 4, active: true, project_id: 4, status: '4'};", "var mapped = ObjectUtils.mapKey(object, function(k) {", "  return StringUtils.capitalizeUnderscored(k);", "});", "", "// or", "// var mapped = object.mapKey(function(k) {", "//   return StringUtils.capitalizeUnderscored(k);", "// });", "", "mapped; // {Id: 8, Active: 2, ProjectId: 8, Status: 8}" ]), new art.model.Member("mapValue(object:Object, callback:Function):Object", 'Transforms value using <span class="param">callback</span> function', [ "var object = {id: 4, active: true, project_id: 4, status: '4'};", "var mapped = ObjectUtils.mapValue(object, function(v) {return v * 2});", "", "// or", "// var mapped = object.mapValue(function(v) {return v * 2});", "", "mapped; // {id: 8, active: 2, project_id: 8, status: 8}" ]), new art.model.Member("merge(target:Object, base:Object):Object", 'Works the same as extend() but returns modified <span class="param">target</span> object.', [ "var base = {id: 4};", "var target = {active: true};", "", "ObjectUtils.merge(target, base); // {active: true, id: 4}", "", "// or", "// target.merge(base);", "", "base; // {id: 4}", "target; // {active: true, id: 4}" ]), new art.model.Member("reject(object:Object, callback:Function):Object", 'Returns copy of <span class="code">object</span> without properties for which <span class="code">callback</span> returns true', [ "var object = {id: 4, active: true, project_id: 4, status: '4'};", "var filtered = ObjectUtils.reject(object, function(i) {", "  return i === true;", "});", "", "// or", "// object.reject(function(i) {", "//   return i === true;", "// });", "", "filtered; // {id: 4, project_id: 4, status: '4'}" ]), new art.model.Member("removeValue(object:Object, value:Object):Void", 'Removes all <span class="param">object</span>\'s properties with value equal to <span class="param">value</span> param', [ "var object = {id: 4, active: true, project_id: 4, status: '4'};", "", "ObjectUtils.removeValue(object, 4);", "", "// or", "// object.removeValue(4);", "", "object; // {active: true, status: '4'}" ]), new art.model.Member("removeValues(object:Object, values:Array):Void", 'Works the same as removeValue but you can remove many <span class="param">values</span> by passing them in array', [ "var object = {id: 4, active: true, project_id: 4, status: '4'};", "", "ObjectUtils.removeValues(object, [4, '4']);", "", "// or", "// object.removeValues([4, '4']);", "", "object; // {active: true}" ]), new art.model.Member("select(object:Object, callback:Function):Object", 'Returns copy of <span class="code">object</span> containing only properties for which <span class="code">callback</span> returns true', [ "var object = {id: 4, active: true, project_id: 4, status: '4'};", "var filtered = ObjectUtils.select(object, function(i) { ", "  return !isNaN(parseFloat(i));", "});", "", "// or", "// object.select(function(i) {", "//   return !isNaN(parseFloat(i));", "// });", "", "filtered; // {id: 4, project_id: 4, status: '4'}" ]), new art.model.Member("selectWithKey(object:Object, callback:Function):Object", 'Same as select, but <span class="code">callback</span> receives both key and value', [ "var object = {id: 4, active: true, project_id: 4, status: '4'};", "var filtered = ObjectUtils.selectWithKey(object, function(k, v) {", "  return k.length > 2;", "});", "", "// or", "// object.selectWithKey(function(k, v) {", "//   return k.length > 2;", "// });", "", "filtered; // {active: true, project_id: 4, status: '4'}" ]), new art.model.Member("toArray(object:Object):Array", 'Transforms <span class="code">object</span> into array', [ "var object = {color: 'white', id: 5};", "", "ObjectUtils.toArray(object); // [['color', 'white'], ['id', 5]]", "// or", "// object.toArray();" ]), new art.model.Member("toQueryString(object:Object):String", 'Returns query string representation of <span class="code">object</span>', [ "var object = {color: 'white', id: 5, user: {name: 'Andy', id: 3}};", "", "ObjectUtils.toQueryString(object);// color=white&id=5&user[name]=Andy&user[id]=3", "// or", "// object.toQueryString()" ]) ]
      } ]
    },
    "class": {
      name: "Class",
      "package": "com.arthwood.utils",
      description: "Facilitates class construction inheritance.",
      sections: [ {
        name: "Usage",
        members: [ new art.model.Member("Class(ctor:Function = null, proto:Object = null, stat:Object = null, superclass:Function = null):Function", "Creates a new class. Returns decorated constructor function passed as a first argument. " + "If no constructor is passed a default one is created.", [ "var MyClass = ArtJs.Class(", "  function(name) {", "    this.name = this.super(attributes) + ':' + name", "  }, ", "  {", "    calculate: function(value) {", "     return this.super(attributes, 3, 'hello') + 8;", "  }, ", "  {", "    getName: function() {", "      return this.super(attributes) + ':MyClass';", "  },", "  MySuperClass", ");" ], {
          ctor: "Constructor function",
          proto: "Prototype object. Instance properties and methods of the class.",
          stat: "Class properties and methods.",
          superclass: "Class to extend from."
        }, "As you can see in example when extending the class you have access to super method from Constructor " + "function, instance methods and static methods. You always have to pass arguments object." + "If no additional params are passed then by default all arguments are passed to super method." + "However if you pass any additional arguments then they override actual arguments list and the actual " + "arguments list gets appended to the end of your custom list.") ]
      }, {
        name: "Instance properties",
        members: [ new art.model.Member("ctor:Function", "Reference to constructor function.") ]
      }, {
        name: "Static properties",
        members: [ new art.model.Member("superclass:Function", "Reference to constructor function of the parent class."), new art.model.Member("subclasses:Array", "Stores all subclasses of given class.") ]
      }, {
        name: "Hooks",
        members: [ new art.model.Member("_onCreated():Void", "Invoked as a static method when class construction has completed.<br/>" + "Useful for class initialization. Some of class properties are set at this point.<br/>" + "You must always call super when implementing this hook.", [ "_onCreated: function() {", "  this.super(arguments);", "", "  console.log(this.subclasses);", "}" ]), new art.model.Member("_onExtended():Void", "Invoked as a static method when subclass construction has completed.<br/>" + "Useful for class initialization. Some of class properties are set at this point.<br/>" + "You must always call super when implementing this hook.", [ "_onExtended: function() {", "  this.super(arguments);", "", "  console.log(this.superclass + ' has been extended by ' + this);", "}" ]) ]
      } ]
    },
    date: {
      name: "DateUtils",
      "package": "com.arthwood.utils",
      description: "Provides set of methods that operates on any Date instance.",
      sections: [ {
        name: "Static methods",
        members: [ new art.model.Member("copy(date:Date):Date", 'Returns <span class="param">date</span> copy', [ "var date = new Date(); // Tue Jun 04 2010 15:41:32 GMT+0200 {}", "var copy = DateUtils.copy(date);", "", "// or", "// var copy = date.copy();", "", "date.setDate(6);", "date; // Tue Jun 06 2010 15:41:32 GMT+0200 {}", "copy; // Tue Jun 04 2010 15:41:32 GMT+0200 {}" ]), new art.model.Member("firstDay(date:Date):Number", 'Returns week day of first day in <span class="param">date</span>\'s month (1 means Monday)', [ "var date = new Date(); // Tue Jun 04 2010 15:41:32 GMT+0200 {}", "", "DateUtils.firstDay(date); // 2", "// or", "// date.firstDay();" ]), new art.model.Member("fromDMY(dmy:String, separator:String = '/'):Date", 'Parses <span class="param">dmy</span> (&lt;day&gt;/&lt;month&gt;/&lt;year&gt;) expression and returns Date object', [ "var date = DateUtils.fromDMY('7/10/2003'); // Tue Oct 07 2003 00:00:00 GMT+0200 {}" ]), new art.model.Member("getDateShifted(date:Date, days:Number):Date", 'Returns date <span class="param">days</span> after (before if negative) <span class="param">date</span>', [ "var date = new Date(); // Tue Jun 07 2010 15:41:32 GMT+0200 {}", "var shifted = DateUtils.getDateShifted(date, -3); // Tue Jun 04 2010 15:41:32 GMT+0200 {}", "", "// or", "// var shifted = date.getDateShifted(-3);" ]), new art.model.Member("hmToMinutes(hm:String, separator:String = ':'):Number", 'Parses <span class="param">hm</span> (&lt;hours&gt;:&lt;minutes&gt;) expression and returns Number of minutes', [ "var date = DateUtils.hmToMinutes('2:15'); // 135" ]), new art.model.Member("minutesToHM(minutes:Number, separator:String = ':'):String", 'Returns &lt;hours&gt;:&lt;minutes&gt; format for given amount of <span class="param">minutes</span>', [ "var date = DateUtils.minutesToHM(135); // '2:15'" ]), new art.model.Member("monthDaysNum(date:Date):Number", 'Returns number of days in <span class="param">date</span>\'s month', [ "var date = new Date(); // Tue Jun 04 2010 15:41:32 GMT+0200 {}", "", "DateUtils.monthDaysNum(date); // 30", "// or", "// date.monthDaysNum();" ]), new art.model.Member("msToSeconds(ms:String, separator:String = ':'):Number", 'Parses <span class="param">ms</span> (&lt;minutes&gt;:&lt;seconds&gt;) expression and returns Number of seconds', [ "var date = DateUtils.msToSeconds('02:15'); // 135" ]), new art.model.Member("secondsToHMS(seconds:Number, separator:String = ':'):String", 'Returns &lt;hours&gt;:&lt;minutes&gt;:&lt;seconds&gt; format for given amount of <span class="param">seconds</span>', [ "var date = DateUtils.secondsToMS(4350); // '1:12:30'" ]), new art.model.Member("secondsToMS(seconds:Number, separator:String = ':'):String", 'Returns &lt;minutes&gt;:&lt;seconds&gt; format for given amount of <span class="param">seconds</span>', [ "var date = DateUtils.secondsToMS(135); // '02:15'" ]), new art.model.Member("stripDayTime(date:Date):Date", "Returns date without time part", [ "var date = new Date(); // Tue Jun 07 2010 15:41:32 GMT+0200 {}", "var stripped = DateUtils.stripDayTime(date); // Tue Jun 07 2010 00:00:00 GMT+0200 {}", "", "// or", "// var stripped = date.stripDayTime();" ]), new art.model.Member("toDMY(date:Date, separator:String = '/'):String", 'Returns <span class="param">date</span>\'s string representation of day, month, year', [ "var date = new Date(); // Tue Jun 04 2010 15:41:32 GMT+0200 {}", "", "DateUtils.toDMY(date); // '04/06/2010'", "// or", "// date.toDMY();" ]), new art.model.Member("toHMS(date:Date, separator:String = ':'):String", 'Returns <span class="param">date</span>\'s string representation of hour, minute, second', [ "var date = new Date(); // Tue Jun 04 2010 15:41:32 GMT+0200 {}", "", "DateUtils.toHMS(date); // '15:41:32'", "// or", "// date.toHMS();" ]), new art.model.Member("toYMD(date:Date, separator:String = '/'):String", 'Returns <span class="param">date</span>\'s string representation of year, month, day', [ "var date = new Date(); // Tue Jun 04 2010 15:41:32 GMT+0200 {}", "", "DateUtils.toYMD(date); // '2010/06/04'", "// or", "// date.toYMD();" ]) ]
      } ]
    },
    element: {
      name: "ElementUtils",
      "package": "com.arthwood.utils",
      description: "Provides set of methods that operate on HTML Element instance.",
      sections: [ {
        name: "Static methods",
        members: [ new art.model.Member("addClass(element:Element, name:String):Void", 'Adds class identified by <span class="param">name</span> to <span class="param">element</span>' + "(only if it doesn't already have this class)", [ "ElementUtils.addClass(element, 'nav');", "", "// or", "// element.addClass('nav');" ]), new art.model.Member("center(element:Element):Void", 'Centers <span class="param">element</span> on the screen.' + "This action takes effect only for elements with absolute position.", [ "ElementUtils.center(element);", "", "// or", "// element.center();" ]), new art.model.Member("centerH(element:Element):Void", 'Centers <span class="param">element</span> horizontally on the screen.' + "This action takes effect only for elements with absolute position.", [ "ElementUtils.centerH(element);", "", "// or", "// element.centerH();" ]), new art.model.Member("centerV(element:Element):Void", 'Centers <span class="param">element</span> vertically on the screen.' + "This action takes effect only for elements with absolute position", [ "ElementUtils.centerV(element);", "", "// or", "// element.centerV();" ]), new art.model.Member("clone(element:Element, deep:Boolean):Node", "Alias for Node.cloneNode(deep).", [ "ElementUtils.clone(element, true);", "", "// or", "// element.clone(true);" ]), new art.model.Member("disable(element:Element):Void", 'Disables the <span class="param">element</span>.', [ "ElementUtils.disable(element);", "", "// or", "// element.disable();" ]), new art.model.Member("elements(element:Element):Array", 'Returns array of immediate descendants (Elements) of <span class="param">element</span>', [ "ElementUtils.elements(element);", "", "// or", "// element.elements();" ]), new art.model.Member("enable(element:Element):Void", 'Enables the <span class="param">element</span>', [ "ElementUtils.enable(element);", "", "// or", "// element.enable();" ]), new art.model.Member("firstElement(element:Element):Element", 'Returns <span class="param">element</span>\'s first child (Element)', [ "ElementUtils.firstElement(element);", "", "// or", "// element.firstElement();" ]), new art.model.Member("getAttributes(element:Element):Object", "Returns attributes as an Object", [ "ElementUtils.getAttributes(element);", "", "// or", "// element.getAttributes();" ]), new art.model.Member("getBounds(element:Element, real:Boolean, withoutScroll:Boolean):Rectangle", 'Returns position and size of <span class="param">element</span> as a (x, y, width, height) Rectangle.', [ "ElementUtils.getBounds(element);", "", "// or", "// element.getBounds();" ], null, 'If <span class="param">real</span> is set to true size is calculated even if element is hidden' + "(otherwise size would return value of (0, 0))." + 'If <span class="param">withoutScroll</span> is set to true posision is calculated relative to' + "current view's origin; otherwise to document's origin."), new art.model.Member("getCenteredPosition(element:Element):Point", 'Returns position of <span class="param">element</span> as if it was centered on the screen', [ "ElementUtils.getCenteredPosition(element);", "", "// or", "// element.getCenteredPosition();" ]), new art.model.Member("getClasses(element:Element):Array", 'Returns array of <span class="param">element</span>\'s classes', [ "ElementUtils.getClasses(element);", "", "// or", "// element.getClasses();" ]), new art.model.Member("getContent(element:Element):String", 'Returns content (like innerHTML) of <span class="param">element</span>', [ "ElementUtils.getContent(element);", "", "// or", "// element.getContent();" ]), new art.model.Member("getDocumentSize():Point", "Returns document size", [ "ElementUtils.getDocumentSize();" ]), new art.model.Member("getPosition(element:Element, withoutScroll:Boolean):Point", 'Returns position of the <span class="param">element</span> on the screen.', [ "ElementUtils.getPosition(element);", "", "// or", "// element.getPosition();" ], null, 'If <span class="param">withoutScroll</span> is set to true posision is calculated relative to' + "current view's origin; otherwise to document's origin"), new art.model.Member("getScrollPosition():Point", "Returns scroll (x, y) values as a Point", [ "ElementUtils.getScrollPosition();" ]), new art.model.Member("getSize(element:Element):Point", 'Returns size of the <span class="param">element</span> as a com.arthwood.math.Point object' + "which x property is width and y property is height", [ "ElementUtils.getSize(element);", "", "// or", "// element.getSize();" ]), new art.model.Member("getWindowSize():Point", "Returns window size", [ "ElementUtils.getWindowSize();" ]), new art.model.Member("hasClass(element:Element, name:String):Boolean", 'Returns true if <span class="param">element</span> has class <span class="param">name</span>;' + "false otherwise", [ "ElementUtils.hasClass(element, 'nav');", "", "// or", "// element.hasClass('nav');" ]), new art.model.Member("hide(element:Element):Void", 'Hides the <span class="param">element</span>', [ "ElementUtils.hide(element);", "", "// or", "// element.hide();" ]), new art.model.Member("isElement(element:Element):Boolean", 'Returns true if <span class="param">element</span> is Element; false otherwise', [ "ElementUtils.isElement(element);", "", "// or", "// element.isElement();" ]), new art.model.Member("isHidden(element:Element):Boolean", 'Returns true if the <span class="param">element</span> is hidden; true otherwise', [ "ElementUtils.isHidden(element);", "", "// or", "// element.isHidden();" ]), new art.model.Member("next(element:Element):Node", 'Returns <span class="param">element</span>\'s next sibling (Element)', [ "ElementUtils.next(element);", "", "// or", "// element.next();" ]), new art.model.Member("parent(element:Element):Element", 'Returns <span class="param">element</span>\'s parent element', [ "ElementUtils.parent(element);", "", "// or", "// element.parent();" ]), new art.model.Member("prev(element:Element):Node", 'Returns <span class="param">element</span>\'s previous sibling (Element)', [ "ElementUtils.prev(element);", "", "// or", "// element.prev();" ]), new art.model.Member("putAfter(element:Element, ref:Node):Node", 'Inserts clone of the <span class="param">element</span> as next sibling of <span class="param">ref</span> node', [ "ElementUtils.putAfter(element, child);", "", "// or", "// element.putAfter(child);" ]), new art.model.Member("putAtBottom(element:Element, ref:Node):Node", 'Inserts clone of the <span class="param">element</span> as the last child of <span class="param">ref</span> node', [ "ElementUtils.putAtBottom(element, container);", "", "// or", "// element.putAtBottom(container);" ]), new art.model.Member("putAtTop(element:Element, ref:Node):Node", 'Inserts clone of the <span class="param">element</span> as the first child of <span class="param">ref</span> node', [ "ElementUtils.putAtTop(element, container);", "", "// or", "// element.putAtTop(container);" ]), new art.model.Member("putBefore(element:Element, ref:Node):Node", 'Inserts clone of the <span class="param">element</span> as previous sibling of <span class="param">ref</span> node', [ "ElementUtils.putBefore(element, child);", "", "// or", "// element.putBefore(child);" ]), new art.model.Member("remove(element:Element):Node", 'Removes the <span class="param">element</span>', [ "ElementUtils.remove(element);", "", "// or", "// element.remove();" ]), new art.model.Member("removeClass(element:Element, name:String):Void", 'Removes class identified by <span class="param">name</span> from <span class="param">element</span> (only if it have this class)', [ "ElementUtils.removeClass(element, 'nav');", "", "// or", "// element.removeClass('nav');" ]), new art.model.Member("replace(element:Element, ref:Node, clone:Boolean):Node", 'Replaces <span class="param">ref</span> with an <span class="param">element</span> ' + '(or its clone if <span class="param">clone</span> is set to true)', [ "ElementUtils.replace(element, oldElement, true);", "", "// or", "// element.replace(oldElement, true);" ]), new art.model.Member("serialize(element:Element):Object", 'Serializes content of <span class="param">element</span> (usually form) and returns its data as Object', [ "ElementUtils.serialize(element);", "", "// or", "// element.serialize();" ]), new art.model.Member("setAlpha(element:Element, value:Number):Void", 'Sets <span class="param">element</span>\'s transparency; <span class="param">value</span> 0 means transparent, 1 means opaque', [ "ElementUtils.setAlpha(element, 0.4);", "", "// or", "// element.setAlpha(0.4);" ]), new art.model.Member("setClass(element:Element, name:String, add:Boolean):Void", 'If <span class="param">add</span> is true it adds, otherwise removes class identified by' + '<span class="param">name</span> to <span class="param">element</span>', [ "ElementUtils.setClass(element, 'nav', true);", "", "// or", "// element.setClass('nav', true);" ]), new art.model.Member("setContent(element:Element, content:String):Void", 'Sets the content (like innerHTML) of <span class="param">element</span>', [ "ElementUtils.setContent(element, 'hello &lt;span&gt;world&lt;/span&gt;!');", "", "// or", "// element.setContent('hello &lt;span&gt;world&lt;/span&gt;!');" ]), new art.model.Member("setEnabled(element:Element, enabled:Boolean):Void", 'Enables <span class="param">element</span> if <span class="param">enabled</span> is true; disables otherwise', [ "ElementUtils.setEnabled(element, true);", "", "// or", "// element.setEnabled(true);" ]), new art.model.Member("setPosition(element:Element, position:Point):Void", 'Sets the position of <span class="param">element</span> on the screen. ' + "This action has effect for elements with absolute position", [ "ElementUtils.setPosition(element, point);", "", "// or", "// element.setPosition(point);" ]), new art.model.Member("setVisible(element:Element, visible:Boolean):Void", 'Shows the <span class="param">element</span> if <span class="param">visible</span> argument is set to true; hides otherwise', [ "ElementUtils.setVisible(element, true);", "", "// or", "// element.setVisible(true);" ]), new art.model.Member("setX(element:Element, value:Number):Void", 'Sets x position of <span class="param">element</span> on the screen. ' + "This action has effect for elements with absolute position", [ "ElementUtils.setX(130);", "", "// or", "// element.setX(130);" ]), new art.model.Member("setY(element:Element, value:Number):Void", 'Sets y position of <span class="param">element</span> on the screen. ' + "This action has effect for elements with absolute position", [ "ElementUtils.setY(130);", "", "// or", "// element.setY(130);" ]), new art.model.Member("show(element:Element):Void", 'Shows the <span class="param">element</span>', [ "ElementUtils.show(element);", "", "// or", "// element.show();" ]), new art.model.Member("toggle(element:Element):Void", 'Shows the <span class="param">element</span> if it\'s hidden; hides otherwise', [ "ElementUtils.toggle(element);", "", "// or", "// element.toggle();" ]), new art.model.Member("toggleClass(element:Element, name:String):Void", 'Toggles class identified by <span class="param">name</span> of <span class="param">element</span>', [ "ElementUtils.toggleClass(element, 'nav');", "", "// or", "// element.toggleClass('nav');" ]) ]
      } ]
    },
    math: {
      name: "MathUtils",
      "package": "com.arthwood.utils",
      description: "Provides set of math functions.",
      sections: [ {
        name: "Static methods",
        members: [ new art.model.Member("limit(x:Number, a:Number, b:Number):Number", 'Returns <span class="param">x</span> value limited to [<span class="param">a</span>, <span class="param">b</span>] range', [ "MathUtils.limit(6, 2, 13); // 6", "MathUtils.limit(6, 8, 13); // 8", "MathUtils.limit(6, -2, 3); // 3" ]), new art.model.Member("sawtooth(x:Number, a:Number, b:Number):Number", 'Returns <span class="param">x</span> value periodically limited to ' + '[<span class="param">a</span>, <span class="param">b</span>] range', [ "MathUtils.sawtooth(6, 2, 13); // 6", "MathUtils.sawtooth(6, 8, 13); // 11", "MathUtils.sawtooth(6, -2, 3); // 1" ]), new art.model.Member("sgn(x:Number):Number", 'Signum function of <span class="param">x</span>', [ "MathUtils.sgn(-2); // -1", "MathUtils.sgn(0); // 0", "MathUtils.sgn(15); // 1" ]), new art.model.Member("stairs(x:Number, a:Number, b:Number):Number", '"stairs" function of <span class="param">x</span>', [ "MathUtils.stairs(6, 2, 4); // 2", "MathUtils.stairs(6, 1, 2); // 5", "MathUtils.stairs(6, -1, 1); // 3" ]) ]
      } ]
    },
    string: {
      name: "StringUtils",
      "package": "com.arthwood.utils",
      description: "Provides set of methods that operates on any String instance.",
      sections: [ {
        name: "Static methods",
        members: [ new art.model.Member("align(string:String, length:Number, char:String, left:Boolean):String", 'Extends length of the <span class="code">string</span> to <span class="code">length</span> value by filling' + 'the gap with <span class="code">char</span> characters on the side determined by ' + '<span class="code">left</span> argument', [ "var string = 'color';", "", "StringUtils.align(string, 10, '-', true); // color-----", "// or", "// string.align(10, '-', true);" ]), new art.model.Member("isBlank(string:String):Boolean", 'Returns true if <span class="code">string</span> is null or empty; false otherwise', [ "var string = 'quantum mechanics';", "var emptyString = '      ';", "var nullValue = null;", "", "StringUtils.isBlank(string); // false", "// or", "// string.isBlank();", "", "StringUtils.isBlank(emptyString); // true", "// or", "// emptyString.isBlank();", "", "StringUtils.isBlank(nullValue); // true" ]), new art.model.Member("capitalize(string:String):String", 'Upcase each word in <span class="code">string</span>', [ "var string = 'advanced quantum mechanics';", "", "StringUtils.capitalize(string); // Advanced Quantum Mechanics", "// or", "// string.capitalize();" ]), new art.model.Member("countPattern(string:String, pattern:String):Number", 'Returns number of <span class="code">pattern</span> occurences in <span class="code">string</span>', [ "var string = 'advanced quantum mechanics';", "", "StringUtils.countPattern(string, 'an'); // 3", "// or", "// string.countPattern('an');" ]), new art.model.Member("isEmpty(string:String):Boolean", 'Returns true if <span class="code">string</span> is empty; false otherwise', [ "var string = 'quantum mechanics';", "var emptyString = '      ';", "", "StringUtils.isEmpty(string); // false", "// or", "// string.isEmpty();", "", "StringUtils.isEmpty(emptyString); // true", "// or", "// emptyString.isEmpty();" ]), new art.model.Member("first(string:String):String", 'Returns first letter of a <span class="code">string</span>', [ "var string = 'quantum mechanics';", "", "StringUtils.first(string); // q", "// or", "// string.first();" ]), new art.model.Member("formatPrice(value:Number):String", "Returns price formatted string", [ "var price = 3.7;", "", "StringUtils.formatPrice(price); // 3.70" ]), new art.model.Member("getMultiPattern(pattern:String, n:Number):String", 'Returns string containing of <span class="code">pattern</span> concatenated <span class="code">n</span> times', [ "var string = 'yes, ';", "", "StringUtils.getMultiPattern(string, 3); // yes, yes, yes,", "// or", "// string.getMultiPattern(3);" ]), new art.model.Member("last(string:String):String", 'Returns last letter of a <span class="code">string</span>', [ "var string = 'quantum mechanics';", "", "StringUtils.last(string); // s", "// or", "// string.last();" ]), new art.model.Member("nullifyEmpty(string:String):Object", 'Returns null if <span class="code">string</span> is empty; <span class="code">string</span> otherwise', [ "var string = 'quantum mechanics';", "var emptyString = '      ';", "", "StringUtils.nullifyEmpty(string); // quantum mechanics", "// or", "// string.nullifyEmpty();", "", "StringUtils.nullifyEmpty(emptyString); // null", "// or", "// emptyString.nullifyEmpty();" ]), new art.model.Member("singularOrPlural(string:String, n:Number):String", 'Returns plural version of <span class="code">string</span> if <span class="code">n</span> is other than 1', [ "var string = 'chicken';", "", "StringUtils.singularOrPlural(string, 1); // chicken", "// or", "// string.singularOrPlural(1);", "", "StringUtils.singularOrPlural(string, 5); // chickens", "// or", "// string.singularOrPlural(5);" ]), new art.model.Member("strip(string:String):String", 'Removes whitespaces from <span class="code">string</span> and returns the result', [ "var string = 'quantum mechanics';", "", "StringUtils.strip(string); // quantummechanics", "// or", "// string.strip();" ]), new art.model.Member("sub(string:String, start:Number, end:Number):String", "Periodic version of String.substring()", [ "var string = 'quantum mechanics';", "", "StringUtils.sub(string, -2, 4); // csquan", "// or", "// string.sub(-2, 4);" ]), new art.model.Member("toJson(string:String):Object", 'Converts <span class="code">string</span> JSON format to Object', [ "var string = \"{id: 5, name: 'Mike'}\";", "", "StringUtils.toJson(string); // {id: 5, name: 'Mike'}", "// or", "// string.toJson();" ]), new art.model.Member("toS(string:String):String", 'Returns empty string if <span class="code">string</span> is null; <span class="code">string</span> otherwise', [ "var string = 'quantum mechanics';", "var nullValue = null;", "", "StringUtils.toS(string); // quantum mechanics", "StringUtils.toS(nullValue); // (empty string)" ]), new art.model.Member("trim(string:String):String", 'Remove all the whitespaces from the begining and the end of the <span class="code">string</span>', [ "var string = '    quantum mechanics  ';", "", "StringUtils.trim(string); // quantum mechanics", "// or", "// string.trim();" ]), new art.model.Member("truncate(string:String, n:Number, end:String = '...'):String", 'Truncates <span class="code">string</span> to length <span class="code">n</span> and appends <span class="code">end</span>', [ "var string = 'quantum field theory';", "", "StringUtils.truncate(string, 8); // quantum...", "// or", "// string.truncate(8);" ]) ]
      } ]
    },
    toggler: {
      name: "Toggler",
      "package": "com.arthwood.utils",
      description: "Defines a single element container. " + "Whenever you put a new one the old pops out and appropriate events are triggered",
      sections: [ {
        name: "Constructor",
        members: [ new art.model.Member("Toggler(unique:Boolean = nil)", null, null, {
          unique: "if true, events won't be triggered when toggling to the same object."
        }) ]
      }, {
        name: "Properties",
        members: [ new art.model.Member("unique:Boolean", "The same as in constructor."), new art.model.Member("current:Object", "Returns current element.") ]
      }, {
        name: "Methods",
        members: [ new art.model.Member("toggle(element:Object):Void", "Puts a new object into container. The previous one pops out.") ]
      }, {
        name: "Events",
        members: [ new art.model.Member("onActivate()", "Triggered when new element has been put into the container."), new art.model.Member("onDeactivate()", "Triggered when element pops out from the container.") ]
      } ]
    },
    log: {
      name: "Log",
      "package": "com.arthwood.utils",
      description: "Allows you to output debug messages.",
      sections: [ {
        name: "Static methods",
        members: [ new art.model.Member("log(args...:*):Void", "Uses internally console.log to display messages."), new art.model.Member("p(args...:*):Void", "Alias method for log().") ]
      } ]
    },
    "transition/blind": {
      name: "Blind",
      "package": "com.arthwood.transition",
      description: 'Allows to apply "Blind" visual effect.',
      sections: [ {
        name: "Static methods",
        members: [ new art.model.Member("blindTo(e:Element, value:Integer, duration:Number = 0.4, type:String = EASE_IN_OUT, delay:Number = 0):Void", 'Smoothly changes the height of element to that given by <span class="param">value</span>.'), new art.model.Member("blindToggle(e:Element, value:Integer, duration:Number = 0.4, type:String = EASE_IN_OUT, delay:Number = 0):Void", "Does the same as blindTo but only if current element height is zero. " + "Otherwise it makes transition to zero height.") ]
      }, {
        name: "Static properties",
        members: [ new art.model.Member("EASE_IN_OUT:String", "Used for defining blind effect type.") ]
      } ]
    },
    "template/helpers": {
      name: "Helpers, ArtJs.TemplateHelpers",
      "package": "com.arthwood.template",
      description: "This class can be used both in regular JS and in html templates." + "Defines set of methods that allows to generate dynamic content.",
      sections: [ {
        name: "Static methods",
        members: [ new art.model.Member("render(templateId:String, scope:Object):String", 'Returns content on template identified by <span class="param">templateId</span> with template data ' + 'substituded with data from <span class="param">scope</span> object.', [ "/*", " * Suppose that there is a template named myTemplate.html with content:", ' * &lt;p class="title"&gt;{title}&lt;/p&gt;', " */", "", "var content = ArtJs.TemplateHelpers.render('myTemplate', {title: 'Hello');", "", '// &lt;p class="container"&gt;Hello&lt;/p&gt;' ], null, "To read more about templates, navigate to com.arthwood.template.Library section."), new art.model.Member("renderInto(element:Element, templateId:String, scope:Object):Void", "Does the same job as render() but instead of returning a content, puts it directly to element's body."), new art.model.Member("renderCollection(templateId:String, collection:Array):String", 'For each scope in <span class=""param"">collection</span> renders a template and returns the result.', [ "// myTemplate.html: &lt;li&gt;{id}&lt;/li&gt;", "var collection = [{id: 1}, {id: 2}];", "var content = ArtJs.TemplateHelpers.renderCollection('myTemplate', collection);", "", "// &lt;li>1&lt;/li>&lt;li&gt;2&lt;/li&gt;" ]), new art.model.Member("renderIf(value:Object, method:String):String", "Returns result of <span>method</span> call on a Helper but only if <span>value</span> is present." + "Otherwise returns empty string. It's useful when you have your custom helper methods " + "and they may be used in templates for null values", [ "// Suppose you have following custom helper method:", "// renderDescription: function(v) {", "//   return $B('p', null, v).toString();", "// }", "var value;", "", "value = 'Hi there!';", "renderIf(value, 'renderDescription'); // '&lt;p&gt;Hi There!&lt;/p&gt;'", "", "value = null;", "renderIf(value, 'renderDescription'); // ''" ]), new art.model.Member("register(name:String, method:Function):Void", "Allows you to register custom helper methods that can be used within templates.", [ "register('renderDescription', function(v) {", "  return ArtJs.$B('p', {className: 'description'}, v).toString();", "});", "// in the template:", "{renderDescription('Hello ArtJs!')}", '// &lt;p class="description"&gt;Hello ArtJs!&lt;/p&gt;' ]), new art.model.Member("registerAll(helpers:Object):Void", "Allows you to register set of helper methods that can be used within templates at once.", [ "registerAll({", "  renderDescription: function(v) {", "    return ArtJs.$B('p', {className: 'description'}, v).toString();", "  }", "", "  renderTitle: function(v) {", "    return ArtJs.$B('h1', {className: 'title'}, v).toString();", "  }", "});", "// in the template:", "{renderTitle('Welcome')}{renderDescription('Hello ArtJs!')}", '// &lt;h1 class="title"&gt;Welcome&lt;/h1&gt;&lt;p class="description"&gt;Hello ArtJs!&lt;/p&gt;' ]) ]
      } ]
    },
    "template/library": {
      name: "Library, ArtJs.TemplateLibrary",
      "package": "com.arthwood.template",
      description: "Loads template files to your application using AJAX. " + "Triggers ArtJs.onLibraryLoad upon completion.",
      sections: [ {
        name: "Static properties",
        members: [ new art.model.Member("config:Object", "Consists of two configuration parameters:<br/>" + "PATH - remote path to template directory<br/>" + "TEMPLATES - list of template files to be loaded", [ "ArtJs.TemplateLibrary.config = {", "  PATH: 'templates',", "  TEMPLATES: ['doc', 'member', 'section', 'ga']", "};" ]) ]
      } ]
    }
  }
};

ArtJs.TemplateHelpers.registerAll({
  renderExample: function(v) {
    var exampleElement = $B("p", {
      className: "example"
    }, "Example:").toString();
    var codeElement = $B("pre", {
      className: "block"
    }, v.join("<br />")).toString();
    return exampleElement + codeElement;
  },
  renderMore: function(v) {
    return $B("p", {
      className: "container"
    }, v).toString();
  },
  renderDescription: function(v) {
    return $B("p", null, v).toString();
  },
  renderParams: function(v) {
    var collection = v.map(this._paramToElement, this).join("");
    return $B("div", {
      className: "params"
    }, collection).toString();
  },
  _paramToElement: function(k, v) {
    var content = $B("span", null, k).toString() + " - " + v;
    return $B("p", null, content).toString();
  }
});

art.component.Sidebar = ArtJs.Class(function() {
  this.super(arguments);
  this.tree = new ArtJs.Tree(art.DB.tree, this.element);
}, null, {
  _name: "art.component.Sidebar"
}, ArtJs.Component);

art.component.Content = ArtJs.Class(null, {
  onDependency: function(sidebar) {
    sidebar.tree.onLeaf.add($D(this, this.onLeaf));
    sidebar.tree.open();
  },
  onLeaf: function(element) {
    ArtJs.TemplateHelpers.renderInto(this.element, "doc", art.DB.content[element.getAttributes().href]);
  }
}, {
  _name: "art.component.Content"
}, ArtJs.Component);

art.component.Content.dependsOn(art.component.Sidebar);

art.component.Member = ArtJs.Class(function(element) {
  this.super(arguments);
  var a = element.first("h4").first("a");
  a.onClick($D(this, this._onAnchor));
  var more = element.first(".more");
  this.height = more.getSize().y;
  if (more) {
    more.blindTo(0, 0);
  }
}, {
  _onAnchor: function(e) {
    e.preventDefault();
    var a = e.currentTarget;
    var more = a.parent().parent().first(".more");
    if (more) {
      more.blindToggle(this.height, .2);
    }
  }
}, {
  _name: "art.component.Member"
}, ArtJs.Component);