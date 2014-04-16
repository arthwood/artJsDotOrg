art.component.Member = ArtJs.Class(
  function(element) {
    this.super(arguments);
    var s = ArtJs.Selector;
    var a = s.first(s.first(element, 'h4'), 'a');
    var eu = ArtJs.ElementUtils;
    
    eu.onClick(a, ArtJs.$D(this, this._onAnchor));
    
    this.more = s.first(element, '.more');
    
    if (this.more) {
      eu.addClass(a, 'active');
      
      this.height = eu.getSize(this.more).y;
      
      ArtJs.Blind.blindTo(this.more, 0, 0);
    }
  },
  {
    _onAnchor: function(e) {
      e.preventDefault();
      
      if (this.more) {
        ArtJs.Blind.blindToggle(this.more, this.height, 0.2);
      }
    }
  },
  {_name: 'art.component.Member'},
  ArtJs.Component
);
