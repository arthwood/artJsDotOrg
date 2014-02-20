spec(ArtJs.Class, function() {
  var SuperClass = subject()(function(name) {
    this.name = name;
  }, {
    instanceMethod: function(value) {
      return value + 2;
    }
  }, {
    staticMethod: function(value) {
      return value + 3;
    }
  });
  
  var SubClass = ArtJs.Class(function(name) {
    this.super(arguments, name);
  }, {
    instanceMethod: function(value) {
      return this.super(arguments, value) * 2;
    }
  }, {
    staticMethod: function(value) {
      return this.super(arguments, value) * 3;
    }
  },
    SuperClass
  );
  
  var name = 'class';
  var instance = new SubClass(name);
    
  it('should return valid value', function() {
    expect(instance.name).to(eq(name));
    expect(instance.instanceMethod(2)).to(eq(8));
    expect(SubClass.staticMethod(2)).to(eq(15));
  });
});
