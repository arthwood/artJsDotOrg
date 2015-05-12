art.component.Member = artjs.Class(
  function(element) {
    this.super(element);
    
    var a = artjs.Selector.find(artjs.Selector.find(element, 'h4'), 'a');
    
    artjs.Element.onClick(a, artjs.$D(this, '_onAnchor'));
    
    this.more = artjs.Selector.find(element, '.more');
    
    if (this.more) {
      artjs.Element.addClass(a, 'active');
      
      this.height = artjs.Element.getSize(this.more).y;
      
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
