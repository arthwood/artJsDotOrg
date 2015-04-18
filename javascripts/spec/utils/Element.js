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
