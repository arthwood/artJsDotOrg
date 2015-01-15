art.component.Member = artjs.Class(
  function(element) {
    this.super(element);
    
    var s = artjs.Selector;
    var a = s.first(s.first(element, 'h4'), 'a');
    var eu = artjs.ElementUtils;
    
    eu.onClick(a, artjs.$D(this, this._onAnchor));
    
    this.more = s.first(element, '.more');
    
    if (this.more) {
      eu.addClass(a, 'active');
      
      this.height = eu.getSize(this.more).y;
      
      artjs.Blind.run(this.more, 0, 0);
    }
  },
  {
    _onAnchor: function(e) {
      e.preventDefault();
      
      if (this.more) {
        artjs.Blind.toggle(this.more, this.height, 0.2, artjs.TransitionBase.EASE_IN_OUT);
      }
    }
  },
  {_name: 'art.component.Member'},
  artjs.Component
);
