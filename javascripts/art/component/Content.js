art.component.Content = artjs.Class(
  null,
  {
    onDependency: function(sidebar) {
      sidebar.tree.onLeaf.add(artjs.$D(this, this.onLeaf));
      sidebar.tree.open();
    },
    
    onLeaf: function(element) {
      var scope = art.DB.content[artjs.ElementUtils.getAttributes(element).href];
      
      artjs.TemplateHelpers.renderInto(this.element, 'doc', scope);
      
      artjs.Fade.run(this.element, 1, 0.2, null, null, 0);
    }
  },
  {_name: 'art.component.Content'},
  artjs.Component
);

art.component.Content.dependsOn(art.component.Sidebar);
