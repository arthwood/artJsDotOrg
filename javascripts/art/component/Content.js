art.component.Content = artjs.Class(
  function(element) {
    this.super(element);
    
    artjs.Broadcaster.addListener(art.events.ON_SIDEBAR, artjs.$D(this, '_onLeaf'));
  },
  {
    _onLeaf: function(data) {
      var template = data.template;
      
      artjs.TemplateHelpers.renderInto(this._element, template && ('content/' + template) || 'doc', data);
      
      artjs.Fade.run(this._element, 1, 0.2, null, null, 0);
    }
  },
  {_name: 'art.component.Content'},
  artjs.Component
);
