artjs.TemplateLibrary.config.PATH = 'templates';
artjs.TemplateLibrary.config.TEMPLATES = ['ga'];

artjs.onWindowLoad.add(artjs.$F(function() {
  artjs.BrowserSpecView.run();
}));
