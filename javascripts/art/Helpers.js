artjs.TemplateHelpers.registerAll({
  _renderExample: function(v) {
    var exampleElement = this.renderElement('p', {className: 'example'}, 'Example:');
    var codeElement = this.renderElement('pre', {className: 'block'}, v.join('<br />'));
    
    return exampleElement + codeElement;
  },
  
  renderMore: function(example, more) {
    if (example || more) {
      var v = this.renderIf(example, '_renderExample') + this.renderIf(more, '_renderMore');
      
      return this.renderElement('div', {className: 'more'}, v);
    }
    else {
      return '';
    }
  },
  
  renderDescription: function(v) {
    return this.renderIf(v, '_renderDescription');
  },
  
  renderParams: function(v) {
    return this.renderIf(v, '_renderParams');
  },
  
  _renderMore: function(v) {
    return this.renderElement('p', {className: 'container'}, v);
  },
  
  _renderDescription: function(v) {
    return this.renderElement('p', null, v);
  },
  
  _renderParams: function(v) {
    var collection = artjs.ObjectUtils.map(v, this._paramToElement, this).join('');
      
    return this.renderElement('div', {className: 'params'}, collection);
  },
  
  _paramToElement: function(k, v) {
    var content = this.renderElement('span', null, k) + ' - ' + v;
    
    return this.renderElement('p', null, content);
  }
});
