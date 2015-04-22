art.component.Sidebar = artjs.Class(
  function(element) {
    this.super(element);
    
    this.setData(art.DB.tree);

    this.onLeaf.add(artjs.$D(this, '_onLeafHandler'));
    
    artjs.Component.onLoad('content', artjs.$D(this, '_onContentLoad'));
  },
  {
    _onContentLoad: function() {
      this.clickAt(0);
    },
    
    _onLeafHandler: function(tree) {
      var data = art.DB.content[artjs.Element.getAttributes(tree.getCurrent()).href];
      
      artjs.Broadcaster.fire(art.events.ON_SIDEBAR, data);
    }
  }, 
  {_name: 'art.component.Sidebar'}, 
  artjs.Tree
);
