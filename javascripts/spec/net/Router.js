spec(artjs.Router, function() {
  describe('#navigateTo', function() {
    it('should run action on controller', function() {
      var controller = mock('action');
      
      expect(controller).to(receive('action'));
      
      subject().mapping.projects = controller;
      subject().navigateTo('#/projects/action');
    });
    
    context('with bang', function() {
      it('should run action on controller', function() {
        var controller = mock('action');
        
        expect(controller).to(receive('action'));
        
        subject().mapping.projects = controller;
        subject().navigateTo('#!/projects/action');
      });
    });
  });
});
