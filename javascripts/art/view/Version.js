art.view.Version = artjs.Class(
  function(element) {
    this.super(element);
    
    var model = new artjs.Model();
    
    model.addProperty('version', artjs.VERSION);
    
    this.setModel(model);
  },
  null,
  {_name: 'art.view.Version'},
  artjs.TemplateView
);
