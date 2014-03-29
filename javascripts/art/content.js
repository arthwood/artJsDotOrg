art.Content = ArtJs.Class(
  function() {
    this._element = $('.art-content').first();
    this._onContentSuccessD = $D(this, this._onContentSuccess);
    this._onAnchorDelegate = $D(this, this._onAnchor);
  },
  {
    loadSection: function(a) {
      var path = a.getAttributes().href;
      
      if (ArtJs.ArrayUtils.includes(this.ctor.templates, path)) {
        var request = ArtJs.$get('com/arthwood/' + path, null, this._onContentSuccessD);
      
        request.path = path;
      }
      else {
        this._setContent(path, "{render('doc', data)}");
      }
    },
    
    _onContentSuccess: function(ajax) {
      this._setContent(ajax.path, ajax.getResponseText());
    },
    
    _setContent: function(path, text) {
      var content = ArtJs.TemplateBase.compile(text, {data: art.DB.content[path]});
      
      this._element.setContent(content);
      
      this._initializeLinks();
    },
    
    _initializeLinks: function() {
      var uls = this._element.find('ul.members');
      
      uls.each(this._eachMember, this);
    },
    
    _eachMember: function(ul) {
      ul.elements().each(this._initAnchors, this);
    },
    
    _initAnchors: function(li) {
      var a = li.first('h4').first('a');
      
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
  },
  {
    templates: []
  }
);
