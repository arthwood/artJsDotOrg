artjs.TemplateLibrary.config.PATH = 'templates';
artjs.TemplateLibrary.config.TEMPLATES = ['ga'];

var runner = new artjs.SpecRunner();

window.onload = function() {
  this.runner.run();
};
