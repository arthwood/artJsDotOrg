var Main = function () {
  ArtJs.globalize();
  ArtJs.doInjection();
  
  this.onNodeDC = this.onNode.bind(this, true);
  this.onLeafDC = this.onLeaf.bind(this, true);
  this.onContentSuccessD = $D(this, this.onContentSuccess);
  
  $$('.node').each(this.eachNode.bind(this));
  $$('.leaf').each(this.eachLeaf.bind(this));
  
  this.content = $$('.content').first();
  
  this.load('main.html');
};

Main.prototype = {
  eachNode: function(i) {
    i.onclick = this.onNodeDC;
  },
  
  onNode: function(a) {
    a.next().toggle();
    
    return false;
  },
  
  eachLeaf: function(i) {
    i.onclick = this.onLeafDC;
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
    
    var last = this.content.down('li').last();
    
    last && (last.style.borderBottom = 'none');
  }
};

window.onload = function() {
  this.main = new Main();
};
