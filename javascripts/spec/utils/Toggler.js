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
