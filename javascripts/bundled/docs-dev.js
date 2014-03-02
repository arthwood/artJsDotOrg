var Sidebar = ArtJs.Class(function() {
  this.onLeaf = new ArtJs.CustomEvent("onLeaf");
  this._onNodeDelegate = $D(this, this._onNode);
  this._onLeafDelegate = $D(this, this._onLeaf);
  this._leafClassToggler = new ArtJs.ClassToggler("selected");
  var point = $(".sidebar li").partition(function(item, idx) {
    return item.find("ul").isNotEmpty();
  });
  this.nodes = point.x;
  this.leaves = point.y;
  this.nodes.each($DC(this, this._eachNode));
  this.leaves.each($DC(this, this._eachLeaf));
}, {
  init: function() {
    this._expandNode(this.nodes.first().firstElement());
    this._leafAction(this.leaves.first().firstElement());
  },
  _eachNode: function(i) {
    i.firstElement().onClick(this._onNodeDelegate);
    i.find("ul").first().hide();
    i.style.listStyleImage = this.ctor.FOLDED;
  },
  _onNode: function(originalEvent, elementEvent) {
    originalEvent.preventDefault();
    this._expandNode(elementEvent.element);
  },
  _expandNode: function(a) {
    var ul = a.next();
    ul.toggle();
    a.parent().style.listStyleImage = ul.isHidden() ? this.ctor.FOLDED : this.ctor.UNFOLDED;
  },
  _eachLeaf: function(i) {
    i.firstElement().onClick(this._onLeafDelegate);
    i.style.listStyleImage = this.ctor.LEAF;
  },
  _onLeaf: function(originalEvent, elementEvent) {
    originalEvent.preventDefault();
    this._leafAction(elementEvent.element);
  },
  _leafAction: function(element) {
    this._leafClassToggler.toggle(element);
    this.onLeaf.fire(element);
  }
}, {
  FOLDED: "url(../images/plus.png)",
  UNFOLDED: "url(../images/minus.png)",
  LEAF: "url(../images/leaf.png)"
});

var Content = ArtJs.Class(function() {
  this._element = $(".art-content").first();
  this._onContentSuccessD = $D(this, this._onContentSuccess);
  this._onAnchorDelegate = $D(this, this._onAnchor);
}, {
  loadSection: function(a) {
    this._load("com/arthwood/" + a.getAttributes().href);
  },
  _load: function(url) {
    $get(url, null, this._onContentSuccessD);
  },
  _onContentSuccess: function(ajax) {
    var content = ajax.getResponseText();
    this._element.setContent(content);
    var last = this._element.lastElement();
    last && (last.style.marginBottom = "0");
    this._initializeLinks();
  },
  _initializeLinks: function() {
    var uls = this._element.find("ul.members");
    if (!uls.isEmpty()) {
      uls.each(this._eachMember, this);
    }
  },
  _eachMember: function(ul) {
    var lis = ul.find("li");
    var last = lis.last();
    last.style.borderBottom = "none";
    lis.each(this._initAnchors, this);
  },
  _initAnchors: function(li) {
    var a = li.first("h4 a");
    a.onClick(this._onAnchorDelegate);
    var more = li.first(".more");
    if (more) {
      more.blindTo(0, 0);
    }
  },
  _onAnchor: function(e) {
    e.preventDefault();
    var a = e.currentTarget;
    var more = a.parent().parent().first(".more");
    if (more) {
      more.blindToggle(300);
    }
  }
});

var Main = ArtJs.Class(function() {
  this.sidebar = new Sidebar;
  this.content = new Content;
  this.sidebar.onLeaf.add($D(this, this.onLeaf));
  this.sidebar.init();
}, {
  onLeaf: function(element) {
    this.content.loadSection(element);
  }
});

ArtJs.globalize();

ArtJs.doInjection();

ArtJs.onDocumentLoad.add($D(null, function() {
  this.main = new Main;
}));