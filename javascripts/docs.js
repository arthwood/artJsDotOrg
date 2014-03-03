var art = {
};

art.Main = ArtJs.Class(
  function() {
    this.sidebar = new art.Sidebar();
    this.content = new art.Content();

    this.sidebar.onLeaf.add($D(this, this.onLeaf));
    this.sidebar.init();
    //this.ei = new ArtJs.ElementInspector();
  },
  {
    onLeaf: function(element) {
      this.content.loadSection(element);
    }
  }
);

ArtJs.globalize();
ArtJs.doInjection();

ArtJs.onDocumentLoad.add($D(null, function() {
  this.main = new art.Main();
}));
