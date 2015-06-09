spec(artjs.TemplateCompiler, function() {
  var instance, klass;
  
  before(function() {
    klass = subject();
  });
  
  describe('#compile', function() {
    context('simple value', function() {
      it('should return expected result', function() {
        instance = new klass('{{value}}', {value: true});
      
        expect(instance.compile()).to(eq('true'));
      });
    });
    
    context('action', function() {
      it('should return expected result', function() {
        artjs.TemplateHelpers.register('code', function(str, value) {
          return str + ':' + value;
        });
        
        instance = new klass("{{code('<key, value>', '52')}}");
        
        expect(instance.compile()).to(eq('<key, value>:52'));
      });
    });
  });
});
