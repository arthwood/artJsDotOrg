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
      'Clock': 'events/clock.html',
      'CustomEvent': 'events/custom_event.html',
      'Delegate': 'events/delegate.html',
      'DelegateCollection': 'events/delegate_collection.html',
      'ElementEvent': 'events/element_event.html',
      'QueuedClock': 'events/queued_clock.html',
      'Timeline': 'events/timeline.html'
    },
    'com.arthwood.math': {
      'Point': 'math/point.html',
      'Rectangle': 'math/rectangle.html'
    },
    'com.arthwood.net': {
      'Ajax': 'net/ajax.html'
    },
    'com.arthwood.spec': {
      'com.arthwood.matchers': {
        'A': 'spec/matchers/a.html',
        'Base': 'spec/matchers/base.html',
        'Eq': 'spec/matchers/eq.html',
        'False': 'spec/matchers/false.html',
        'Null': 'spec/matchers/null.html',
        'Receive': 'spec/matchers/receive.html',
        'True': 'spec/matchers/true.html'
      },
      'Actual': 'spec/actual.html',
      'Definition': 'spec/definition.html',
      'Mock': 'spec/mock.html',
      'Nodes': 'spec/nodes.html',
      'Receiver': 'spec/receiver.html',
      'Result': 'spec/result.html',
      'Runner': 'spec/runner.html',
      'Subject': 'spec/subject.html'
    },
    'com.arthwood.template': {
      'Base': 'template/base.html',
      'Helpers': 'template/helpers.html'
    },
    'com.arthwood.transition': {
      'Blind': 'transition/blind.html'
    },
    'com.arthwood.ui': {
      'DatePicker': 'ui/date_picker.html',
      'ElementInspector': 'ui/element_inspector.html',
      'Flash': 'ui/flash.html',
      'ModalBox': 'ui/modal_box.html',
      'ScreenManager': 'ui/screen_manager.html',
      'Tabs': 'ui/tabs.html',
      'Tree': 'ui/tree.html'
    },
    'com.arthwood.utils': {
      'Array': 'utils/array.html',
      'Class': 'utils/class.html',
      'ClassToggler': 'utils/class_toggler.html',
      'Date': 'utils/date.html',
      'Element': 'utils/element.html',
      'Event': 'utils/event.html',
      'Log': 'utils/log.html',
      'Math': 'utils/math.html',
      'Object': 'utils/object.html',
      'String': 'utils/string.html',
      'Toggler': 'utils/toggler.html'
    }
  },
  content: {
    'main': {
      name: 'ArtJs',
      package: 'ArtJs',
      description: 'This is top level object that stores information about framework and few methods that allows you to select the framework mode',
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
                'To see which native classes can be affected by framework see other parts of documentation.',
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
    'list': {
      name: 'List',
      package: 'com.arthwood.data',
      description: 'List data model implementation',
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
    'queue': {
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
    'element_builder': {
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
    'selector': {
      name: 'Selector',
      package: 'com.arthwood.dom',
      description: 'Allows to easily traverse DOM',
      sections: [
        {
          name: 'Methods',
          members: [
            {
              header: 'isDescendantOf(element:Element, root:Element):Boolean',
              params: [],
              example: [
                ''
              ]
            }
          ]
        }
      ]
    }
  }
};
