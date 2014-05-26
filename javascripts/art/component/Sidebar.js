art.component.Sidebar = artjs.Class(
  function() {
    this.super(arguments);
    
    this.tree = new artjs.Tree(art.DB.tree, this.element);
  },
  null, 
  {_name: 'art.component.Sidebar'}, 
  artjs.Component
);
