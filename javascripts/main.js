var Main = function () {
  ArtJs.globalize();
  ArtJs.doInjection();
  
  this.onNodeDC = this.onNode.bind(this);
  this.onLeafDC = this.onLeaf.bind(this);
  this.onContentSuccessD = $D(this, this.onContentSuccess);
  
  $$('.node').each(this.eachNode.bind(this));
  $$('.leaf').each(this.eachLeaf.bind(this));
  
  this.content = $$('.content').first();
};

Main.prototype = {
  eachNode: function(i) {
    i.onclick = this.onNodeDC;
  },
  
  onNode: function(e) {
    var a = e.currentTarget;
    
    a.next().toggle();
    
    return false;
  },
  
  eachLeaf: function(i) {
    i.onclick = this.onLeafDC;
  },
  
  onLeaf: function(e) {
    var a = e.currentTarget;
    
    $get(a.href, null, this.onContentSuccessD);
    
    return false;
  },
  
  onContentSuccess: function(ajax) {
    var content = ajax.getResponseText();
    
    this.content.setContent(content);
  }
};

window.onload = function() {
  this.main = new Main();
};
