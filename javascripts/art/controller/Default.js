art.controller.Default = artjs.Class(
  null, 
  {
    index: function(id) {
      var data = art.DB.content[id];
      
      artjs.Broadcaster.fire(art.events.ON_SIDEBAR, data);
    }
  }
);

artjs.Router.defaultController = new art.controller.Default();
