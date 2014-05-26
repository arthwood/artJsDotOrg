artjs.TemplateHelpers.registerAll({
  _renderExample: function(v) {
    var exampleElement = artjs.$B('p', {className: 'example'}, 'Example:').toString();
    var codeElement = artjs.$B('pre', {className: 'block'}, v.join('<br />')).toString();
    
    return exampleElement + codeElement;
  },
  
  renderMore: function(example, more) {
    if (example || more) {
      var v = this.renderIf(example, '_renderExample') + this.renderIf(more, '_renderMore');
      
      return artjs.$B('div', {className: 'more'}, v).toString();
    }
    else {
      return '';
    }
  },
  
  _renderMore: function(v) {
    return artjs.$B('p', {className: 'container'}, v).toString();
  },
  
  renderDescription: function(v) {
    return artjs.$B('p', null, v).toString();
  },
  
  renderParams: function(v) {
    var collection = artjs.ObjectUtils.map(v, this._paramToElement, this).join('');
      
    return artjs.$B('div', {className: 'params'}, collection).toString();
  },
  
  _paramToElement: function(k, v) {
    var content = artjs.$B('span', null, k).toString() + ' - ' + v;
    
    return artjs.$B('p', null, content).toString();
  }
});
