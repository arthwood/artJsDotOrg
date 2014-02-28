var Main = ArtJs.Class(function() {
  this.onNodeDelegate = $D(this, this.onNode);
  this.onLeafDelegate = $D(this, this.onLeaf);
  this.onContentSuccessD = $D(this, this.onContentSuccess);
  this.onAnchorDelegate = $D(this, this.onAnchor);
  this.currentLeaf = null;
  var point = $(".sidebar li").partition(function(item, idx) {
    return item.find("ul").isEmpty();
  });
  point.x.each(this.eachLeaf.bind(this));
  point.y.each(this.eachNode.bind(this));
  this.content = $(".content").first();
  this.expandNode(point.y.first().firstElement());
  this.loadSection(point.x.first().firstElement());
  this.ei = new ArtJs.ElementInspector;
}, {
  eachNode: function(i) {
    i.firstElement().onClick(this.onNodeDelegate);
    i.style.listStyleImage = this.ctor.FOLDED;
  },
  onNode: function(originalEvent, elementEvent) {
    originalEvent.preventDefault();
    this.expandNode(elementEvent.element);
  },
  expandNode: function(a) {
    var ul = a.next();
    ul.toggle();
    a.parent().style.listStyleImage = ul.isHidden() ? this.ctor.FOLDED : this.ctor.UNFOLDED;
  },
  eachLeaf: function(i) {
    i.firstElement().onClick(this.onLeafDelegate);
    i.style.listStyleImage = this.ctor.LEAF;
  },
  onLeaf: function(originalEvent, elementEvent) {
    originalEvent.preventDefault();
    this.loadSection(elementEvent.element);
  },
  loadSection: function(a) {
    this.load("com/arthwood/" + a.getAttributes().href);
    this.currentLeaf && this.currentLeaf.removeClass("selected");
    this.currentLeaf = a;
    this.currentLeaf.addClass("selected");
  },
  load: function(url) {
    $get(url, null, this.onContentSuccessD);
  },
  onContentSuccess: function(ajax) {
    var content = ajax.getResponseText();
    this.content.setContent(content);
    var last = this.content.lastElement();
    last && (last.style.marginBottom = "0");
    this.initializeLinks();
  },
  initializeLinks: function() {
    var uls = this.content.find("ul.members");
    if (!uls.isEmpty()) {
      uls.each(this.eachMember, this);
    }
  },
  eachMember: function(ul) {
    var lis = ul.find("li");
    var last = lis.last();
    last.style.borderBottom = "none";
    lis.each(this.initAnchors, this);
  },
  initAnchors: function(li) {
    var a = li.first("h4 a");
    a.onClick(this.onAnchorDelegate);
    var more = li.first(".more");
    if (more) {
      more.blindTo(0, 0);
    }
  },
  onAnchor: function(e) {
    e.preventDefault();
    var a = e.currentTarget;
    var div = a.parent().parent().first(".more");
    if (div) {
      div.blindToggle(div.firstElement().getSize().y);
    }
  }
}, {
  FOLDED: "url(../images/plus.png)",
  UNFOLDED: "url(../images/minus.png)",
  LEAF: "url(../images/leaf.png)"
});

ArtJs.globalize();

ArtJs.doInjection();

ArtJs.onDocumentLoad.add($D(null, function() {
  this.main = new Main;
}));