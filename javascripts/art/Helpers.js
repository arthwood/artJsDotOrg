ArtJs.TemplateHelpers.registerAll({
  _renderExample: function(v) {
    var exampleElement = ArtJs.$B('p', {className: 'example'}, 'Example:').toString();
    var codeElement = ArtJs.$B('pre', {className: 'block'}, v.join('<br />')).toString();
    
    return exampleElement + codeElement;
  },
  
  renderMore: function(example, more) {
    if (example || more) {
      var v = this.renderIf(example, '_renderExample') + this.renderIf(more, '_renderMore');
      
      return ArtJs.$B('div', {className: 'more'}, v).toString();
    }
    else {
      return '';
    }
  },
  
  _renderMore: function(v) {
    return ArtJs.$B('p', {className: 'container'}, v).toString();
  },
  
  renderDescription: function(v) {
    return ArtJs.$B('p', null, v).toString();
  },
  
  renderParams: function(v) {
    var collection = ArtJs.ObjectUtils.map(v, this._paramToElement, this).join('');
      
    return ArtJs.$B('div', {className: 'params'}, collection).toString();
  },
  
  _paramToElement: function(k, v) {
    var content = ArtJs.$B('span', null, k).toString() + ' - ' + v;
    
    return ArtJs.$B('p', null, content).toString();
  }
});
