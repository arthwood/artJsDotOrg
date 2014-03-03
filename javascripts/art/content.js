art.Content = ArtJs.Class(
  function() {
    this._element = $('.art-content').first();
    this._onContentSuccessD = $D(this, this._onContentSuccess);
    this._onAnchorDelegate = $D(this, this._onAnchor);
  },
  {
    loadSection: function(a) {
      this._load('com/arthwood/' + a.getAttributes().href);
    },
    
    _load: function(url) {
      $get(url, null, this._onContentSuccessD);
    },
    
    _onContentSuccess: function(ajax) {
      var content = ajax.getResponseText();
      
      this._element.setContent(content);
      
      var last = this._element.lastElement();
      
      last && (last.style.marginBottom = '0');
      
      this._initializeLinks();
    },
    
    _initializeLinks: function() {
      var uls = this._element.find('ul.members');
      
      if (!uls.isEmpty()) {
        uls.each(this._eachMember, this);
      }
    },
    
    _eachMember: function(ul) {
      var lis = ul.find('li');
      var last = lis.last();
      
      last.style.borderBottom = 'none';
      
      lis.each(this._initAnchors, this);
    },
    
    _initAnchors: function(li) {
      var a = li.first('h4 a');
      
      a.onClick(this._onAnchorDelegate);
      
      var more = li.first('.more');
      
      if (more) {
        more.blindTo(0, 0);
      }
    },
    
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
