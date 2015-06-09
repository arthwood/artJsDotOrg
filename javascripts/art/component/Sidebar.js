art.component.Sidebar = artjs.Class(
  function(element) {
    this.super(element, true);
    
    this._leafClassToggler = new artjs.ClassToggler('selected');
    
    artjs.Router.onNavigate.add(artjs.$D(this, '_onNavigate'));
    
    var ajax = artjs.$get('data/tree');
    
    ajax.onSuccess.add(artjs.$D(this, '_onSuccess'));
  },
  {
    _onNavigate: function(route) {
      this._section = artjs.Object.getDefault(route.getRequest().controllerId, 'introduction');
      
      if (this._data) {
        this._select();
      }
      
      artjs.Broadcaster.fire(art.events.ON_SIDEBAR, this._section);
    },
    
    _onSuccess: function(ajax) {
      this.setData(YAML.parse(ajax.getResponseText()));
      
      if (this._section) {
        this._select();
      }
    },
    
    _select: function() {
      var paths = artjs.TreeCrawler.find(this.getData(), this._section);
      var path = artjs.Array.first(paths);
      
      this.openAt(path, true);
      
      this._leafClassToggler.toggle(artjs.Element.parent(this._current));
    }
  }, 
  {
    _name: 'art.component.Sidebar'
  }, 
  artjs.Tree
);
