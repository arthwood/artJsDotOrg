art.component.Sidebar = artjs.Class(
  function() {
    this.super(arguments);
    
    this.tree = new artjs.Tree(art.DB.tree, this.element);
    this.tree.onLeaf.add(artjs.$D(this, '_onLeaf'));
  },
  {
    _onLeaf: function(tree) {
      var data = art.DB.content[artjs.ElementUtils.getAttributes(tree.getCurrent()).href];
      
      artjs.Broadcaster.fire(art.events.ON_SIDEBAR, data);
    }
  }, 
  {_name: 'art.component.Sidebar'}, 
  artjs.Component
);
