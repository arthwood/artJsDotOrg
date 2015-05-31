var art={component:{},controller:{},events:{ON_SIDEBAR:"Sidebar::onClick"},view:{}};artjs.TemplateLibrary.config.BASE_TEMPLATES=[],artjs.TemplateLibrary.config.PATH="templates",artjs.TemplateLibrary.config.TEMPLATES=["content/class","content/component","content/delegate","content/event","content/introduction","content/routing","content/template","content/testing","content/utils","content/view","disqus","doc","ga","member","section"],artjs.Broadcaster.register(art.events.ON_SIDEBAR),art.Member=artjs.Class(function(a,b,c,d,e){this.header=a,this.description=b,this.example=c,this.params=d,this.more=e}),artjs.TemplateHelpers.registerAll({code:function(a){return this._renderSpan("code",a)},param:function(a){return this._renderSpan("param",a)},artjs:function(){return this._renderSpan("artjs","ArtJs")},renderMore:function(a,b){if(a||b){var c=this.renderIf(a,"_renderExample")+this.renderIf(b,"_renderMore");return this.renderElement("div",{className:"more"},c)}return""},renderDescription:function(a){return this.renderIf(a,"_renderDescription")},renderParams:function(a){return this.renderIf(a,"_renderParams")},_renderExample:function(a){var b=this.renderElement("p",{className:"example"},"Example:"),c=this.renderElement("pre",{className:"block"},this._evaluate(a));return b+c},_renderSpan:function(a,b){return this.renderElement("span",{className:a},b)},_renderMore:function(a){return this.renderElement("p",{className:"container"},this._evaluate(a),!0)},_renderDescription:function(a){return this.renderElement("p",null,this._evaluate(a),!0)},_renderParams:function(a){var b=artjs.Object.map(a,this._paramToElement,this).join("");return this.renderElement("div",{className:"params"},b)},_paramToElement:function(a,b){var c=this.renderElement("span",null,a)+" - "+b;return this.renderElement("p",null,c)},_evaluate:function(a){return artjs.Object.isArray(a)||(a=[a]),artjs.Array.map(a,this._escapeHtml,this).join("<br/>")},_escapeHtml:function(a){return artjs.String.escapeHtml(artjs.String.toS(a))}}),art.component.Sidebar=artjs.Class(function(a){this.super(a,!0),this._leafClassToggler=new artjs.ClassToggler("selected"),artjs.Router.onNavigate.add(artjs.$D(this,"_onNavigate"));var b=artjs.$get("data/tree");b.onSuccess.add(artjs.$D(this,"_onSuccess"))},{_onNavigate:function(a){this._section=artjs.Object.getDefault(a.getRequest().controllerId,"introduction"),this._data&&this._select(),artjs.Broadcaster.fire(art.events.ON_SIDEBAR,this._section)},_onSuccess:function(a){this.setData(YAML.parse(a.getResponseText())),this._section&&this._select()},_select:function(){var a=artjs.TreeCrawler.find(this,this._section),b=artjs.Array.first(a);this.openAt(b,!0),this._leafClassToggler.toggle(artjs.Element.parent(this._current))}},{_name:"art.component.Sidebar"},artjs.Tree),art.component.Content=artjs.Class(function(a){this.super(a),artjs.Broadcaster.addListener(art.events.ON_SIDEBAR,artjs.$D(this,"_onSidebar"));var b=artjs.$get("data/docs");b.onSuccess.add(artjs.$D(this,"_onSuccess"))},{_onSidebar:function(a){this._section=a,this._content&&this._update()},_onSuccess:function(a){this._content=YAML.parse(a.getResponseText()),this._section&&this._update()},_update:function(){var a=this._content[this._section],b=a.template;artjs.TemplateHelpers.renderInto(this._element,b&&"content/"+b||"doc",a),artjs.Fade.run(this._element,1,.2,null,null,0)}},{_name:"art.component.Content"},artjs.Component),art.component.Member=artjs.Class(function(a){this.super(a);var b=artjs.Selector.find(artjs.Selector.find(a,"h4"),"a");artjs.Element.onClick(b,artjs.$D(this,"_onAnchor")),this.more=artjs.Selector.find(a,".more"),this.more&&(artjs.Element.addClass(b,"active"),this.height=artjs.Element.getSize(this.more).y,artjs.Blind.run(this.more,0,0))},{_onAnchor:function(a){a.preventDefault(),this.more&&artjs.Blind.toggle(this.more,this.height,.2,artjs.TransitionBase.EASE_IN_OUT)}},{_name:"art.component.Member"},artjs.Component),art.view.Version=artjs.Class(function(a){this.super(a);var b=new artjs.Model;b.addProperty("version",artjs.VERSION),this.setModel(b)},null,{_name:"art.view.Version"},artjs.TemplateView)