var Main = function () {
  ArtJs.globalize();
  ArtJs.doInjection();
  
  this.onNodeDC = this.onNode.bind(this, true);
  this.onLeafDC = this.onLeaf.bind(this, true);
  this.onContentSuccessD = $D(this, this.onContentSuccess);
  this.onAnchorDC = this.onAnchor.bind(this);
  this.currentLeaf = null;
  
  // leaves and nodes
  var point = $('.sidebar li').partition(function(item, idx) {
    return item.find('ul').isEmpty();
  });
  
  point.x.each(this.eachLeaf.bind(this));
  point.y.each(this.eachNode.bind(this));
  
  this.content = $('.content').first();
  
  this.expandNode(point.y.first().firstElement());
  this.loadSection(point.x.first().firstElement());

  //this.ei = new ElementInspector();
};

Main.FOLDED = 'url(../images/plus.png)';
Main.UNFOLDED = 'url(../images/minus.png)';
Main.LEAF = 'url(../images/leaf.png)';

Main.prototype = {
  eachNode: function(i) {
    i.firstElement().onclick = this.onNodeDC;
    i.style.listStyleImage = Main.FOLDED;
  },
  
  onNode: function(a, e) {
    e.preventDefault();
    
    this.expandNode(a);
  },
  
  expandNode: function(a) {
    var ul = a.next();

    ul.toggle();
    a.parent().style.listStyleImage = ul.isHidden() ? Main.FOLDED : Main.UNFOLDED;
  },
  
  eachLeaf: function(i) {
    i.firstElement().onclick = this.onLeafDC;
    i.style.listStyleImage = Main.LEAF;
  },
  
  onLeaf: function(a, e) {
    e.preventDefault();
    
    this.loadSection(a);
  },
  
  loadSection: function(a) {
    this.load('com/arthwood/' + a.getAttributes().href);

    this.currentLeaf && this.currentLeaf.removeClass('selected');
    this.currentLeaf = a;
    this.currentLeaf.addClass('selected');
  },
  
  load: function(url) {
    $get(url, null, this.onContentSuccessD);
  },
  
  onContentSuccess: function(ajax) {
    var content = ajax.getResponseText();
    
    this.content.setContent(content);
    
    var last = this.content.lastElement();
    
    last && (last.style.marginBottom = '0');
    
    this.initializeLinks();
  },
  
  initializeLinks: function() {
    var uls = this.content.find('ul.members');
    
    if (!uls.isEmpty()) {
      uls.each(this.eachMember, this);
    }
  },

  eachMember: function(ul) {
    var lis = ul.find('li');
    var last = lis.last();
    
    last.style.borderBottom = 'none';
    
    lis.each(this.initAnchors, this);
  },
  
  initAnchors: function(li) {
    var a = li.first('h4 a');
    
    a.onclick = this.onAnchorDC;

    var more = li.first('.more');
    
    if (more) {
      more.blindTo(0, 0);
    }
  },
  
  onAnchor: function(e) {
    e.preventDefault();
    
    var a = e.currentTarget;
    var div = a.parent().parent().first('.more');
    
    if (div) {
      div.blindToggle(div.firstElement().getSize().y);
    }
  }
};

window.onload = function() {
  this.main = new Main();
};
