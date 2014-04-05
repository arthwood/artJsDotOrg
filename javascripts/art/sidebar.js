art.Sidebar = ArtJs.Class(
  function() {
    this.super(arguments);
    
    this.tree = new ArtJs.Tree(art.DB.tree, this.element);
  },
  null, 
  {_name: 'art.Sidebar'}, 
  ArtJs.Component
);
