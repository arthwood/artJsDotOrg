art.Member = ArtJs.Class(
  function(element) {
    var a = element.first('h4').first('a');
    
    a.onClick($D(this, this._onAnchor));
    
    var more = element.first('.more');
    
    if (more) {
      more.blindTo(0, 0);
    }
  },
  {
    _onAnchor: function(e) {
      e.preventDefault();
      
      var a = e.currentTarget;
      var more = a.parent().parent().first('.more');
      
      if (more) {
        more.blindToggle(300);
      }
    }
  }
);
