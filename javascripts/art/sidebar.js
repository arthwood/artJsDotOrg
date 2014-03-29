art.Sidebar = ArtJs.Class(
  function() {
    this._tree = new ArtJs.Tree(art.DB.tree);
    this._onNodeDelegate = $D(this, this._onNode);
    this._onLeafDelegate = $D(this, this._onLeaf);
    this._leafClassToggler = new ArtJs.ClassToggler('selected');
    
    this.onLeaf = new ArtJs.CustomEvent('onLeaf');
  },
  {
    init: function() {
      this._element = $('.art-sidebar').first();
      this._element.insert(this._tree.render());
      
      var point = this._element.find('li').partition(function(item, idx) {
        return item.find('ul').isNotEmpty();
      });
    
      this.nodes = point.x;
      this.leaves = point.y;
      
      this.nodes.each($DC(this, this._eachNode));
      this.leaves.each($DC(this, this._eachLeaf));
      
//      this._expandNode(this.nodes.first().firstElement());
//      this._leafAction(this.leaves.first().firstElement());
    },
    
    _eachNode: function(i) {
      i.firstElement().onClick(this._onNodeDelegate);
      i.find('ul').first().hide();
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
  },
  {
    FOLDED: 'url(../images/plus.png)',
    UNFOLDED: 'url(../images/minus.png)',
    LEAF: 'url(../images/leaf.png)'
  }
);

