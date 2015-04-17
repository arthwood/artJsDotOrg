spec(artjs.Router, function() {
  describe('#navigateTo', function() {
    it('should run action on controller', function() {
      var controller = mock('action');
      
      expect(controller).to(receive('action')).withArgs(7);
      
      subject().mapping.projects = controller;
      subject().navigateTo('#/projects/action/7');
    });
  });
});
