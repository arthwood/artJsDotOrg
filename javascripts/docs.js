var Main = function () {
  ArtJs.globalize();
  ArtJs.doInjection();
  
  this.onNodeDC = this.onNode.bind(this, true);
  this.onLeafDC = this.onLeaf.bind(this, true);
  this.onContentSuccessD = $D(this, this.onContentSuccess);
  this.eachUlDC = this.eachUl.bind(this);
  this.initAnchorsDC = this.initAnchors.bind(this);
  this.onAnchorDC = this.onAnchor.bind(this, true);
  this.currentLeaf = null;
  
  // leaves and nodes
  var point = $$('.sidebar li').partition(function(item, idx) {
    return item.down('ul').empty();
  });
  
  point.x.each(this.eachLeaf.bind(this));
  point.y.each(this.eachNode.bind(this));
  
  this.content = $$('.content').first();
  this.onNode(point.y.first().firstElement());
  this.onLeaf(point.x.first().firstElement());
};

Main.FOLDED = 'url(../images/plus.png)';
Main.UNFOLDED = 'url(../images/minus.png)';
Main.LEAF = 'url(../images/leaf.png)';

Main.prototype = {
  eachNode: function(i) {
    i.firstElement().onclick = this.onNodeDC;
    i.style.listStyleImage = Main.FOLDED;
  },
  
  onNode: function(a) {
    var ul = a.next();
    
    ul.toggle();
    a.parent().style.listStyleImage = ul.isHidden() ? Main.FOLDED : Main.UNFOLDED;
    
    return false;
  },
  
  eachLeaf: function(i) {
    i.firstElement().onclick = this.onLeafDC;
    i.style.listStyleImage = Main.LEAF;
  },
  
  onLeaf: function(a) {
    this.load(a.href);
    
    this.currentLeaf && this.currentLeaf.removeClass('selected');
    this.currentLeaf = a;
    this.currentLeaf.addClass('selected');
    
    return false;
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
    var uls = this.content.down('ul.members');
    
    !uls.empty() && uls.each(this.eachUlDC);
  },
  
  eachUl: function(ul) {
    var lis = ul.down('li');
    var last = lis.last();
    
    last.style.borderBottom = 'none';
    
    lis.each(this.initAnchorsDC);
  },
  
  initAnchors: function(li) {
    li.down('h4 a').first().onclick = this.onAnchorDC;
  },
  
  onAnchor: function(a) {
    var div = a.parent().parent().lastElement();
    
    if (div && div.hasClass('more')) {
      var effect = ArtJs.Reveal.find(div);
      
      if (effect) {
        effect.toggle();
      }
      else {
        effect = new ArtJs.Reveal(div);
      }
      
      effect.start();
    }
    
    return false;
  }
};

window.onload = function() {
  this.main = new Main();
};
