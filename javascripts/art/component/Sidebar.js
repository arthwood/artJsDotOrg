art.component.Sidebar = artjs.Class(
  function(element) {
    this.super(element, true);
    
    this.setData(art.DB.tree);
  },
  null, 
  {
    _name: 'art.component.Sidebar'
  }, 
  artjs.Tree
);
