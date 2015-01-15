art.component.Content = artjs.Class(
  function(element) {
    this.super(element);
    
    artjs.Broadcaster.addListener(art.events.ON_SIDEBAR, artjs.$D(this, '_onLeaf'));
  },
  {
    _onLeaf: function(data) {
      artjs.TemplateHelpers.renderInto(this.element, 'doc', data);
      
      artjs.Fade.run(this.element, 1, 0.2, null, null, 0);
    }
  },
  {_name: 'art.component.Content'},
  artjs.Component
);
