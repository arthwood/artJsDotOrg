var art = {
  view: {}
};

artjs.TemplateLibrary.config.PATH = "templates";

artjs.TemplateLibrary.config.TEMPLATES = [ "ga" ];

art.view.GA = artjs.Class(function(element) {
  this.super(element);
  var model = new artjs.Model;
  this.setModel(model);
}, null, {
  _name: "art.view.GA"
}, artjs.TemplateView);