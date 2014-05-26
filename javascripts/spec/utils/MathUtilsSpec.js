spec(artjs.MathUtils, function() {
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
