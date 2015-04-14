spec(artjs.TemplateCompiler, function() {
  var instance;
  
  before(function() {
    var klass = subject();
    
    instance = new klass('{{renderChecked(checked)}}', {checked: true});
  });
  
  describe('#compile', function() {
    it('should return expected result', function() {
      expect(instance.compile()).to(eq('checked'));
    });
  });
});
