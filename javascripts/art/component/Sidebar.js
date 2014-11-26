art.component.Sidebar = artjs.Class(
  function() {
    this.super(arguments);
    
    this.setData(art.DB.tree);

    this.onLeaf.add(this._onLeafHandler.delegate);
    
    artjs.Component.onLoad('content', artjs.$D(this, '_onContentLoad'));
  },
  {
    _onContentLoad: function() {
      this.open();
    },
    
    _onLeafHandler: function(tree) {
      var data = art.DB.content[artjs.ElementUtils.getAttributes(tree.getCurrent()).href];
      
      artjs.Broadcaster.fire(art.events.ON_SIDEBAR, data);
    }
  }, 
  {_name: 'art.component.Sidebar'}, 
  artjs.Tree
);
