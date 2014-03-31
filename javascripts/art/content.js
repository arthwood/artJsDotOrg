art.Content = ArtJs.Class(
  null,
  {
    onDependency: function(sidebar) {
      sidebar.onLeaf.add($D(this, this.onLeaf));
    },
    
    onLeaf: function(element) {
        ArtJs.TemplateHelpers.renderInto(this.element, 'doc', art.DB.content[element.getAttributes().href]);
    }
  },
  {},
  ArtJs.Component
);

art.Content.dependsOn(art.Sidebar);
