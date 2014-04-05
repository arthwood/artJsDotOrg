art.Content = ArtJs.Class(
  null,
  {
    onDependency: function(sidebar) {
      sidebar.tree.onLeaf.add($D(this, this.onLeaf));
    },
    
    onLeaf: function(element) {
      ArtJs.TemplateHelpers.renderInto(this.element, 'doc', art.DB.content[element.getAttributes().href]);
    }
  },
  {_name: 'art.Content'},
  ArtJs.Component
);

art.Content.dependsOn(art.Sidebar);
