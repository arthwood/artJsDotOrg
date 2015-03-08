art.component.Version = artjs.Class(
  function(element) {
    this.super(element);
    
    artjs.Element.setContent(this._element, '(' + artjs.VERSION + ')');
  },
  null,
  {_name: 'art.component.Version'},
  artjs.Component
);
