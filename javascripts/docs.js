var art = {
  Main: ArtJs.Class(
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
  )
};

ArtJs.TemplateLibrary.PATH = '/artJsDotOrg/templates';
ArtJs.TemplateLibrary.TEMPLATES = ['doc', 'member', 'section'];
  
ArtJs.globalize();
ArtJs.doInjection();

ArtJs.onLibraryLoad.add(ArtJs.$D(null, function() {
  this.main = new art.Main();
}));
