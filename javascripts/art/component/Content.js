art.component.Content = artjs.Class(
  function(element) {
    this.super(element);
    
    artjs.Broadcaster.addListener(art.events.ON_SIDEBAR, artjs.$D(this, '_onSidebar'));
    
    var ajax = artjs.$get('docs.yml');
    
    ajax.onSuccess.add(artjs.$D(this, '_onSuccess'));
  },
  {
    _onSidebar: function(section) {
      this._section = section;
      
      if (this._content) {
        this._update();
      }
    },
    
    _onSuccess: function(ajax) {
      this._content = YAML.parse(ajax.getResponseText());
      
      if (this._section) {
        this._update();
      }
    },
    
    _update: function() {
      var data = this._content[this._section];
      var template = data.template;
      
      artjs.TemplateHelpers.renderInto(this._element, template && ('content/' + template) || 'doc', data);
      
      artjs.Fade.run(this._element, 1, 0.2, null, null, 0);
    }
  },
  {_name: 'art.component.Content'},
  artjs.Component
);
