spec(ArtJs.ObjectUtils, function() {
  describe('#copy', function() {
    it('should return copy of the object', function() {
      var source = {a: 5, b: function() {}};
      var result = subject().copy(source);
      
      expect(result.a).to(eq(source.a));
      expect(result.b).to(eq(source.b));
      expect(ArtJs.ObjectUtils.keys(result)).to(eq(['a', 'b']));
    });
  });

  describe('#copyProps', function() {
    it('should copy properties from one object to another', function() {
      var source = {a: 5, b: function() {}};
      var target = {c: 'hello', b: 8};
      
      subject().copyProps(source, target);

      expect(target.a).to(eq(source.a));
      expect(target.b).to(eq(source.b));
      expect(ArtJs.ObjectUtils.keys(target)).to(eq(['c', 'b', 'a']));
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
    it('should extend the object and return it', function() {
      var source = mock();
      var target = mock();

      expect(subject()).to(receive('extend')).withArgs(target, source);

      var result = subject().merge(target, source);
      
      expect(result).to(eq(target));
    });
  });

  describe('#update', function() {
    it('should be alias of merge', function() {
      var source = mock();
      var target = mock();
      var returnValue = mock();
      
      expect(subject()).to(receive('merge')).withArgs(target, source).andReturn(returnValue);

      var result = subject().update(target, source);
      
      expect(result).to(eq(returnValue));
    });
  });

  describe('#removeValue', function() {
    it('should remove keys with given value', function() {
      var obj = {a: 5, b: 7, c: 5};

      subject().removeValue(obj, 5);
      
      expect(ArtJs.ObjectUtils.keys(obj)).to(eq('b'));
    });
  });

  describe('#removeValues', function() {
    it('should remove keys with given values', function() {
      var obj = {a: 5, b: 7, c: 5, d: 8};

      subject().removeValues(obj, [7, 5]);

      expect(ArtJs.ObjectUtils.keys(obj)).to(eq('d'));
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

      var result = subject().mapValue(obj, function(v) { return v + 1; });

      expect(ArtJs.ObjectUtils.values(result)).to(eq([6, 8, 9]));
    });
  });

  describe('#mapKey', function() {
    it('should change object keys', function() {
      var obj = {a: 5, b: 7, c: 8};

      var result = subject().mapKey(obj, function(k) { return k + k; });

      expect(ArtJs.ObjectUtils.keys(result)).to(eq(['aa', 'bb', 'cc']));
    });
  });

  describe('#each', function() {
    it('should iterate over items', function() {
      var obj = {a: 5, b: 7, c: -8};
      var result = 0;

      subject().each(obj, function(i) { result += i; });

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

  describe('#eachPair', function() {
    it('should iterate over (key, value) pair', function() {
      var obj = {a: 5, b: 7, c: -8};
      var result = '';

      subject().eachPair(obj, function(k, v) { result += (k + v); });

      expect(result).to(eq('a5b7c-8'));
    });
  });

  describe('#select', function() {
    it('should return filtered array', function() {
      var obj = {a: 5, b: 7, c: -8};
      var result = subject().select(obj, function(i) { return i > 0; });

      expect(ArtJs.ObjectUtils.keys(result)).to(eq(['a', 'b']));
    });
  });

  describe('#selectWithKey', function() {
    it('should return filtered array', function() {
      var obj = {a: 'a', b: 7, c: 'c'};
      var result = subject().selectWithKey(obj, function(k, v) { return k == v; });

      expect(ArtJs.ObjectUtils.keys(result)).to(eq(['a', 'c']));
    });
  });

  describe('#reject', function() {
    it('should return filtered array', function() {
      var obj = {a: 5, b: 7, c: -8};
      var result = subject().reject(obj, function(i) { return i > 0; });

      expect(ArtJs.ObjectUtils.keys(result)).to(eq(['c']));
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
      var array = [new ArtJs.Point('a', 5)];
      var result = subject().fromPoints(array);

      expect(ArtJs.ObjectUtils.keys(result)).to(eq(['a']));
      expect(ArtJs.ObjectUtils.values(result)).to(eq([5]));
    });
  });

  describe('#fromArray', function() {
    it('should return new object', function() {
      var array = [['a', 5]];
      var result = subject().fromArray(array);

      expect(ArtJs.ObjectUtils.keys(result)).to(eq(['a']));
      expect(ArtJs.ObjectUtils.values(result)).to(eq([5]));
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
