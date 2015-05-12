art.component.Sidebar = artjs.Class(
  function(element) {
    this.super(element, true);
    
    this.setData(art.DB.tree);

    artjs.Component.onLoad('content', artjs.$D(this, '_onContentLoad'));
  },
  {
    _onContentLoad: function() {
      var paths = artjs.TreeCrawler.find(this, artjs.Router.getCurrentPath())
      
      this.clickAt(artjs.Array.first(paths));
    }
  }, 
  {
    _name: 'art.component.Sidebar'
  }, 
  artjs.Tree
);
