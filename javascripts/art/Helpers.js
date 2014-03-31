ArtJs.TemplateHelpers.registerAll({
  renderExample: function(v) {
    var exampleElement = $B('p', {className: 'example'}, 'Example:').toString();
    var codeElement = $B('p', {className: 'block code'}, v.join('<br />')).toString();
    
    return exampleElement + codeElement;
  },
  
  renderMore: function(v) {
    return $B('p', null, v).toString()
  },
  
  renderDescription: function(v) {
    return $B('p', null, v).toString();
  },
  
  renderParams: function(v) {
    var collection = v.map(this._paramToElement, this).join('');
      
    return $B('p', {className: 'params'}, collection).toString();
  },
  
  _paramToElement: function(k, v) {
    return $B('span', null, k).toString() + ' - ' + v;
  }
});
