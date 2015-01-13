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
          this.super(arguments, name);
        }, 
        {
          instanceMethod: function(value) {
            return this.super(arguments, value) * 2;
          }
        }, 
        {
          staticMethod: function(value) {
            return this.super(arguments, value) * 3;
          },
          classname: 'Parent'
        }, 
        Grand
      );
      
      Child = subject()(
        function(name) {
          this.super(arguments, name);
        }, 
        {
          instanceMethod: function(value) {
            return this.super(arguments, value) - 1;
          }
        }, 
        {
          staticMethod: function(value) {
            return this.super(arguments, value) - 2;
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
