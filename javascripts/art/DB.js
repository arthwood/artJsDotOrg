art.DB = {
  tree: {
    'Global': {
      'ArtJs': 'main'
    },
    'com.arthwood.data': {
      'List': 'list',
      'Queue': 'queue'
    },
    'com.arthwood.dom': {
      'ElementBuilder': 'element_builder',
      'Selector': 'selector'
    },
    'com.arthwood.events': {
      'Clock': 'clock',
      'CustomEvent': 'custom_event',
      'Delegate': 'delegate',
      'DelegateCollection': 'delegate_collection',
      'ElementEvent': 'element_event',
      'QueuedClock': 'queued_clock',
      'Timeline': 'timeline'
    },
    'com.arthwood.math': {
      'Point': 'point',
      'Rectangle': 'rectangle'
    },
    'com.arthwood.net': {
      'Ajax': 'ajax'
    },
    'com.arthwood.spec': {
      'com.arthwood.matchers': {
        'A': 'matchers/a',
        'Eq': 'matchers/eq',
        'False': 'matchers/false',
        'Null': 'matchers/null',
        'Receive': 'matchers/receive',
        'True': 'matchers/true'
      },
      'Actual': 'actual',
      'Mock': 'mock',
      'Nodes': 'nodes',
      'Receiver': 'receiver',
      'Runner': 'runner',
      'Subject': 'subject'
    },
    'com.arthwood.template': {
      'Base': 'template/base',
      'Helpers': 'template/helpers'
    },
    'com.arthwood.transition': {
      'Blind': 'transition/blind'
    },
    'com.arthwood.ui': {
      'DatePicker': 'date_picker',
      'ElementInspector': 'element_inspector',
      'Flash': 'flash',
      'ModalBox': 'modal_box',
      'ScreenManager': 'screen_manager',
      'Tabs': 'tabs',
      'Tree': 'tree'
    },
    'com.arthwood.utils': {
      'Array': 'array',
      'Class': 'class',
      'ClassToggler': 'class_toggler',
      'Date': 'date',
      'Element': 'element',
      'Event': 'event',
      'Log': 'log',
      'Math': 'math',
      'Object': 'object',
      'String': 'string',
      'Toggler': 'toggler'
    }
  },
  content: {
    main: {
      name: 'ArtJs',
      package: 'ArtJs',
      description: 'This is top level object that stores information about framework and few methods that allows you to select the framework mode.',
      sections: [
        {
          name: 'Constants',
          members: [
            {
              header: 'VERSION:String',
              description: 'Current version of framework'
            }
          ]
        },
        {
          name: 'Methods',
          members: [
            {
              header: 'doInjection():Void',
              description: 'After calling this method you are able to call Utils methods on native objects',
              more: 
                'Some of the class methods from framework can get injected into native classes.<br/>' +
                'For example most of com.arthwood.utils.ArrayUtils would then affect native Array object.<br/>' +
                'To see which native classes can be affected by framework see other parts of documentation, especially "utils" package.',
              example: [
                'ArtJs.doInjection();',
                '',
                '// After that action you will be able to use:',
                '',
                'myArray.last(); // 3',
                '',
                'instead of:',
                '',
                'ArtJs.ArrayUtils.last(myArray); // 3'
              ]
            },
            {
              header: 'globalize():Void',
              description: 'Makes all classes accessible globally in window object',
              more: 
                '<p>Normally after framework is loaded you have two ways of accessing its classes:</p>' +
                '<ul><li>using full qualified path (com.arthwood.utils.ArrayUtils)</li><li>by looking into top ArtJs namespace (ArtJs.ArrayUtils)</li></ul>' +
                '<p>For now there is no classes with the same name in whole framework so accessing it via ArtJs is fine.<br/>' + 
                'However, if at some point it happens, full qualified name is necessary.<br/>' +
                'When all framework classes are loaded and accessible (e.g. in js file following the framework file) simply use:</p>',
              example: [
                'ArtJs.globalize();'
              ]
            },
            {
              header: '$():Element',
              description: 'Alias for ElementUtils.getElements()',
              example: [
                "var nav = ArtJs.$('.main p.item span');"
              ]
            },
            {
              header: '$D():Delegate',
              description: 'Alias for Delegate.create()',
              example: [
                'var delegate = ArtJs.$D(this, this.onClick);'
              ]
            },
            {
              header: '$DC():Function',
              description: 'Alias for Delegate.callback()',
              example: [
                'var callback = ArtJs.$DC(this, this.onClick, true);'
              ]
            },
            {
              header: '$del():Ajax',
              description: 'Alias for Ajax.del()',
              example: [
                "var ajax = ArtJs.$del('http://mydomain.com', {id: 4}, new Delegate(this, this.onAjaxSuccess));"
              ]
            },
            {
              header: '$find():Array',
              description: 'Alias for ElementUtils.find()',
              example: [
                "var nav = ArtJs.$('navigation');",
                "var items = ArtJs.$down(nav, '.item');"
              ]
            },
            {
              header: '$get():Ajax',
              description: 'Alias for Ajax.get()',
              example: [
                "var ajax = ArtJs.$get('http://mydomain.com', null, new Delegate(this, this.onAjaxSuccess));"
              ]
            },
            {
              header: 'p():Void',
              description: 'Debug info. If debug console is accessible output to the console; uses alert() otherwise.',
              example: [
                "p('myVariable: ' +  myVariable);"
              ]
            },
            {
              header: '$P():Element',
              description: 'Alias for ElementBuilder.parse()',
              example: [
                "var element = ArtJs.$P('<span class=\"desc\">Blue t-shirt</span>');"
              ]
            },
            {
              header: '$post():Ajax',
              description: 'Alias for Ajax.post()',
              example: [
                "var ajax = ArtJs.$post('http://mydomain.com', {id: 4}, new Delegate(this, this.onAjaxSuccess));"
              ]
            },
            {
              header: '$put():Ajax',
              description: 'Alias for Ajax.$put()',
              example: [
                "var ajax = ArtJs.$put('http://mydomain.com', {id: 4}, new Delegate(this, this.onAjaxSuccess));"
              ]
            },
            {
              header: '$up():Element',
              description: 'Alias for ElementUtils.up()',
              example: [
                "var nav = ArtJs.$('navigation');",
                'var parent = ArtJs.$up(nav);'
              ]
            }
          ]
        }
      ]
    },
    list: {
      name: 'List',
      package: 'com.arthwood.data',
      description: 'List data model implementation.',
      sections: [
        {
          name: 'Constructor',
          members: [
            {
              header: 'List(data:Array = [])',
              description: '<span class="param">data</span> - collection data',
              example: [
                'var list = new List([1, 2, 3, 4, 5]);'
              ]
            }
          ]
        },
        {
          name: 'Events',
          members: [
            {
              header: 'onChange(list:List)',
              description: 'Dispatched every time the collection changes',
              example: [ 
                'var list = new List([1, 2, 3, 4, 5]);',
                '',
                'list.onChange.add(new ArtJs.Delegate(this, this.onChange));',
                'function onChange(list) {',
                "'  alert('list has changed!');'",
                '}'
              ]
            }
          ]
        },
        {
          name: 'Properties',
          members: [
            {
              header: 'allowDuplicates:Boolean = true',
              description: 'Flag that allows having duplicates in collection',
              more: "'If this flag is set to true, adding existing item won't do anything.'"
            },
            {
              header: 'loop:Boolean = false',
              description: 'Flag that allows periodically return the item, even if index is out of collection bounds',
              more: 'If this flag is set to true and you try to fetch an item by index out of collection bounds, ' +
                'you will receive item as if you were fetching it from infinite collection consisting of periodically ' +
                'repeated items of initial collection.',
              example: [
                'var list = new List([1, 2, 3, 4, 5]);',
                '',
                'list.loop = true;',
                'list.getItemAt(-1); //5',
                'list.getItemAt(6); //2'
              ]
            }
          ]
        },
        {
          name: 'Methods',
          members: [
            {
              header: 'addItem(item:Object, noEvent:Boolean):Number',
              description:
                'Adds <span class="code">item</span> to the end of collection and returns new length.' +
                '<br/>' +
                'If <span class="code">noEvent</span> is set to true, this action wont dispatch the <span class="code">change</span> event.',
              example:
                [
                  'var list = new List([1, 2, 3, 4, 5]);',
                  '',
                  'list.addItem(6); // 6',
                  'list.toString() // 1, 2, 3, 4, 5, 6'
                ]
            },
            {
              header: 'addItemAt(item:Object, idx:Number, noEvent:Boolean):Number',
              description: 'Adds <span class="code">item</span> to collection at specific position and returns new length',
              example: [
                'var list = new List([1, 2, 3, 4, 5]);',
                '',
                'list.addItemAt(6, 2); // 6',
                'list.toString() // 1, 2, 6, 3, 4, 5'
              ]
            },
            {
              header: 'decrease():Void',
              description: 'Decreases pointer',
              example: [
                'var list = new List([1, 2, 3, 4, 5]);',
                '',
                'list.setPointer(2);',
                'list.decrease();',
                'list.getPointer(); // 1'
              ]
            },
            {
              header: 'isEmpty():Boolean',
              description: 'Returns true if collection is empty; false otherwise',
              example: [
                'var list = new List([1, 2, 3, 4, 5]);',
                '',
                'list.isEmpty(); // false',
                'list.removeAll();',
                'list.isEmpty(); // true'
              ]
            },
            {
              header: 'getCurrent():Object',
              description: 'Returns current item',
              example: [
                'var list = new List([1, 2, 3, 4, 5]);',
                '',
                'list.setPointer(2);',
                'list.getCurrent(); // 3'
              ]
            },
            {
              header: 'getFirst():Object',
              description: 'Returns first item of collection',
              example: [
                'var list = new List([1, 2, 3, 4, 5]);',
                '',
                'list.getFirst(); // 1'
              ]
            },
            {
              header: 'getItemAt(idx:Number):Object',
              description: 'Retrieves <span class="code">item</span> at specific position',
              example: [
                'var list = new List([1, 2, 3, 4, 5]);',
                '',
                'list.getItemAt(3); // 4'
              ]
            },
            {
              header: 'getItemIndex(item:Object):Number',
              description: "Retrieves <span class=\"code\">item</span>'s index",
              example: [
                'var list = new List([1, 2, 3, 4, 5]);',
                '',
                'list.getItemIndex(3); // 2'
              ]
            },
            {
              header: 'getItems():Array',
              description: 'Returns copy of collection',
              example: [
                'var list = new List([1, 2, 3, 4, 5]);',
                '',
                'list.getItems().toString(); // 1, 2, 3, 4, 5'
              ]
            },
            {
              header: 'getLast():Object',
              description: 'Returns last item of collection',
              example: [
                'var list = new List([1, 2, 3, 4, 5]);',
                '',
                'list.getLast(); // 5'
              ]
            },
            {
              header: 'getLength():Number',
              description: 'Returns length of collection',
              example: [
                'var list = new List([1, 2, 3, 4, 5]);',
                '',
                'list.getLength(); // 5'
              ]
            },
            {
              header: 'getNext():Object',
              description: 'Returns item after current',
              example: [
                'var list = new List([1, 2, 3, 4, 5]);',
                '',
                'list.setPointer(2);',
                'list.getNext(); // 4'
              ]
            },
            {
              header: 'getPointer():Number',
              description: 'Returns pointer',
              example: [
                'var list = new List([1, 2, 3, 4, 5]);',
                '',
                'list.getPointer(); // 0',
                'list.increase();',
                'list.getPointer(); // 1'
              ]
            },
            {
              header: 'getPrevious():Object',
              description: 'Returns item before current',
              example: [
                'var list = new List([1, 2, 3, 4, 5]);',
                '',
                'list.setPointer(2);',
                'list.getPrevious(); // 2'
              ]
            },
            {
              header: 'hasItem(item:Object):Boolean',
              description: 'Returns true if <span class="code">item</span> is in collection; false otherwise',
              example: [
                'var list = new List([1, 2, 3, 4, 5]);',
                '',
                'list.hasItem(4); // true',
                'list.hasItem(7); // false'
              ]
            },
            {
              header: 'increase():Void',
              description: 'Increases pointer',
              example: [
                'var list = new List([1, 2, 3, 4, 5]);',
                '',
                'list.setPointer(2);',
                'list.increase();',
                'list.getPointer(); // 3'
              ]
            },
            {
              header: 'isLast():Boolean',
              description: 'Returns true if pointer is set to last item in collection; false otherwise',
              example: [
                'var list = new List([1, 2, 3, 4, 5]);',
                '',
                'list.setPointer(4);',
                'list.isLast(); // true'
              ]
            },
            {
              header: 'moveItem(fromIndex:Number, toIndex:Number):Void',
              description: 'Moves <span class="code">item</span> from, to specific position',
              example: [
                'var list = new List([1, 2, 3, 4, 5]);',
                '',
                'list.moveItem(3, 0);',
                'list.toString(); // 4, 1, 2, 3, 5;'
              ]
            },
            {
              header: 'removeAll(noEvent:Boolean):Void',
              description: 'Removes all items from collection',
              example: [
                'var list = new List([1, 2, 3, 4, 5]);',
                '',
                'list.removeAll();',
                'list.toString() //'
              ]
            },
            {
              header: 'removeItem(item:Object, onlyFirst:Boolean, noEvent:Boolean):Void',
              description: 'Removes <span class="code">item</span> from collection',
              example: [
                'var list = new List([1, 2, 3, 4, 5]);',
                '',
                'list.removeItem(2); // 4',
                'list.toString() // 1, 3, 4, 5'
              ]
            },
            {
              header: 'removeItemAt(idx:Number, noEvent:Boolean):Void',
              description: 'Removes <span class="code">item</span> at specific position from collection',
              example: [
                'var list = new List([1, 2, 3, 4, 5]);',
                '',
                'list.removeItemAt(2); // 4',
                'list.toString() // 1, 2, 4, 5'
              ]
            },
            {
              header: 'reset():Void',
              description: 'Sets pointer to zero',
              example: [
                'var list = new List([1, 2, 3, 4, 5]);',
                '',
                'list.setPointer(2);',
                'list.getPointer(); // 2',
                'list.reset();',
                'list.getPointer(); // 0'
              ]
            },
            {
              header: 'setItems(items:Array):Void',
              description: 'Set the collection',
              example: [
                'var list = new List([1, 2, 3, 4, 5]);',
                '',
                'list.toString(); // 1, 2, 3, 4, 5',
                'list.setItems([4, 5, 6]);',
                'list.toString(); // 4, 5, 6'
              ]
            },
            {
              header: 'setPointerAtItem(item:Object):Void',
              description: 'Set the pointer at position of <span class="code">item</span>',
              example: [
                'var list = new List([1, 2, 3, 4, 5]);',
                '',
                'list.setPointerAtItem(2);',
                'list.getPointer(); // 1'
              ]
            },
            {
              header: 'setPointer(i:Number):Void',
              description: 'Sets pointer',
              example: [
                'var list = new List([1, 2, 3, 4, 5]);',
                '',
                'list.setPointer(2);',
                'list.getPointer(); // 2'
              ]
            }
          ]
        }
      ]
    },
    queue: {
      name: 'Queue',
      package: 'com.arthwood.data',
      description: 'Queue data model implementation',
      sections: [
        {
          name: 'Constructor',
          members: [
            {
              header: 'Queue(data:Array = [])',
              description: '<span class="param">data</span> - collection data',
              example: [
                'var queue = new Queue([1, 2, 3, 4, 5]);'
              ]
            }
          ]
        },
        {
          name: 'Events',
          members: [
            {
              header: 'onChange(list:List)',
              description: 'Dispatched every time the collection changes',
              example: [
                'var queue = new Queue([1, 2, 3, 4, 5]);',
                '',
                'queue.onChange.add(new ArtJs.Delegate(this, this.onChange));',
                '',
                'function onChange(queue) {',
                "'  alert('queue has changed!');'",
                '}'
              ]
            }
          ]
        },
        {
          name: 'Methods',
          members: [
            {
              header: 'addItem(item:Object):Void',
              description: 'Adds <span class="code">item</span> to the end of collection',
              example: [
                'var queue = new Queue([1, 2, 3, 4, 5]);',
                '',
                'queue.addItem(6); // 6',
                '',
                'queue.toString() // 1, 2, 3, 4, 5, 6'
              ]
            },
            {
              header: 'empty():Boolean',
              description: 'Returns true if collection is empty; false otherwise',
              example: [
                'var queue = new Queue([3]);',
                '',
                'queue.isEmpty(); // false',
                '',
                'var item = queue.getItem();',
                '',
                'queue.isEmpty(); // true'
              ]
            },
            {
              header: 'getItem():Object',
              description: 'Pops and returns current item',
              example: [
                'var queue = new Queue([1, 2, 3, 4, 5]);',
                'var item = queue.getItem(); // 1',
                '',
                'queue.toString(); // 2, 3, 4, 5'
              ]
            },
            {
              header: 'getLength():Number',
              description: 'Returns length of collection',
              example: [
                'var queue = new Queue([1, 2, 3, 4, 5]);',
                '',
                'queue.getLength(); // 5'
              ]
            },
            {
              header: 'setData(data:Array):Void',
              description: 'Sets the collection',
              example: [
                'var queue = new Queue([1, 2, 3, 4, 5]);',
                '',
                '',
                'queue.toString(); // 1, 2, 3, 4, 5',
                '',
                'queue.setData([4, 5, 6]);',
                '',
                'queue.toString(); // 4, 5, 6'
              ]
            }
          ]
        }
      ]
    },
    component: {
      name: 'Component',
      package: 'com.arthwood.dom',
      description: 'Components allow you to attach your own view class to element node. In order to do this simply assign "art" class to your element along with class name of your custom class e.g. com.domain.LeftNav.'
    },
    element_builder: {
      name: 'ElementBuilder',
      package: 'com.arthwood.dom',
      description: 'Allows to create DOM elements',
      sections: [
        {
          name: 'Constructor',
          members: [
            {
              header: 'ElementBuilder(name:String, attributes:Object, value:String, empty:Boolean)',
              params: {
                name: 'element name',
                attributes: 'element attributes',
                value: 'element inner text',
                empty: 'if true, empty element will be created'
              },
              example: [
                "var builder = new ElementBuilder('span', {class: 'price'}, '$199');"
              ]
            }
          ]
        },
        {
          name: 'Properties',
          members: [
            {
              header: 'attributes:Object',
              description: 'The same property as in constructor'
            },
            {
              header: 'empty:Boolean',
              description: 'The same property as in constructor'
            },
            {
              header: 'name:String',
              description: 'The same property as in constructor'
            },
            {
              header: 'value:Object',
              description: 'The same property as in constructor'
            }
          ]
        },
        {
          name: 'Methods',
          members: [
            {
              header: 'getElement():Node',
              description: 'Builds and returns new Element',
              example: [
                "var builder = new ElementBuilder('span', {class: 'price'}, '$199');",
                '',
                'var element = builder.getElement();',
                '',
                'element.toString(); // [object HTMLSpanElement]'
              ]
            },
            {
              header: 'toString():String',
              description: 'String representation of element',
              example: [
                "var builder = new ElementBuilder('span', {class: 'price'}, '$199');",
                '',
                'builder.toString(); // &lt;span class="price"&gt;$199&lt;/span&gt;'
              ]
            }
          ]
        },
        {
          name: 'Static Methods',
          members: [
            {
              header: 'parse(string:String):Node',
              description: 'Parses <span class="code">string</span> and returns Node',
              example: [
                "var element = ElementBuilder.parse('&lt;span class=\"price\"&gt;$199&lt;/span&gt;');",
                '',
                'element.toString(); // [object HTMLSpanElement]'
              ]
            }
          ]
        }
      ]
    },
    selector: {
      name: 'Selector',
      package: 'com.arthwood.dom',
      description: 'Allows to easily traverse DOM.',
      sections: [
        {
          name: 'Methods',
          members: [
            {
              header: 'find(element:Element, selector:String):Array',
              description: 'Same as #getElements but with reversed arguments.'
            },
            {
              header: 'first(element:Element, selector:String):Element',
              description: 'Returns first result of #find.'
            },
            {
              header: 'last(element:Element, selector:String):Element',
              description: 'Returns last result of #find.'
            },
            {
              header: 'parent(element:Element, selector:String):Element',
              description: 'Returns first ancestor that matches the selector.'
            },
            {
              header: 'getElements(selector:String, element:Element):Array',
              description: 'Returns all descendants that match the selector.',
              more: 'Selector parameter must be a single selector without spaces',
              example: [
                "var main = getElements('#main');",
                "var titles = getElements('p.title', main);"
              ]
            },
            {
              header: 'isDescendantOf(element:Element, root:Element):Boolean',
              description: 'Returns true if element is descendant of root.'
            },
            {
              header: 'isSelfOrDescendantOf(element:Element, root:Element):Boolean',
              description: 'Same as #isDescendantOf but returns true also if element is the root itself.'
            },
            {
              header: 'getElementById(id:String):Element',
              description: 'Returns Element by id.'
            },
            {
              header: 'getElementsByTagName(name:String):Array',
              description: 'Returns array of Elements by tag name.'
            },
            {
              header: 'getElementsByClassName(name:String):Array',
              description: 'Returns array of Elements by class name.'
            }
          ]
        }
      ]
    },
    clock: {
      name: 'Clock',
      package: 'com.arthwood.events',
      description: 'Allows trigger events periodically',
      sections: [
        {
          name: 'Constructor',
          members: [
            {
              header: 'Clock(interval:Number, repeat:Number)',
              params: {
                interval: 'interval between ticks in miliseconds',
                repeat: 'number of ticks'
              },
              example: [
                'var clock = new Clock(1000, 5);'
              ]
            }
          ]
        },
        {
          name: 'Events',
          members: [
            {
              header: 'onChange(clock:Clock)',
              description: 'Triggered on each tick',
              example: [
                'var clock = new Clock(1000, 5);',
                '',
                'clock.onChange.add(new Delegate(this, this.onClockChange);',
                '',
                'function onClockChange(clock) {',
                "  console.log('clock change!');",
                '}'
              ]
            },
            {
              header: 'onFinish(clock:Clock)',
              description: 'Triggered after last tick',
              example: [
                'var clock = new Clock(1000, 5);',
                '',
                'clock.onComplete.add(new Delegate(this, this.onClockComplete);',
                '',
                'function onClockComplete(clock) {',
                "  console.log('clock complete!');",
                '}'
              ]
            }
          ]
        },
        {
          name: 'Properties',
          members: [
            {
              header: 'counter:Number',
              description: 'Number of released ticks'
            },
            {
              header: 'interval:Number',
              description: 'The same property as in constructor'
            },
            {
              header: 'repeat:Number',
              description: 'The same property as in constructor'
            }
          ]
        },
        {
          name: 'Methods',
          members: [
            {
              header: 'isRunning():Void',
              description: 'Returns true if clock is running; false otherwise',
              example: [
                'var clock = new Clock(1000, 5);',
                '',
                'clock.isRunning(); // false',
                'clock.start(true);',
                'clock.isRunning(); // true',
                'clock.stop();',
                'clock.isRunning(); // false'
              ]
            },
            {
              header: 'pause():Void',
              description: "'Same as stop() but doesn't reset the counter'",
              example: [
                'var clock = new Clock(1000, 5);',
                '',
                'clock.start(true);',
                '// ... and some time later',
                'clock.counter; // 3',
                'clock.pause();',
                'clock.counter; // 3'
              ]
            },
            {
              header: 'resume():Void',
              description: 'Resumes ticking after it has been paused',
              example: [
                'var clock = new Clock(1000, 5);',
                '',
                'clock.start();',
                '// ... and some time later',
                'clock.counter; // 3',
                'clock.pause();',
                '// ... and some time later',
                'clock.resume();',
                'clock.counter; // 3'
              ]
            },
            {
              header: 'start(now:Boolean):Void',
              description: "Starts the clock. First tick after interval or immediately if 'now' param is true",
              example: [
                'var clock = new Clock(1000, 5);',
                '',
                'clock.start();'
              ]
            },
            {
              header: 'stop():Void',
              description: 'Stops the clock and sets counter to zero',
              example: [
                'var clock = new Clock(1000, 5);',
                '',
                'clock.start();',
                '// ... and some time later',
                'clock.counter; // 3',
                'clock.stop();',
                'clock.counter; // 0'
              ]
            }
          ]
        }
      ]
    },
    custom_event: {
      name: 'CustomEvent',
      package: 'com.arthwood.events',
      description: 'Defines object capable of dispatching events.',
      sections: [
        {
          name: 'Constructor',
          members: [
            {
              header: 'CustomEvent(name:String = null)',
              params: {
                name: 'name of the event'
              },
              example: [
                "var myEvent = new CustomEvent('MyClass::myEvent');"
              ]
            }
          ]
        },
        {
          name: 'Properties',
          members: [
            {
              header: 'name:Name',
              description: 'The same property as in constructor'
            },
            {
              header: 'collection:DelegateCollection',
              description: 'Collection of registered listeners',
              example: [
                "var myEvent = new CustomEvent('MyClass::myEvent');",
                '',
                'myEvent.collection.length // 0',
                'myEvent.add(new Delegate(null, function() {',
                "console.log('event!')",
                '}));',
                'myEvent.collection.length // 1'
              ]
            }
          ]
        },
        {
          name: 'Methods',
          members: [
            {
              header: 'add(delegate:Delegate):Void',
              description: 'Registers listener',
              example: [
                "var myEvent = new CustomEvent('MyClass::myEvent');",
                '',
                'myEvent.add(new Delegate(null, function() {',
                "  console.log('event!')",
                '}));'
              ]
            },
            {
              header: 'fire():Array',
              description: 'Triggers the event and returns responses from handlers as an array',
              example: [
                "var myEvent = new CustomEvent('MyClass::myEvent');",
                '',
                'myEvent.add(new Delegate(null, function() {',
                "  console.log('event!');",
                '  return 2;',
                '}));',
                '// ...then at some point you dispatch the event',
                "myEvent.fire(this, 'hello'); // [2]"
              ]
            },
            {
              header: 'getLength():Number',
              description: 'Amount of listeners currently registered',
              example: [
                "var myEvent = new CustomEvent('MyClass::myEvent');",
                'var delegateOne = new Delegate(null, function(msg) {',
                "  console.log('event says to delegate 1: ' + msg);",
                '});',
                'var delegateTwo = new Delegate(null, function(msg) {',
                "  console.log('event says to delegate 2: ' + msg);",
                '});',
                '',
                'myEvent.getLength(); // 0',
                'myEvent.add(delegateOne);',
                'myEvent.getLength(); // 1',
                'myEvent.add(delegateTwo);',
                'myEvent.getLength(); // 2',
                'myEvent.removeAll();',
                'myEvent.getLength(); // 0'
              ]
            },
            {
              header: 'remove(delegate:Delegate):Void',
              description: 'Removes listener',
              example: [
                "var myEvent = new CustomEvent('MyClass::myEvent');",
                'var delegate = new Delegate(null, function(msg) {',
                "  console.log('event says: ' + msg)",
                '});',
                '',
                'myEvent.add(delegate);',
                "myEvent.fire('hello!'); // delegate handles event",
                'myEvent.remove(delegate);',
                "myEvent.fire('hello!'); // nothing happens"
              ]
            },
            {
              header: 'removeAll():Void',
              description: 'Removes all listeners',
              example: [
                "var myEvent = new CustomEvent('MyClass::myEvent');",
                'var delegateOne = new Delegate(null, function(msg) {',
                "  console.log('event says to delegate 1: ' + msg);",
                '});',
                'var delegateTwo = new Delegate(null, function(msg) {',
                "  console.log('event says to delegate 2: ' + msg);",
                '});',
                '',
                'myEvent.add(delegateOne);',
                'myEvent.add(delegateTwo);',
                "myEvent.fire('hello!'); // delegates handle event",
                'myEvent.removeAll();',
                "myEvent.fire('hello!');// nothing happens"
              ]
            }
          ]
        }
      ]
    },
    delegate: {
      name: 'Delegate',
      package: 'com.arthwood.events',
      description: 'Allows to keep context object along with function.',
      sections: [
        {
          name: 'Constructor',
          members: [
            {
              header: 'Delegate(object:Object, method:Function, ...rest)',
              params: {
                object: 'context object',
                method: 'any function'
              },
              description: 
                "Delegate wraps context object, any function and optional arguments into single Delegate object.<br/>" +
                "When you ask for callback function:<br/>" +
                '<span class="block code">' +
                "var delegate = new Delegate(this, this.onChange, 'hello');<br/>" +
                "var callback = delegate.callback();" +
                '</span>' +
                'you will get a Function object that when called will have set <span class="code" >this</span> to context object.<br/>' +
                'Optionally when you pass <span class="code">true</span> to <span class="code">delegate.callback()</span>' +
                'the <span class="code">callback</span> handler will receive "source" as first argument' +
                '("source" points to object who actually called the callback).<br/>' +
                'Arguments list that are passed to callback function are:<br/>' +
                '- source object (if specified)<br/>' +
                '- arguments that are passed directly when it is being called<br/>' +
                '- optional arguments (...rest) passed to delegate when creating the instance',
              example: [
                'function onClick(link, e, msg) {',
                "  alert('Link clicked! ' + msg);",
                '  return false;',
                '}',
                '',
                "var delegate = new Delegate(this, onClick, 'hello');",
                '',
                'link.onclick = delegate.callback(true);'
              ]
            }
          ]
        },
        {
          name: 'Properties',
          members: [
            {
              header: 'args:Array',
              description: 'Optional set of arguments'
            },
            {
              header: 'method:Function',
              description: 'The same property as in constructor'
            },
            {
              header: 'object:Object',
              description: 'The same property as in constructor'
            }
          ]
        },
        {
          name: 'Methods',
          members: [
            {
              header: 'callback(withSource:Boolean):Function',
              description: 
                'Returns Function object, than when called will receive source object as first argument if' + 
                '<span class="code">withSource</span> is true, and <span class="code">this</span> in that function' + 
                'will always point to context object',
              example: [
                'var obj = {id: 4};',
                '',
                'function meth(source, name, greeting) {',
                "  console.log('source: ' + source + ', id: ' + this.id + ': ' + greeting + \", it's \" + name);",
                '}',
                '',
                "var delegate = new Delegate(obj, meth, 'hello');",
                'var callback = delegate.callback(true);',
                '',
                "callback('Steve');"
              ]
            },
            {
              header: 'invoke():Object',
              description: 'Calls the delegate method with object as a context',
              example: [
                'function method(value, message) {',
                "  alert('method called! value:' + value + ', message: ' + message);",
                '  return true;',
                '}',
                '',
                "var delegate = new Delegate(this, method, 'hello');",
                'var result = delegate.invoke(5); // true'
              ]
            }
          ]
        },
        {
          name: 'Static Methods',
          members: [
            {
              header: 'callback(object:Object, method:Function, withSource:Boolean, ...rest):Function',
              description: "A shorthand function that allows to create delegate and returns it's callback at one step",
              example: [
                'var obj = {id: 4};',
                '',
                'function meth(source, name, greeting) {',
                "  console.log('source: ' + source + ', id: ' + this.id + ': ' + greeting + \", it's \" + name);",
                '}',
                '',
                "var callback = Delegate.callback(obj, meth, true, 'hello');",
                '',
                "callback('Steve');"
              ]
            },
            {
              header: 'create(object:Object, method:Function, ...rest):Delegate',
              description: 'A shorthand function that allows to create and return new delegate object',
              example: [
                'var obj = {id: 4};',
                '',
                'function meth(source, name, greeting) {',
                "  console.log('source: ' + source + ', id: ' + this.id + ': ' + greeting + \", it's \" + name);",
                '}',
                '',
                "var delegate = Delegate.create(obj, meth, 'hello');",
                'var callback = delegate.callback(true);',
                '',
                "callback('Steve');"
              ]
            }
          ]
        }
      ]
    }
  }
};
