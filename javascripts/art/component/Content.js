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
    }
  },
  {_name: 'art.component.Content'},
  ArtJs.Component
);

art.component.Content.dependsOn(art.component.Sidebar);
