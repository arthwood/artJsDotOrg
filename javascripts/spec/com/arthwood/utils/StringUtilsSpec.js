spec(ArtJs.StringUtils, function() {
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
        expect(ArtJs.StringUtils).to(receive('isEmpty')).withArgs(value).andReturn(isEmpty);
        expect(subject().isBlank(value)).to(beTrue());
      });
    });

    context('when argument is not empty', function() {
      var value = 'str';
      var isEmpty = false;

      it('should return true', function() {
        expect(ArtJs.StringUtils).to(receive('isEmpty')).withArgs(value).andReturn(isEmpty);
        expect(subject().isBlank(value)).to(beFalse());
      });
    });
  });

  describe('#nullifyEmpty', function() {
    context('when argument is empty', function() {
      var value = 'str';
      var isEmpty = true;

      it('should return null', function() {
        expect(ArtJs.StringUtils).to(receive('isEmpty')).withArgs(value).andReturn(isEmpty);
        expect(subject().nullifyEmpty(value)).to(beNull());
      });
    });

    context('when argument is not empty', function() {
      var value = 'str';
      var isEmpty = false;

      it('should return true', function() {
        expect(ArtJs.StringUtils).to(receive('isEmpty')).withArgs(value).andReturn(isEmpty);
        expect(subject().nullifyEmpty(value)).to(eq(value));
      });
    });
  });

  describe('#toS', function() {
    context('when argument is falsy', function() {
      ArtJs.ArrayUtils.each([null, undefined, '', false], function(i) {
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
        expect(subject().truncate(text, n, false, ' |')).to(eq('this text ne |'));
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
  
  describe('#singularOrPlural', function() {
    context('when singular', function() {
      it('should return unchanged word', function() {
        expect(subject().singularOrPlural('horse', 1)).to(eq('horse'));
      });
    });

    context('when plural', function() {
      it('should return plural version of word', function() {
        expect(subject().singularOrPlural('horse', 4)).to(eq('horses'));
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
      var value = "{a: 5, b: {c: 'hello'}}";
      var result = subject().toJson(value);
      
      expect(result.a).to(eq(5));
      expect(result.b.c).to(eq('hello'));
    });
  });
});
