art.view.Version = artjs.Class(
  function(element) {
    this.super(element);
    
    this._model.addProperty('version');
    
    this._model.version = artjs.VERSION;
  },
  null,
  {_name: 'art.view.Version'},
  artjs.View
);
