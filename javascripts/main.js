var Main = function () {
  ArtJs.globalize();
  ArtJs.doInjection();
  
  this.onNodeDC = this.onNode.bind(this, true);
  this.onLeafDC = this.onLeaf.bind(this, true);
  this.onContentSuccessD = $D(this, this.onContentSuccess);
  this.eachUlDC = this.eachUl.bind(this);
  this.initAnchorsDC = this.initAnchors.bind(this);
  this.onAnchorDC = this.onAnchor.bind(this, true);
  
  var point = $$('.sidebar li').partition(function(item, idx) {
    return item.down('ul').empty();
  });
  
  point.x.each(this.eachLeaf.bind(this));
  point.y.each(this.eachNode.bind(this));
  
  this.content = $$('.content').first();
  
  this.load('main.html');
};

Main.prototype = {
  eachNode: function(i) {
    i.firstElement().onclick = this.onNodeDC;
    i.style.listStyleImage = 'url(images/plus.png)';
  },
  
  onNode: function(a) {
    var ul = a.next();
    
    ul.toggle();
    a.parent().style.listStyleImage = ul.isHidden() ? 'url(images/plus.png)' : 'url(images/minus.png)'
    
    return false;
  },
  
  eachLeaf: function(i) {
    i.firstElement().onclick = this.onLeafDC;
    i.style.listStyleImage = 'url(images/leaf.png)';
  },
  
  onLeaf: function(a) {
    this.load(a.href);
    
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
    var div = a.parent().next().next();
    
    div && div.toggle();
    
    return false;
  }
};

window.onload = function() {
  this.main = new Main();
};
