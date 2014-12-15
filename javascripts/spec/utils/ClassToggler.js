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
      
      expect(artjs.ElementUtils.hasClass(element, className)).to(beTrue());
    });
  });
});
