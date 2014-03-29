ArtJs.TemplateHelpers.registerAll({
  renderExample: function(v) {
    var result;
    
    if (v) {
      var exampleElement = $B('p', {className: 'example'}, 'Example:').toString();
      var codeElement = $B('p', {className: 'block code'}, v.join('<br />')).toString();
      
      result = exampleElement + codeElement;
    }
    else {
      result = '';
    }
    
    return result;
  },
  
  renderMore: function(v) {
    return v ? $B('p', null, v).toString() : '';
  },
  
  renderDescription: function(v) {
    return v ? $B('p', null, v).toString() : '';
  },
  
  _paramToElement: function(k, v) {
    return $B('span', null, k).toString() + ' - ' + v;
  },
  
  renderParams: function(v) {
    if (v) {
      var collection = ArtJs.ObjectUtils.map(v, this._paramToElement, this).join('');
      
      return ArtJs.$B('p', {className: 'params'}, collection).toString();
    }
    else {
      return '';
    }
  } 
});
