spec(ArtJs.ClassToggler, function() {
  it('should start with null as a current', function() {
    var className = 'class';
    var toggler = new ArtJs.ClassToggler(className);

    expect(toggler.getCurrent()).to(beNull());
  });

  describe('#toggle', function() {
    it('should change current', function() {
      var className = 'class';
      var toggler = new ArtJs.ClassToggler(className);
      var element = ArtJs.$E('p');
      
      toggler.toggle(element);
      
      expect(ArtJs.ElementUtils.hasClass(element, className)).to(beTrue());
    });
  });
});
