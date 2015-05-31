artjs.TemplateHelpers.registerAll({
  code: function(value) {
    return this._renderSpan('code', value);
  },
  
  param: function(value) {
    return this._renderSpan('param', value);
  },
  
  artjs: function() {
    return this._renderSpan('artjs', 'ArtJs');
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
  
  _renderExample: function(v) {
    var exampleElement = this.renderElement('p', {className: 'example'}, 'Example:');
    var codeElement = this.renderElement('pre', {className: 'block'}, this._evaluate(v));
    
    return exampleElement + codeElement;
  },
  
  _renderSpan: function(className, value) {
    return this.renderElement('span', {className: className}, value);
  },
  
  _renderMore: function(v) {
    return this.renderElement('p', {className: 'container'}, this._evaluate(v), true);
  },
  
  _renderDescription: function(v) {
    return this.renderElement('p', null, this._evaluate(v), true);
  },
  
  _renderParams: function(v) {
    var collection = artjs.Object.map(v, this._paramToElement, this).join('');
      
    return this.renderElement('div', {className: 'params'}, collection);
  },
  
  _paramToElement: function(k, v) {
    var content = this.renderElement('span', null, k) + ' - ' + v;
    
    return this.renderElement('p', null, content);
  },
  
  _evaluate: function(v) {
    if (!artjs.Object.isArray(v)) {
      v = [v];
    }
    
    return artjs.Array.map(v, this._escapeHtml, this).join('<br/>');
  },
  
  _escapeHtml: function(v) {
    return artjs.String.escapeHtml(artjs.String.toS(v));
  }
});
