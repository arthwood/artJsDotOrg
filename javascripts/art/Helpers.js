artjs.TemplateHelpers.registerAll({
  _renderExample: function(v) {
    var exampleElement = this._renderElement('p', {className: 'example'}, 'Example:');
    var codeElement = this._renderElement('pre', {className: 'block'}, v.join('<br />'));
    
    return exampleElement + codeElement;
  },
  
  renderMore: function(example, more) {
    if (example || more) {
      var v = this.renderIf(example, '_renderExample') + this.renderIf(more, '_renderMore');
      
      return this._renderElement('div', {className: 'more'}, v);
    }
    else {
      return '';
    }
  },
  
  _renderMore: function(v) {
    return this._renderElement('p', {className: 'container'}, v);
  },
  
  renderDescription: function(v) {
    return this._renderElement('p', null, v);
  },
  
  renderParams: function(v) {
    var collection = artjs.ObjectUtils.map(v, this._paramToElement, this).join('');
      
    return this._renderElement('div', {className: 'params'}, collection);
  },
  
  _paramToElement: function(k, v) {
    var content = this._renderElement('span', null, k) + ' - ' + v;
    
    return this._renderElement('p', null, content);
  }
});
