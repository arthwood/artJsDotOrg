art.component.Content = ArtJs.Class(
  null,
  {
    onDependency: function(sidebar) {
      sidebar.tree.onLeaf.add(ArtJs.$D(this, this.onLeaf));
      sidebar.tree.open();
    },
    
    onLeaf: function(element) {
      var scope = art.DB.content[ArtJs.ElementUtils.getAttributes(element).href];
      
      ArtJs.TemplateHelpers.renderInto(this.element, 'doc', scope);
      
      ArtJs.Fade.run(this.element, 1, 0.2, null, null, 0);
    }
  },
  {_name: 'art.component.Content'},
  ArtJs.Component
);

art.component.Content.dependsOn(art.component.Sidebar);
