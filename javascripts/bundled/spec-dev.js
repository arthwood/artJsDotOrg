var art = {
  view: {}
};

artjs.TemplateLibrary.config.PATH = 'templates';
artjs.TemplateLibrary.config.TEMPLATES = ['ga'];

artjs.onWindowLoad.add(artjs.$F(function() {
  var element = artjs.Selector.getElement('.specs');
  
  artjs.BrowserSpecView.run(element);
}));
art.view.GA = artjs.Class(
  function(element) {
    this.super(element);
    
    var model = new artjs.Model();
    
    this.setModel(model);
  },
  null,
  {_name: 'art.view.GA'},
  artjs.TemplateView
);
spec(artjs.TemplateCompiler, function() {
  var instance, klass;
  
  before(function() {
    klass = subject();
  });
  
  describe('#compile', function() {
    context('simple value', function() {
      it('should return expected result', function() {
        instance = new klass('{{value}}', {value: true});
      
        expect(instance.compile()).to(eq('true'));
      });
    });
    
    context('action', function() {
      it('should return expected result', function() {
        artjs.TemplateHelpers.register('code', function(str, value) {
          return str + ':' + value;
        });
        
        instance = new klass("{{code('<key, value>', '52')}}");
        
        expect(instance.compile()).to(eq('<key, value>:52'));
      });
    });
  });
});
spec(artjs.Array, function() {
  describe('#build', function() {
    it('should return new array', function() {
      expect(subject().build(3, function(i) {
        return i + 2;
      })).to(eq([2, 3, 4]));
    });
  });

  describe('#first', function() {
    it('should return first element', function() {
      expect(subject().first([6, 3, 2, 8])).to(eq(6));
    });
  });

  describe('#second', function() {
    it('should return first element', function() {
      expect(subject().second([6, 3, 2, 8])).to(eq(3));
    });
  });

  describe('#third', function() {
    it('should return first element', function() {
      expect(subject().third([6, 3, 2, 8])).to(eq(2));
    });
  });

  describe('#last', function() {
    it('should return first element', function() {
      expect(subject().last([6, 3, 2, 8])).to(eq(8));
    });
  });

  describe('#beforeLast', function() {
    it('should return before last element', function() {
      expect(subject().beforeLast([6, 3, 2, 8])).to(eq(2));
    });
  });

  describe('#getItemAt', function() {
    it('should return requested element', function() {
      expect(subject().getItemAt([6, 3, 2, 8], 2)).to(eq(2));
    });
  });

  describe('#includesInv', function() {
    context('when element is in set', function() {
      it('should be true', function() {
        expect(subject().includesInv(2, [6, 3, 2, 8])).to(beTrue());
      });
    });

    context('when element is not in set', function() {
      it('should be false', function() {
        expect(subject().includesInv(1, [6, 3, 2, 8])).to(beFalse());
      });
    });
  });

  describe('#includes', function() {
    context('when element is in set', function() {
      it('should be true', function() {
        expect(subject().includes([6, 3, 2, 8], 2)).to(beTrue());
      });
    });

    context('when element is not in set', function() {
      it('should be false', function() {
        expect(subject().includes([6, 3, 2, 8], 1)).to(beFalse());
      });
    });
  });

  describe('#includesAll', function() {
    context('when elements are in set', function() {
      it('should be true', function() {
        expect(subject().includesAll([6, 3, 2, 8], [2, 6, 8])).to(beTrue());
      });
    });

    context('when any of elements is not in set', function() {
      it('should be false', function() {
        expect(subject().includesAll([6, 3, 2, 8], [2, 6, 8, 1])).to(beFalse());
      });
    });
  });

  describe('#insertAt', function() {
    it('should insert elements at given position', function() {
      expect(subject().insertAt([6, 3, 2, 8], 3, [2, 6, 8])).to(eq([6, 3, 2, 2, 6, 8, 8]));
    });
  });

  describe('#removeAt', function() {
    it('should remove element from given position', function() {
      var value = [6, 3, 7, 8];
      var result = subject().removeAt(value, 2);
      
      expect(result).to(eq(7));
      expect(value).to(eq([6, 3, 8]));
    });
  });

  describe('#removeItem', function() {
    it('should remove all occurences of given element', function() {
      var value = [6, 3, 2, 8, 3];
      var result = subject().removeItem(value, 3);

      expect(value).to(eq([6, 2, 8]));
      expect(result).to(eq([1, 4]));
    });
    
    context('with onlyFirst flag set to true', function() {
      it('should remove only first occurence of given element', function() {
        var value = [6, 3, 2, 8, 3];
        var result = subject().removeItem(value, 3, true);

        expect(value).to(eq([6, 3, 2, 8]));
        expect(result).to(eq([4]));
      });
    });
  });

  describe('#removeItems', function() {
    it('should remove elements from given array', function() {
      var value = [6, 3, 2, 8];
      var result = subject().removeItems(value, [2, 1]);
      
      expect(result).to(eq([6, 3, 8]));
    });
  });
  
  describe('#$removeItems', function() {
    it('should remove elements from given array', function() {
      var value = [6, 3, 2, 8];
      var result = subject().$removeItems(value, [2, 1]);
      
      expect(value).to(eq([6, 3, 8]));
      expect(result).to(eq([2]));
    });
  });
  
  describe('#arrify', function() {
    it('should turn any iteratable object into array', function() {
      var testFunction = function() {
        var result = subject().arrify(arguments, 3);

        expect(result).to(eq([6, 2]));
      };

      testFunction(1, 2, 3, 6, 2);
    });
  });

  describe('#map', function() {
    it('should map elements', function() {
      var testObject = {
        prefix: 'd_',

        _callback: function(i, idx) {
          return this.prefix + (i - idx);
        },
        action: function() {
          var value = [6, 3, 9, 8, 7];
          var result = subject().map(value, this._callback, this);
          
          expect(result).to(eq(['d_6', 'd_2', 'd_7', 'd_5', 'd_3']));
        }
      };
      
      testObject.action();
    });
  });

  describe('#pluck', function() {
    it('should map elements to property', function() {
      var testObjects = [
        {prop: 4}, {prop: 2}, {prop: 7}, {prop: 'asdf'}
      ];

      var result = subject().pluck(testObjects, 'prop');

      expect(result).to(eq([4, 2, 7, 'asdf']));
    });
  });

  describe('#each', function() {
    it('should iterate over elements', function() {
      var result = [];
      var testObject = {
        prefix: 'd_',

        _callback: function(i, idx) {
          return result.push(this.prefix + (i - idx));
        },
        
        action: function() {
          var value = [6, 3, 9, 8, 7];
          
          subject().each(value, this._callback, this);

          expect(result).to(eq(['d_6', 'd_2', 'd_7', 'd_5', 'd_3']));
        }
      };

      testObject.action();
    });
  });

  describe('#inject', function() {
    it('should accumulate elements', function() {
      var testObject = {
        id: 'd_',

        _callback: function(mem, i, idx) {
          mem[this.id + idx] = i;
        },
        action: function() {
          var value = [6, 3];
          var result = subject().inject(value, {a: 4}, this._callback, this);
          
          expect(artjs.Object.keys(result)).to(eq(['a', 'd_0', 'd_1']));
          expect(result.a).to(eq(4));
          expect(result.d_0).to(eq(6));
          expect(result.d_1).to(eq(3));
        }
      };

      testObject.action();
    });
  });

  describe('#flatten', function() {
    it('should flatten the input', function() {
      var result = subject().flatten([[2, 5, 1], [2, 9]]);
      
      expect(result).to(eq([2, 5, 1, 2, 9]));
    });
  });

  describe('#select', function() {
    it('should filter out elements', function() {
      var testObject = {
        _select: function(i, idx) {
          return i > idx;
        },

        action: function() {
          var value = [0, 3, 1, 4, 3];
          var result = subject().select(value, this._select, this);

          expect(result).to(eq([3, 4]));
        }
      };

      testObject.action();
    });
  });

  describe('#reject', function() {
    it('should filter out elements', function() {
      var testObject = {
        _callback: function(i, idx) {
          return i > idx;
        },

        action: function() {
          var value = [0, 3, 1, 4, 3];
          var result = subject().reject(value, this._callback, this);

          expect(result).to(eq([0, 1, 3]));
        }
      };

      testObject.action();
    });
  });

  describe('#$reject', function() {
    it('should filter out elements', function() {
      var testObject = {
        _callback: function(i, idx) {
          return i > idx;
        },

        action: function() {
          var value = [0, 3, 1, 4, 3];
          
          subject().$reject(value, this._callback, this);

          expect(value).to(eq([0, 1, 3]));
        }
      };

      testObject.action();
    });
  });

  describe('#detect', function() {
    it('should find first matching element', function() {
      var testObject = {
        _callback: function(i, idx) {
          return i > idx;
        },

        action: function() {
          var value = [0, 3, 1, 4, 8];
          var result = subject().detect(value, this._callback, this);

          expect(value).to(eq(3));
        }
      };

      testObject.action();
    });
  });

  describe('#equal', function() {
    context('when not equal', function() {
      var value = [[2, 5, 1], [2, 9]];
      
      it('should return false', function() {
        var result = subject().equal(value);
  
        expect(result).to(beFalse());
      });
    });

    context('when equal', function() {
      var value = [[2, 5, 1], [2, 5, 1]];

      it('should return true', function() {
        var result = subject().equal(value);

        expect(result).to(beTrue());
      });
    });
  });

  describe('#areItemsEqual', function() {
    context('when not equal', function() {
      var value = [2, 5, 1];

      it('should return false', function() {
        var result = subject().areItemsEqual(value);

        expect(result).to(beFalse());
      });
    });

    context('when equal', function() {
      var value = [2, 2, 2];

      it('should return true', function() {
        var result = subject().areItemsEqual(value);

        expect(result).to(beTrue());
      });
    });
  });

  describe('#transpose', function() {
    var value = [[2, 5, 1], [2, 9]];

    it('should return transposed matrix', function() {
      var result = subject().transpose(value);
      
      expect(result[0]).to(eq([2, 2]));
      expect(result[1]).to(eq([5, 9]));
      expect(result[2]).to(eq([1, undefined]));
    });
  });

  describe('#all', function() {
    context('when all elements meet the requirements', function() {
      it('should return true', function() {
        var testObject = {
          _callback: function(i, idx) {
            return i > idx;
          },

          action: function() {
            var value = [1, 3, 4, 4, 8];
            var result = subject().all(value, this._callback, this);

            expect(result).to(beTrue());
          }
        };

        testObject.action();
      });
    });

    context('when at leat one element does not meet the requirements', function() {
      it('should return false', function() {
        var testObject = {
          _callback: function(i, idx) {
            return i > idx;
          },

          action: function() {
            var value = [1, 1, 4, 4, 8];
            var result = subject().all(value, this._callback, this);

            expect(result).to(beFalse());
          }
        };

        testObject.action();
      });
    });
  });

  describe('#any', function() {
    context('when any elements meets the requirements', function() {
      it('should return true', function() {
        var testObject = {
          _callback: function(i, idx) {
            return i > idx;
          },

          action: function() {
            var value = [0, 1, 3, 3, 4];
            var result = subject().any(value, this._callback, this);

            expect(result).to(beTrue());
          }
        };

        testObject.action();
      });
    });

    context('when none of elements meet the requirements', function() {
      it('should return false', function() {
        var testObject = {
          _callback: function(i, idx) {
            return i > idx;
          },

          action: function() {
            var value = [0, 1, 2, 3, 4];
            var result = subject().any(value, this._callback, this);

            expect(result).to(beFalse());
          }
        };

        testObject.action();
      });
    });
  });

  describe('#partition', function() {
    it('should split collection according to the condition', function() {
      var testObject = {
        _callback: function(i, idx) {
          return i > idx;
        },

        action: function() {
          var value = [0, 2, 3, 8, 4];
          var result = subject().partition(value, this._callback, this);

          expect(result.x).to(eq([2, 3, 8]));
          expect(result.y).to(eq([0, 4]));
        }
      };

      testObject.action();
    });
  });

  describe('#uniq', function() {
    context('with default function', function() {
      it('should return valid collection', function() {
        var value = [8, 2, 3, 8, 2];
        var result = subject().uniq(value);

        expect(result).to(eq([8, 2, 3]));
      });
    });

    context('with specific function', function() {
      it('should return valid collection', function() {
        var testObject = {
          _callback: function(i, idx) {
            return artjs.String.last((i * i).toString());
          },
          
          action: function() {
            var value = [0, 2, 10, 8, 12];
            var result = subject().uniq(value, this._callback, this);
  
            expect(result).to(eq([0, 2]));
          }
        };
  
        testObject.action();
      });
    });

    describe('#groupBy', function() {
      it('should return valid object', function() {
        var testObject = {
          _callback: function(i, idx) {
            return i % 3 == 0;
          },
          
          action: function() {
            var value = [0, 6, 7, 8, 12];
            var result = subject().groupBy(value, this._callback, this);
            
            expect(result[true]).to(eq([0, 6, 12]));
            expect(result[false]).to(eq([7, 8]));
          }
        };
  
        testObject.action();
      });
      
      context('with keepOrder flag', function() {
        it('should return array of points', function() {
          var testObject = {
            _callback: function(i, idx) {
              return i % 3 == 0;
            },

            action: function() {
              var value = [0, 6, 7, 8, 12];
              var result = subject().groupBy(value, this._callback, this, true);

              expect(result[0].x).to(eq('true'));
              expect(result[0].y).to(eq([0, 6, 12]));
              expect(result[1].x).to(eq('false'));
              expect(result[1].y).to(eq([7, 8]));
            }
          };

          testObject.action();
        });
      });
    });
  });
  
  describe('#intersection', function() {
    it('should return common part', function() {
      var value = [[1, 2, 3, 4], [8, 23, 3, 4, 1], [4, 1, 2]];
      var result = subject().intersection(value);
      
      expect(result).to(eq([1, 4]));
    });
  });

  describe('#selectNonEmpty', function() {
    it('should return collection of non empty arrays', function() {
      var value = [[], [8, 1], []];
      var result = subject().selectNonEmpty(value);

      expect(result.length).to(eq(1));
      expect(result[0]).to(eq([8, 1]));
    });
  });

  describe('#compact', function() {
    it('should return collection without null values', function() {
      var value = [null, 0, 1, undefined, ''];
      var result = subject().compact(value);
      
      expect(result).to(eq([0, 1, '']));
    });
  });

  describe('#isEmpty', function() {
    context('when array is empty', function() {
      it('should return true', function() {
        var value = [];
        var result = subject().isEmpty(value);

        expect(result).to(beTrue());
      });
    });
    
    context('when array is not empty', function() {
      it('should return false', function() {
        var value = [null];
        var result = subject().isEmpty(value);

        expect(result).to(beFalse());
      });
    });
  });

  describe('#isNotEmpty', function() {
    context('when array is empty', function() {
      it('should return false', function() {
        var value = [];
        var result = subject().isNotEmpty(value);

        expect(result).to(beFalse());
      });
    });

    context('when array is not empty', function() {
      it('should return true', function() {
        var value = [null];
        var result = subject().isNotEmpty(value);

        expect(result).to(beTrue());
      });
    });
  });

  describe('#numerize', function() {
    it('should return array of numerical values', function() {
      var value = ['1', 2, '3'];
      var result = subject().numerize(value);

      expect(result).to(eq([1, 2, 3]));
    });
  });

  describe('#print', function() {
    it('should print all the values', function() {
      var value = ['hello', 3];

      expect(artjs).to(receive('p')).inSeries().withArgs(['hello'], [3]);
      
      subject().print(value);
    });
  });

  describe('#sum', function() {
    it('should sum all the values', function() {
      var value = [4, 3, -2];
      var result = subject().sum(value);
      
      expect(result).to(eq(5));
    });
  });

  describe('#stringify', function() {
    it('should sum all the values', function() {
      var value = [4, 'text', undefined, null, false, {}];
      var result = subject().stringify(value);

      expect(result).to(eq(['4', 'text', '', '', 'false', '[object Object]']));
    });
  });
});
spec(artjs.Class, function() {
  describe('inheritance', function() {
    var Grand, Parent, Child;
    
    before(function() {
      Grand = subject()(
        function(name) {
          this.name = name;
        }, 
        {
          instanceMethod: function(value) {
            return value + 2;
          }
        },
        {
          staticMethod: function(value) {
            return value + 3;
          },
          id: 3,
          classname: 'Grand'
        }
      );
      
      Parent = subject()(
        function(name) {
          this.super(name);
        }, 
        {
          instanceMethod: function(value) {
            return this.super(value) * 2;
          }
        }, 
        {
          staticMethod: function(value) {
            return this.super(value) * 3;
          },
          classname: 'Parent'
        }, 
        Grand
      );
      
      Child = subject()(
        function(name) {
          this.super(name);
        }, 
        {
          instanceMethod: function(value) {
            return this.super(value) - 1;
          }
        }, 
        {
          staticMethod: function(value) {
            return this.super(value) - 2;
          },
          classname: 'Child'
        },
        Parent
      )
    });
    
    it('should return valid value', function() {
      var parent = new Parent('parent');
      var child = new Child('child');
      
      expect(parent.name).to(eq('parent'));
      expect(parent.instanceMethod(2)).to(eq(8));
      expect(Parent.staticMethod(2)).to(eq(15));
      expect(Parent.classname).to(eq('Parent'));
      expect(Child.id).to(eq(3));
      expect(child.instanceMethod(2)).to(eq(7));
      expect(Child.staticMethod(2)).to(eq(13));
    });
  });
});
spec(artjs.ClassToggler, function() {
  describe('#getCurrent', function() {
    it('should start with null as a current', function() {
      var className = 'class';
      var toggler = new artjs.ClassToggler(className);
  
      expect(toggler.getCurrent()).to(beNull());
    });
  });

  describe('#toggle', function() {
    it('should change current', function() {
      var className = 'class';
      var toggler = new artjs.ClassToggler(className);
      var element = artjs.$E('p');
      
      toggler.toggle(element);
      
      expect(artjs.Element.hasClass(element, className)).to(beTrue());
    });
  });
});
spec(artjs.Date, function() {
  describe('#getTime', function() {
    it('should return getTime() of Date instance', function() {
      var result = subject().getTime();
      
      expect(result).to(beA('number'));
    });
  });

  describe('#monthDaysNum', function() {
    it('should return number of days in given month', function() {
      var result = subject().monthDaysNum('2014-02-23');
      
      expect(result).to(eq(28));
    });
  });

  describe('#firstDate', function() {
    it('should return first day of the month', function() {
      var result = subject().firstDate('2014-02-23');
      
      expect(result.getDate()).to(eq(1));
      expect(result.getMonth()).to(eq(1));
      expect(result.getFullYear()).to(eq(2014));
    });
  });

  describe('#firstDay', function() {
    it('should return week day of first day of the month', function() {
      var date = '2014-02-23';
      var firstDate = mock();
      var result = mock();
      
      expect(subject()).to(receive('firstDate')).withArgs(date).andReturn(firstDate);
      expect(firstDate).to(receive('getDay')).andReturn(result);
      
      expect(subject().firstDay(date)).to(eq(result));
    });
  });

  describe('#toHMS', function() {
    it('should return hours, minutes, seconds format of date', function() {
      var date = new Date('Mon, 25 Dec 1995 13:30:00');
      
      expect(subject().toHMS(date)).to(eq('13:30:00'));
    });
  });

  describe('#toYMD', function() {
    it('should return year, month, date format of date', function() {
      var date = new Date('Mon, 25 Dec 1995 13:30:00');

      expect(subject().toYMD(date, '/')).to(eq('1995/12/25'));
    });
  });

  describe('#toDMY', function() {
    it('should return date, month, year format of date', function() {
      var date = new Date('Mon, 25 Dec 1995 13:30:00');

      expect(subject().toDMY(date, '/')).to(eq('25/12/1995'));
    });
  });

  describe('#fromDMY', function() {
    it('should create date based on date, month, year format', function() {
      var result = subject().fromDMY('23/02/2014', '/');

      expect(result.getFullYear()).to(eq(2014));
      expect(result.getMonth()).to(eq(1));
      expect(result.getDate()).to(eq(23));
    });
  });

  describe('#fromYMD', function() {
    it('should create date based on year, month, date format', function() {
      var result = subject().fromYMD('2014/02/23', '/');

      expect(result.getFullYear()).to(eq(2014));
      expect(result.getMonth()).to(eq(1));
      expect(result.getDate()).to(eq(23));
    });
  });

  describe('#minutesToHM', function() {
    it('should convert minutes to hours, minutes format', function() {
      var result = subject().minutesToHM(68);

      expect(result).to(eq('1:08'));
    });
  });

  describe('#hmToMinutes', function() {
    it('should return number of minutes based on hours, minutes format', function() {
      var result = subject().hmToMinutes('1:08');

      expect(result).to(eq(68));
    });
  });

  describe('#secondsToMS', function() {
    it('should convert seconds to minutes, seconds format', function() {
      var result = subject().secondsToMS(68);

      expect(result).to(eq('01:08'));
    });
  });

  describe('#msToSeconds', function() {
    it('should return number of seconds based on minutes, seconds format', function() {
      var result = subject().msToSeconds('1:08');

      expect(result).to(eq(68));
    });
  });

  describe('#secondsToHMS', function() {
    it('should convert seconds to hours, minutes, seconds format', function() {
      var result = subject().secondsToHMS(3982);

      expect(result).to(eq('1:06:22'));
    });
  });

  describe('#copy', function() {
    it('should return copy of date', function() {
      var date = new Date('Mon, 25 Dec 1995 13:30:00');
      var result = subject().copy(date);

      expect(result.getFullYear()).to(eq(1995));
      expect(result.getMonth()).to(eq(11));
      expect(result.getDate()).to(eq(25));
      expect(result.getHours()).to(eq(13));
      expect(result.getMinutes()).to(eq(30));
      expect(result.getSeconds()).to(eq(0));
    });
  });

  describe('#getDateShifted', function() {
    it('should return date with days offset', function() {
      var date = new Date('Mon, 25 Dec 1995 13:30:00');
      var result = subject().getDateShifted(date, -3);

      expect(result.getFullYear()).to(eq(1995));
      expect(result.getMonth()).to(eq(11));
      expect(result.getDate()).to(eq(22));
      expect(result.getHours()).to(eq(13));
      expect(result.getMinutes()).to(eq(30));
      expect(result.getSeconds()).to(eq(0));
    });
  });

  describe('#stripDayTime', function() {
    it('should return date with time set to 0', function() {
      var date = new Date('Mon, 25 Dec 1995 13:30:00');
      var result = subject().stripDayTime(date);

      expect(result.getFullYear()).to(eq(1995));
      expect(result.getMonth()).to(eq(11));
      expect(result.getDate()).to(eq(25));
      expect(result.getHours()).to(eq(0));
      expect(result.getMinutes()).to(eq(0));
      expect(result.getSeconds()).to(eq(0));
    });
  });

  describe('#msToHMSM', function() {
    it('should convert miliseconds to hours, minutes, seconds, miliseconds format', function() {
      var result = subject().msToHMSM(3982123);

      expect(result).to(eq('1:06:22.123'));
    });
  });

  describe('#msToMSM', function() {
    it('should convert miliseconds to minutes, seconds, miliseconds format', function() {
      var result = subject().msToMSM(3982123);

      expect(result).to(eq('66:22.123'));
    });
  });
});
spec(artjs.Element, function() {
  var element;
  
  before(function() {
    element = mock();
  });

  describe('#setVisible', function() {
    context('with true argument', function() {
      it('should delegate to "show"', function() {
        expect(subject()).to(receive('show')).withArgs(element);
        
        subject().setVisible(element, true);
      });
    });
    
    context('with false argument', function() {
      it('should delegate to "hide"', function() {
        expect(subject()).to(receive('hide')).withArgs(element);
        
        subject().setVisible(element, false);
      });
    });
  });
  
  describe('#hide and #show', function() {
    it('should push to and remove from HIDDEN_ELEMENTS', function() {
      element.style = {};
      
      subject().hide(element);
      
      expect(artjs.Array.pluck(subject().HIDDEN_ELEMENTS, 'element')).to(contain(element));
      
      subject().show(element);
      
      expect(artjs.Array.pluck(subject().HIDDEN_ELEMENTS, 'element')).toNot(contain(element));
    });
  });
});
spec(artjs.Math, function() {
  describe('#sgn', function() {
    context('when number negative', function() {
      it('should return -1', function() {
        expect(subject().sgn(-24)).to(eq(-1));
      });
    });

    context('when number is equal to zero', function() {
      it('should return 0', function() {
        expect(subject().sgn(0)).to(eq(0));
      });
    });

    context('when number is positive', function() {
      it('should return 1', function() {
        expect(subject().sgn(10)).to(eq(1));
      });
    });
  });

  describe('#limit', function() {
    var bottom = 2;
    var top = 6;
    var value;
    
    context('when number is below the range', function() {
      value = -2;
      
      it('should return bottom range value', function() {
        expect(subject().limit(value, bottom, top)).to(eq(bottom));
      });
    });

    context('when number is within the range', function() {
      value = 3;

      it('should return the value', function() {
        expect(subject().limit(value, bottom, top)).to(eq(value));
      });
    });

    context('when number is over the range', function() {
      value = 19;

      it('should return top range value', function() {
        expect(subject().limit(value, bottom, top)).to(eq(top));
      });
    });
  });

  describe('#sawtooth', function() {
    var bottom = 2;
    var top = 6;
    var value;

    context('when number is below the range', function() {
      value = 1;

      it('should return bottom range value', function() {
        expect(subject().sawtooth(value, bottom, top)).to(eq(5));
      });
    });

    context('when number is within the range', function() {
      value = 3;

      it('should return the value', function() {
        expect(subject().sawtooth(value, bottom, top)).to(eq(value));
      });
    });

    context('when number is over the range', function() {
      value = 8;

      it('should return top range value', function() {
        expect(subject().sawtooth(value, bottom, top)).to(eq(4));
      });
    });
  });

  describe('#stairs', function() {
    var bottom = 2;
    var top = 6;
    var value;

    context('when number is in first division below the range', function() {
      value = 1;

      it('should return -1', function() {
        expect(subject().stairs(value, bottom, top)).to(eq(-1));
      });
    });

    context('when number is within the range', function() {
      value = 3;

      it('should return 0', function() {
        expect(subject().stairs(value, bottom, top)).to(eq(0));
      });
    });

    context('when number is in first division over the range', function() {
      value = 8;

      it('should return 1', function() {
        expect(subject().stairs(value, bottom, top)).to(eq(1));
      });
    });

    context('when number is in second division over the range', function() {
      value = 11;

      it('should return 2', function() {
        expect(subject().stairs(value, bottom, top)).to(eq(2));
      });
    });
  });

  describe('#isNonNegative', function() {
    var value;

    context('when number is negative', function() {
      value = -3;

      it('should be false', function() {
        expect(subject().isNonNegative(value)).to(beFalse());
      });
    });

    context('when number is equal to zero', function() {
      value = 0;

      it('should be true', function() {
        expect(subject().isNonNegative(value)).to(beTrue());
      });
    });

    context('when number is positive', function() {
      value = 8;

      it('should be true', function() {
        expect(subject().isNonNegative(value)).to(beTrue());
      });
    });
  });
});
spec(artjs.Object, function() {
  describe('#copy', function() {
    it('should return copy of the object', function() {
      var source = {a: 5, b: function() {}};
      var result = subject().copy(source);
      
      expect(result.a).to(eq(source.a));
      expect(result.b).to(eq(source.b));
      expect(artjs.Object.keys(result)).to(eq(['a', 'b']));
    });
  });

  describe('#copyProps', function() {
    it('should copy properties from one object to another', function() {
      var source = {a: 5, b: function() {}};
      var target = {c: 'hello', b: 8};
      
      subject().copyProps(source, target);

      expect(target.a).to(eq(source.a));
      expect(target.b).to(eq(source.b));
      expect(artjs.Object.keys(target)).to(eq(['c', 'b', 'a']));
    });
  });

  describe('#extend', function() {
    it('should do same action as #copyProps but with swapped arguments', function() {
      var source = mock();
      var target = mock();
      
      expect(subject()).to(receive('copyProps')).withArgs(source, target);

      subject().extend(target, source);
    });
  });

  describe('#merge', function() {
    it('should extend copy of the object and return it', function() {
      var source = {a: 1};
      var target = {b: 2};
      var result = subject().merge(target, source);
      
      expect(result.a).to(eq(source.a));
      expect(result.b).to(eq(target.b));
    });
  });
  
  describe('#removeValue', function() {
    it('should remove keys with given value', function() {
      var obj = {a: 5, b: 7, c: 5};

      subject().removeValue(obj, 5);
      
      expect(artjs.Object.keys(obj)).to(eq('b'));
    });
  });

  describe('#removeValues', function() {
    it('should remove keys with given values', function() {
      var obj = {a: 5, b: 7, c: 5, d: 8};

      subject().removeValues(obj, [7, 5]);

      expect(artjs.Object.keys(obj)).to(eq('d'));
    });
  });

  describe('#keys', function() {
    it('should return keys', function() {
      var obj = {a: 5, b: 7, c: 8};

      var result = subject().keys(obj);

      expect(result).to(eq(['a', 'b', 'c']));
    });
  });

  describe('#values', function() {
    it('should return values', function() {
      var obj = {a: 5, b: 7, c: 8};

      var result = subject().values(obj);

      expect(result).to(eq([5, 7, 8]));
    });
  });

  describe('#map', function() {
    it('should map object to array', function() {
      var obj = {a: 5, b: 7, c: 8};

      var result = subject().map(obj, function(k, v) { return k + v; });

      expect(result).to(eq(['a5', 'b7', 'c8']));
    });
  });

  describe('#mapValue', function() {
    it('should change object values', function() {
      var obj = {a: 5, b: 7, c: 8};

      var result = subject().mapValue(obj, function(k, v) { return v + 1; });

      expect(artjs.Object.values(result)).to(eq([6, 8, 9]));
    });
  });

  describe('#mapKey', function() {
    it('should change object keys', function() {
      var obj = {a: 5, b: 7, c: 8};

      var result = subject().mapKey(obj, function(k) { return k + k; });

      expect(artjs.Object.keys(result)).to(eq(['aa', 'bb', 'cc']));
    });
  });

  describe('#eachValue', function() {
    it('should iterate over items', function() {
      var obj = {a: 5, b: 7, c: -8};
      var result = 0;

      subject().eachValue(obj, function(i) { result += i; });

      expect(result).to(eq(4));
    });
  });

  describe('#eachKey', function() {
    it('should iterate over keys', function() {
      var obj = {a: 5, b: 7, c: -8};
      var result = '';

      subject().eachKey(obj, function(i) { result += i; });

      expect(result).to(eq('abc'));
    });
  });

  describe('#each', function() {
    it('should iterate over (key, value) pair', function() {
      var obj = {a: 5, b: 7, c: -8};
      var result = '';

      subject().each(obj, function(k, v) { result += (k + v); });

      expect(result).to(eq('a5b7c-8'));
    });
  });

  describe('#select', function() {
    it('should return filtered array', function() {
      var obj = {a: 5, b: 7, c: -8};
      var result = subject().select(obj, function(v, k) { return v > 0; });

      expect(artjs.Object.keys(result)).to(eq(['a', 'b']));
    });
  });

  describe('#reject', function() {
    it('should return filtered array', function() {
      var obj = {a: 5, b: 7, c: -8};
      var result = subject().reject(obj, function(i) { return i > 0; });

      expect(artjs.Object.keys(result)).to(eq(['c']));
    });
  });

  describe('#isArray', function() {
    context('when an array', function() {
      it('should return true', function() {
        var obj = [];
        var result = subject().isArray(obj);

        expect(result).to(beTrue());
      });
    });

    context('when not an array', function() {
      context('when Object', function() {
        it('should return false', function () {
          var obj = {};
          var result = subject().isArray(obj);

          expect(result).to(beFalse());
        });
        
        context('with length property', function() {
          it('should return false', function () {
            var obj = {length: 0};
            var result = subject().isArray(obj);
  
            expect(result).to(beFalse());
          });
        });
      });
      
      context("when 'arguments'", function() {
        it('should return false', function () {
          var test = function () {
            var result = subject().isArray(arguments);

            expect(result).to(beFalse());
          };

          test();
        });
      });
      
      context('when NodeList', function() {
        it('should return false', function () {
          var obj = document.getElementsByName('');
          var result = subject().isArray(obj);

          expect(result).to(beFalse());
        });
      });
    });
  });
  
  describe('#isNull', function() {
    var obj;
    
    context('when null', function() {
      obj = null;
      
      it('should return true', function() {
        var result = subject().isNull(obj);

        expect(result).to(beTrue());
      });
    });

    context('when undefined', function() {
      obj = undefined;
      
      it('should return false', function() {
        var result = subject().isNull(obj);

        expect(result).to(beTrue());
      });
    });
    
    context('when defined', function() {
      obj = 0;
      
      it('should return false', function() {
        var result = subject().isNull(obj);

        expect(result).to(beFalse());
      });
    });
  });

  describe('#isEmpty', function() {
    context('when is empty', function() {
      it('should return true', function() {
        var obj = {};
        var result = subject().isEmpty(obj);

        expect(result).to(beTrue());
      });
    });

    context('when is not empty', function() {
      it('should return false', function() {
        var obj = {a: 5};
        var result = subject().isEmpty(obj);

        expect(result).to(beFalse());
      });
    });
  });

  describe('#build', function() {
    it('should return new object', function() {
      var array = [new artjs.Point('a', 5)];
      var result = subject().fromPoints(array);

      expect(artjs.Object.keys(result)).to(eq(['a']));
      expect(artjs.Object.values(result)).to(eq([5]));
    });
  });

  describe('#fromArray', function() {
    it('should return new object', function() {
      var array = [['a', 5]];
      var result = subject().fromArray(array);

      expect(artjs.Object.keys(result)).to(eq(['a']));
      expect(artjs.Object.values(result)).to(eq([5]));
    });
  });

  describe('#toArray', function() {
    it('should return false', function() {
      var obj = {a: 5};
      var result = subject().toArray(obj);

      expect(result.length).to(eq(1));
      expect(result[0]).to(eq(['a', 5]));
    });
  });

  describe('#includes', function() {
    var obj = {a: 5};
    
    context('when does not include value', function() {
      it('should return false', function() {
        var result = subject().includes(obj, 6);

        expect(result).to(beFalse());
      });
    });

    context('when does include value', function() {
      it('should return true', function() {
        var result = subject().includes(obj, 5);

        expect(result).to(beTrue());
      });
    });
  });

  describe('#includesAll', function() {
    var obj = {a: 5, b: 7, c: 8};
    
    context('when does not include all values', function() {
      it('should return false', function() {
        var result = subject().includesAll(obj, [5, 6]);

        expect(result).to(beFalse());
      });
    });

    context('when does include all given values', function() {
      it('should return true', function() {
        var result = subject().includesAll(obj, [5, 8]);

        expect(result).to(beTrue());
      });
    });
  });

  describe('#all', function() {
    context('when not all values meet the condition', function() {
      it('should return false', function() {
        var obj = {a: 5, b: -2, c: 8};
        var result = subject().all(obj, function(i) {
          return i > 0;
        });

        expect(result).to(beFalse());
      });
    });

    context('when all values meet the condition', function() {
      it('should return true', function() {
        var obj = {a: 5, b: 2, c: 8};
        var result = subject().all(obj, function(i) {
          return i > 0;
        });

        expect(result).to(beTrue());
      });
    });
  });

  describe('#toQueryString', function() {
    it('should return valid string', function() {
      var obj = {a: 5, b: 'hello', c: false};
      var result = subject().toQueryString(obj);

      expect(result).to(eq('a=5&b=hello&c=0'));
    });
  });
});
spec(artjs.String, function() {
  describe('#first', function() {
    it('should return valid value', function() {
      expect(subject().first('asdf')).to(eq('a'));
    });
  });

  describe('#last', function() {
    it('should return valid value', function() {
      expect(subject().last('asdf')).to(eq('f'));
    });
  });

  describe('#strip', function() {
    context('contains spaces', function() {
      var value = '   asd f  ';
      
      it('should strip them', function() {
        expect(subject().strip(value)).to(eq('asdf'));
      });
    });

    context('does not contain spaces', function() {
      var value = 'asdf';
      
      it('should leave as it is', function() {
        expect(subject().strip(value)).to(eq('asdf'));
      });
    });
  });

  describe('#isBlank', function() {
    context('when argument is null', function() {
      var value = null;
      
      it('should return true', function() {
        expect(subject().isBlank(value)).to(beTrue());
      });
    });

    context('when argument is undefined', function() {
      var value = undefined;
      
      it('should return true', function() {
        expect(subject().isBlank(value)).to(beTrue());
      });
    });

    context('when argument is empty', function() {
      var value = 'str';
      var isEmpty = true;

      it('should return true', function() {
        expect(artjs.String).to(receive('isEmpty')).withArgs(value).andReturn(isEmpty);
        expect(subject().isBlank(value)).to(beTrue());
      });
    });

    context('when argument is not empty', function() {
      var value = 'str';
      var isEmpty = false;

      it('should return true', function() {
        expect(artjs.String).to(receive('isEmpty')).withArgs(value).andReturn(isEmpty);
        expect(subject().isBlank(value)).to(beFalse());
      });
    });
  });

  describe('#nullifyEmpty', function() {
    context('when argument is empty', function() {
      var value = 'str';
      var isEmpty = true;

      it('should return null', function() {
        expect(artjs.String).to(receive('isEmpty')).withArgs(value).andReturn(isEmpty);
        expect(subject().nullifyEmpty(value)).to(beNull());
      });
    });

    context('when argument is not empty', function() {
      var value = 'str';
      var isEmpty = false;

      it('should return true', function() {
        expect(artjs.String).to(receive('isEmpty')).withArgs(value).andReturn(isEmpty);
        expect(subject().nullifyEmpty(value)).to(eq(value));
      });
    });
  });

  describe('#toS', function() {
    context('when argument is falsy', function() {
      artjs.Array.each([null, undefined, ''], function(i) {
        it('should return empty string', function() {
          expect(subject().toS(i)).to(eq(''));
        });
      });
    });

    context('when argument is non empty string', function() {
      var value = 'str';

      it('should return that string', function() {
        expect(subject().toS(value)).to(eq(value));
      });
    });
  });
  
  describe('#countPattern', function() {
    it('should return correct value', function() {
      expect(subject().countPattern('startasdfhelloasdfend', 'asdf')).to(eq(2));
    });
  });

  describe('#align', function() {
    var str = 'align';
    
    context('length argument is smaller than length of a string', function() {
      var n = str.length - 1;
      
      it('should return correct value', function() {
        expect(subject().align(str, n, '.', true)).to(eq('align'));
      });
    });

    context('length argument is greater than length of a string', function() {
      var n = str.length + 3;

      it('should return correct value', function() {
        expect(subject().align(str, n, '.', true)).to(eq('align...'));
      });
    });
  });

  describe('#getMultiPattern', function() {
    it('should return correct value', function() {
      expect(subject().getMultiPattern('str', 3)).to(eq('strstrstr'));
    });
  });

  describe('#formatPrice', function() {
    it('should return correct value', function() {
      expect(subject().formatPrice(21.7)).to(eq('21.70'));
      expect(subject().formatPrice(21)).to(eq('21.00'));
    });
  });

  describe('#addZeros', function() {
    it('should return correct value', function() {
      expect(subject().addZeros('24', 4)).to(eq('0024'));
    });
  });

  describe('#truncate', function() {
    var text = 'this text needs to be truncated';

    context('when given length is grater than text length', function() {
      var n = text.length + 3;
      
      it('should return unchanged text', function() {
        expect(subject().truncate(text, n)).to(eq(text));
      });
    });

    context('when given length is smaller than text length', function() {
      var n = 12;
      
      it('should return valid text', function() {
        expect(subject().truncate(text, n)).to(eq('this text ne...'));
      });
      
      context('with custom ending', function() {
        it('should return valid text', function() {
          expect(subject().truncate(text, n, false, ' |')).to(eq('this text ne |'));
        });
      });
      
      context('when onlyWords is set to true', function() {
        context('when length matches the space', function() {
          n = 9;
  
          it('should return valid text', function() {
            expect(subject().truncate(text, n, true)).to(eq('this text...'));
          });
        });
  
        context('when length matches the space', function() {
          n = 8;
  
          it('should return valid text', function() {
            expect(subject().truncate(text, n, true)).to(eq('this...'));
          });
        });
      });
    });
  });
  
  describe('#pluralize', function() {
    context('when singular', function() {
      it('should return unchanged word', function() {
        expect(subject().pluralize(1, 'horse')).to(eq('horse'));
      });
    });

    context('when plural', function() {
      it('should return plural version of word', function() {
        expect(subject().pluralize(4, 'horse')).to(eq('horses'));
      });
    });
  });

  describe('#capitalize', function() {
    it('should return correct value', function() {
      var value = 'this text needs to be capitalized';
      
      expect(subject().capitalize(value)).to(eq('This Text Needs To Be Capitalized'));
    });
  });

  describe('#capitalizeWord', function() {
    it('should return correct value', function() {
      var value = 'this word needs to be capitalized';

      expect(subject().capitalizeWord(value)).to(eq('This word needs to be capitalized'));
    });
  });

  describe('#capitalizeUnderscored', function() {
    it('should return correct value', function() {
      var value = 'this_text_needs_to_be_capitalized';

      expect(subject().capitalizeUnderscored(value)).to(eq('ThisTextNeedsToBeCapitalized'));
    });
  });

  describe('#trim', function() {
    it('should return correct value', function() {
      var value = '   This text needs to be trimmed ';

      expect(subject().trim(value)).to(eq('This text needs to be trimmed'));
    });
    
    context('with character given', function() {
      it('should return correct value', function() {
        var value = '---This text needs to be trimmed-';

        expect(subject().trim(value, '-')).to(eq('This text needs to be trimmed'));
      });
    });

    context('with replacement given', function() {
      it('should return correct value', function() {
        var value = '   This text needs to be trimmed ';

        expect(subject().trim(value, null, '-')).to(eq('-This text needs to be trimmed-'));
      });
    });
  });

  describe('#sub', function() {
    it('should return correct value', function() {
      var value = 'Get substring of this text';

      expect(subject().sub(value, -9, 3)).to(eq('this textGet'));
    });
  });

  describe('#toJson', function() {
    it('should return correct value', function() {
      var value = '{"a": 5, "b": {"c": "hello"}}';
      var result = subject().toJson(value);
      
      expect(result.a).to(eq(5));
      expect(result.b.c).to(eq('hello'));
    });
  });
  
  describe('#startsWith', function() {
    context('when string starts with pattern', function() {
      it('should return true', function() {
        var result = subject().startsWith('artJs', 'art');
        
        expect(result).to(beTrue());
      });
    });
    
    context('when string does not start with pattern', function() {
      it('should return false', function() {
        var result = subject().startsWith('artJs', 'moo');
        
        expect(result).to(beFalse());
      });
    });
  });
});
spec(artjs.Toggler, function() {
  it('should start with null as a current', function() {
    var toggler = new artjs.Toggler();
    
    expect(toggler.current).to(beNull());
  });
  
  describe('#toggle', function() {
    it('should change current', function() {
      var toggler = new artjs.Toggler();
      var value = 'value';
      
      toggler.toggle(value);

      expect(toggler.current).to(eq(value));
    });

    it('should handle events', function() {
      var toggler = new artjs.Toggler();
      var value1 = 'value1';
      var value2 = 'value2';

      toggler.toggle(value1);

      var handler = {
        _onActivate: function(v) {},
        _onDeactivate: function(v) {},
        
        onActivate: function(t) {
          this._onActivate(t.current);
        },
        onDeactivate: function(t) {
          this._onDeactivate(t.current);
        }
      };
      
      toggler.onActivate.add(artjs.$D(handler, handler.onActivate));
      toggler.onDeactivate.add(artjs.$D(handler, handler.onDeactivate));

      expect(handler).to(receive('_onDeactivate')).withArgs(value1);
      expect(handler).to(receive('_onActivate')).withArgs(value2);

      toggler.toggle(value2);
    });
  });
});
