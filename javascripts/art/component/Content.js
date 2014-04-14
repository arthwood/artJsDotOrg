art.component.Content = ArtJs.Class(
  null,
  {
    onDependency: function(sidebar) {
      sidebar.tree.onLeaf.add($D(this, this.onLeaf));
      sidebar.tree.open();
    },
    
    onLeaf: function(element) {
      ArtJs.TemplateHelpers.renderInto(this.element, 'doc', art.DB.content[element.getAttributes().href]);
    }
  },
  {_name: 'art.component.Content'},
  ArtJs.Component
);

art.component.Content.dependsOn(art.component.Sidebar);
