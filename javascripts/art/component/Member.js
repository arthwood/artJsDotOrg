art.component.Member = ArtJs.Class(
  function(element) {
    this.super(arguments);
    
    var a = element.first('h4').first('a');
    
    a.onClick($D(this, this._onAnchor));
    
    this.more = element.first('.more');
    
    if (this.more) {
      a.addClass('active');
      
      this.height = this.more.getSize().y;
      
      this.more.blindTo(0, 0);
    }
  },
  {
    _onAnchor: function(e) {
      e.preventDefault();
      
      if (this.more) {
        this.more.blindToggle(this.height, 0.2);
      }
    }
  },
  {_name: 'art.component.Member'},
  ArtJs.Component
);
