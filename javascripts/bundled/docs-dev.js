var art = {
  component: {},
  controller: {},
  events: {
    ON_SIDEBAR: "Sidebar::onClick"
  },
  view: {}
};

artjs.TemplateLibrary.config.BASE_TEMPLATES = [];

artjs.TemplateLibrary.config.PATH = "templates";

artjs.TemplateLibrary.config.TEMPLATES = [ "content/class", "content/component", "content/delegate", "content/event", "content/introduction", "content/routing", "content/template", "content/template_view", "content/testing", "content/utils", "content/view", "disqus", "doc", "ga", "member", "section" ];

artjs.Broadcaster.register(art.events.ON_SIDEBAR);

art.Member = artjs.Class(function(header, description, example, params, more) {
  this.header = header;
  this.description = description;
  this.example = example;
  this.params = params;
  this.more = more;
});

artjs.TemplateHelpers.registerAll({
  code: function(value) {
    return this._renderSpan("code", value);
  },
  param: function(value) {
    return this._renderSpan("param", value);
  },
  artjs: function() {
    return this._renderSpan("artjs", "ArtJs");
  },
  renderMore: function(example, more) {
    if (example || more) {
      var v = this.renderIf(example, "_renderExample") + this.renderIf(more, "_renderMore");
      return this.renderElement("div", {
        className: "more"
      }, v);
    } else {
      return "";
    }
  },
  renderDescription: function(v) {
    return this.renderIf(v, "_renderDescription");
  },
  renderParams: function(v) {
    return this.renderIf(v, "_renderParams");
  },
  _renderExample: function(v) {
    var exampleElement = this.renderElement("p", {
      className: "example"
    }, "Example:");
    var codeElement = this.renderElement("pre", {
      className: "block"
    }, this._evaluate(v));
    return exampleElement + codeElement;
  },
  _renderSpan: function(className, value) {
    return this.renderElement("span", {
      className: className
    }, value);
  },
  _renderMore: function(v) {
    return this.renderElement("p", {
      className: "container"
    }, this._evaluate(v), true);
  },
  _renderDescription: function(v) {
    return this.renderElement("p", null, this._evaluate(v), true);
  },
  _renderParams: function(v) {
    var collection = artjs.Object.map(v, this._paramToElement, this).join("");
    return this.renderElement("div", {
      className: "params"
    }, collection);
  },
  _paramToElement: function(k, v) {
    var content = this.renderElement("span", null, k) + " - " + v;
    return this.renderElement("p", null, content);
  },
  _evaluate: function(v) {
    if (!artjs.Object.isArray(v)) {
      v = [ v ];
    }
    return artjs.Array.map(v, this._escapeHtml, this).join("<br/>");
  },
  _escapeHtml: function(v) {
    return artjs.String.escapeHtml(artjs.String.toS(v));
  }
});

art.component.Sidebar = artjs.Class(function(element) {
  this.super(element, true);
  this._leafClassToggler = new artjs.ClassToggler("selected");
  artjs.Router.onNavigate.add(artjs.$D(this, "_onNavigate"));
  var ajax = artjs.$get("data/tree");
  ajax.onSuccess.add(artjs.$D(this, "_onSuccess"));
}, {
  _onNavigate: function(route) {
    this._section = artjs.Object.getDefault(route.getRequest().controllerId, "introduction");
    if (this._data) {
      this._select();
    }
    artjs.Broadcaster.fire(art.events.ON_SIDEBAR, this._section);
  },
  _onSuccess: function(ajax) {
    this.setData(YAML.parse(ajax.getResponseText()));
    if (this._section) {
      this._select();
    }
  },
  _select: function() {
    var paths = artjs.TreeCrawler.find(this.getData(), this._section);
    var path = artjs.Array.first(paths);
    this.openAt(path, true);
    this._leafClassToggler.toggle(artjs.Element.parent(this._current));
  }
}, {
  _name: "art.component.Sidebar"
}, artjs.Tree);

art.component.Content = artjs.Class(function(element) {
  this.super(element);
  artjs.Broadcaster.addListener(art.events.ON_SIDEBAR, artjs.$D(this, "_onSidebar"));
  var ajax = artjs.$get("data/docs");
  ajax.onSuccess.add(artjs.$D(this, "_onSuccess"));
}, {
  _onSidebar: function(section) {
    this._section = section;
    if (this._content) {
      this._update();
    }
  },
  _onSuccess: function(ajax) {
    this._content = YAML.parse(ajax.getResponseText());
    if (this._section) {
      this._update();
    }
  },
  _update: function() {
    var data = this._content[this._section];
    var template = data.template;
    artjs.TemplateHelpers.renderInto(this._element, template && "content/" + template || "doc", data);
    artjs.Fade.run(this._element, 1, .2, null, null, 0);
  }
}, {
  _name: "art.component.Content"
}, artjs.Component);

art.component.Member = artjs.Class(function(element) {
  this.super(element);
  var a = artjs.Selector.find(artjs.Selector.find(element, "h4"), "a");
  artjs.Element.onClick(a, artjs.$D(this, "_onAnchor"));
  this.more = artjs.Selector.find(element, ".more");
  if (this.more) {
    artjs.Element.addClass(a, "active");
    this.height = artjs.Element.getSize(this.more).y;
    artjs.Blind.run(this.more, 0, 0);
  }
}, {
  _onAnchor: function(e) {
    e.preventDefault();
    if (this.more) {
      artjs.Blind.toggle(this.more, this.height, .2, artjs.TransitionBase.EASE_IN_OUT);
    }
  }
}, {
  _name: "art.component.Member"
}, artjs.Component);

art.view.Version = artjs.Class(function(element) {
  this.super(element);
  var model = new artjs.Model;
  model.addProperty("version", artjs.VERSION);
  this.setModel(model);
}, null, {
  _name: "art.view.Version"
}, artjs.TemplateView);