spec(ArtJs.ArrayUtils, function() {
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

  describe('#getItem', function() {
    it('should return requested element', function() {
      expect(subject().getItem([6, 3, 2, 8], 2)).to(eq(2));
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
      var value = [6, 3, 2, 8];
      var result = subject().removeAt(value, 2);
      
      expect(result).to(eq(2));
      expect(value).to(eq([6, 3, 8]));
    });
  });

  describe('#removeItem', function() {
    it('should remove all occurences of given element', function() {
      var value = [6, 3, 2, 8, 3];
      var result = subject().removeItem(value, 3);

      expect(value).to(eq([6, 2, 8]));
    });
    
    context('with onlyFirst flag set to true', function() {
      it('should remove only first occurence of given element', function() {
        var value = [6, 3, 2, 8, 3];
        var result = subject().removeItem(value, 3, true);

        expect(value).to(eq([6, 3, 2, 8]));
      });
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
          
          expect(ArtJs.ObjectUtils.getKeys(result)).to(eq(['a', 'd_0', 'd_1']));
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

  describe('#itemsEqual', function() {
    context('when not equal', function() {
      var value = [2, 5, 1];

      it('should return false', function() {
        var result = subject().itemsEqual(value);

        expect(result).to(beFalse());
      });
    });

    context('when equal', function() {
      var value = [2, 2, 2];

      it('should return true', function() {
        var result = subject().itemsEqual(value);

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
            return ArtJs.StringUtils.last((i * i).toString());
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

  describe('#nonEmpty', function() {
    context('when array is empty', function() {
      it('should return false', function() {
        var value = [];
        var result = subject().nonEmpty(value);

        expect(result).to(beFalse());
      });
    });

    context('when array is not empty', function() {
      it('should return true', function() {
        var value = [null];
        var result = subject().nonEmpty(value);

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

      expect(ArtJs).to(receive('p')).inSeries().withArgs(['hello'], [3]);
      
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
