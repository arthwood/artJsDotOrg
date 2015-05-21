art.component.Sidebar = artjs.Class(
  function(element) {
    this.super(element, true);
    
    this._leafClassToggler = new artjs.ClassToggler('selected');
    
    artjs.Router.onNavigate.add(artjs.$D(this, '_onNavigate'));
    
    this.setData(art.DB.tree);
  },
  {
    _onNavigate: function(route) {
      var id = artjs.Object.getDefault(route.getRequest().controllerId, 'introduction');
      
      this._select(id);
      
      var data = art.DB.content[id];
      
      artjs.Broadcaster.fire(art.events.ON_SIDEBAR, data);
    },
    
    _select: function(id) {
      var paths = artjs.TreeCrawler.find(this, id);
      var path = artjs.Array.first(paths);
      
      this.clickAt(path, true);
      
      this._leafClassToggler.toggle(artjs.Element.parent(this._current));
    }
  }, 
  {
    _name: 'art.component.Sidebar'
  }, 
  artjs.Tree
);
