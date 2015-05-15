art.controller.Default = artjs.Class(
  null, 
  {
    index: function(id, first) {
      id = artjs.Object.getDefault(id, 'introduction');
      
      if (first) {
        var sidebar = artjs.Component.find('sidebar');
        var paths = artjs.TreeCrawler.find(sidebar, id);
        var path = artjs.Array.first(paths);
        
        sidebar.clickAt(path, true);
      }
      
      var data = art.DB.content[id];
      
      artjs.Broadcaster.fire(art.events.ON_SIDEBAR, data);
    }
  }
);

artjs.Router.defaultController = new art.controller.Default();
