var art = {
  view: {}
};

artjs.TemplateLibrary.config.PATH = 'templates';
artjs.TemplateLibrary.config.TEMPLATES = ['ga'];

artjs.onWindowLoad.add(artjs.$F(function() {
  var element = artjs.Selector.getElement('.specs');
  
  artjs.BrowserSpecView.run(element);
}));
