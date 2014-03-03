var art = {};

art.Main = ArtJs.Class(function() {
  this.sidebar = new art.Sidebar;
  this.content = new art.Content;
  this.sidebar.onLeaf.add($D(this, this.onLeaf));
  this.sidebar.init();
}, {
  onLeaf: function(element) {
    this.content.loadSection(element);
  }
});

ArtJs.globalize();

ArtJs.doInjection();

ArtJs.onDocumentLoad.add($D(null, function() {
  this.main = new art.Main;
}));

art.Sidebar = ArtJs.Class(function() {
  this._tree = new ArtJs.Tree(this.ctor.TREE);
  this._onNodeDelegate = $D(this, this._onNode);
  this._onLeafDelegate = $D(this, this._onLeaf);
  this._leafClassToggler = new ArtJs.ClassToggler("selected");
  this.onLeaf = new ArtJs.CustomEvent("onLeaf");
}, {
  init: function() {
    this._element = $(".art-sidebar").first();
    this._element.insert(this._tree.render());
    var point = this._element.find("li").partition(function(item, idx) {
      return item.find("ul").isNotEmpty();
    });
    this.nodes = point.x;
    this.leaves = point.y;
    this.nodes.each($DC(this, this._eachNode));
    this.leaves.each($DC(this, this._eachLeaf));
    this._expandNode(this.nodes.first().firstElement());
    this._leafAction(this.leaves.first().firstElement());
  },
  _eachNode: function(i) {
    i.firstElement().onClick(this._onNodeDelegate);
    i.find("ul").first().hide();
    i.style.listStyleImage = this.ctor.FOLDED;
  },
  _onNode: function(originalEvent, elementEvent) {
    originalEvent.preventDefault();
    this._expandNode(elementEvent.element);
  },
  _expandNode: function(a) {
    var ul = a.next();
    ul.toggle();
    a.parent().style.listStyleImage = ul.isHidden() ? this.ctor.FOLDED : this.ctor.UNFOLDED;
  },
  _eachLeaf: function(i) {
    i.firstElement().onClick(this._onLeafDelegate);
    i.style.listStyleImage = this.ctor.LEAF;
  },
  _onLeaf: function(originalEvent, elementEvent) {
    originalEvent.preventDefault();
    this._leafAction(elementEvent.element);
  },
  _leafAction: function(element) {
    this._leafClassToggler.toggle(element);
    this.onLeaf.fire(element);
  }
}, {
  FOLDED: "url(../images/plus.png)",
  UNFOLDED: "url(../images/minus.png)",
  LEAF: "url(../images/leaf.png)",
  TREE: {
    Global: {
      ArtJs: "main.html"
    },
    "com.arthwood.data": {
      List: "data/list.html",
      Queue: "data/queue.html"
    },
    "com.arthwood.dom": {
      ElementBuilder: "dom/element_builder.html",
      Selector: "dom/selector.html"
    },
    "com.arthwood.events": {
      Clock: "events/clock.html",
      CustomEvent: "events/custom_event.html",
      Delegate: "events/delegate.html",
      DelegateCollection: "events/delegate_collection.html",
      ElementEvent: "events/element_event.html",
      QueuedClock: "events/queued_clock.html",
      Timeline: "events/timeline.html"
    },
    "com.arthwood.math": {
      Point: "math/point.html",
      Rectangle: "math/rectangle.html"
    },
    "com.arthwood.net": {
      Ajax: "net/ajax.html"
    },
    "com.arthwood.spec": {
      "com.arthwood.matchers": {
        A: "spec/matchers/a.html",
        Base: "spec/matchers/base.html",
        Eq: "spec/matchers/eq.html",
        False: "spec/matchers/false.html",
        Null: "spec/matchers/null.html",
        Receive: "spec/matchers/receive.html",
        True: "spec/matchers/true.html"
      },
      Actual: "spec/actual.html",
      Definition: "spec/definition.html",
      Mock: "spec/mock.html",
      Nodes: "spec/nodes.html",
      Receiver: "spec/receiver.html",
      Result: "spec/result.html",
      Runner: "spec/runner.html",
      Subject: "spec/subject.html"
    },
    "com.arthwood.template": {
      Base: "template/base.html",
      Helpers: "template/helpers.html"
    },
    "com.arthwood.transition": {
      Blind: "transition/blind.html"
    },
    "com.arthwood.ui": {
      DatePicker: "ui/date_picker.html",
      ElementInspector: "ui/element_inspector.html",
      Flash: "ui/flash.html",
      ModalBox: "ui/modal_box.html",
      ScreenManager: "ui/screen_manager.html",
      Tabs: "ui/tabs.html",
      Tree: "ui/tree.html"
    },
    "com.arthwood.utils": {
      Array: "utils/array.html",
      Class: "utils/class.html",
      ClassToggler: "utils/class_toggler.html",
      Date: "utils/date.html",
      Element: "utils/element.html",
      Event: "utils/event.html",
      Log: "utils/log.html",
      Math: "utils/math.html",
      Object: "utils/object.html",
      String: "utils/string.html",
      Toggler: "utils/toggler.html"
    }
  }
});

art.Content = ArtJs.Class(function() {
  this._element = $(".art-content").first();
  this._onContentSuccessD = $D(this, this._onContentSuccess);
  this._onAnchorDelegate = $D(this, this._onAnchor);
}, {
  loadSection: function(a) {
    this._load("com/arthwood/" + a.getAttributes().href);
  },
  _load: function(url) {
    $get(url, null, this._onContentSuccessD);
  },
  _onContentSuccess: function(ajax) {
    var content = ajax.getResponseText();
    this._element.setContent(content);
    var last = this._element.lastElement();
    last && (last.style.marginBottom = "0");
    this._initializeLinks();
  },
  _initializeLinks: function() {
    var uls = this._element.find("ul.members");
    if (!uls.isEmpty()) {
      uls.each(this._eachMember, this);
    }
  },
  _eachMember: function(ul) {
    var lis = ul.find("li");
    var last = lis.last();
    last.style.borderBottom = "none";
    lis.each(this._initAnchors, this);
  },
  _initAnchors: function(li) {
    var a = li.first("h4 a");
    a.onClick(this._onAnchorDelegate);
    var more = li.first(".more");
    if (more) {
      more.blindTo(0, 0);
    }
  },
  _onAnchor: function(e) {
    e.preventDefault();
    var a = e.currentTarget;
    var more = a.parent().parent().first(".more");
    if (more) {
      more.blindToggle(300);
    }
  }
});