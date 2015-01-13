artjs.TemplateLibrary.config.PATH = 'templates';
artjs.TemplateLibrary.config.TEMPLATES = ['ga'];

window.onload = function() {
  var view = new artjs.BrowserSpecView();
  
  artjs.Spec.init(view);
  artjs.Spec.run();
};
