ArtJs.TemplateHelpers.registerAll({
  renderExample: function(v) {
    var exampleElement = $B('p', {className: 'example'}, 'Example:').toString();
    var codeElement = $B('pre', {className: 'block'}, v.join('<br />')).toString();
    
    return exampleElement + codeElement;
  },
  
  renderMore: function(v) {
    return $B('p', {className: 'container'}, v).toString();
  },
  
  renderDescription: function(v) {
    return $B('p', null, v).toString();
  },
  
  renderParams: function(v) {
    var collection = v.map(this._paramToElement, this).join('');
      
    return $B('div', {className: 'params'}, collection).toString();
  },
  
  _paramToElement: function(k, v) {
    var content = $B('span', null, k).toString() + ' - ' + v;
    
    return $B('p', null, content).toString();
  }
});
