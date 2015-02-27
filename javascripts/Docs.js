var art = {
  component: {},
  model: {},
  events: {
    ON_SIDEBAR: 'Sidebar::onClick'
  }
};

artjs.TemplateLibrary.config.PATH = 'templates';
artjs.TemplateLibrary.config.TEMPLATES = [
  'introduction', 
  'testing', 
  'doc', 
  'member', 
  'section', 
  'ga', 
  'disqus'
];
artjs.Broadcaster.register(art.events.ON_SIDEBAR);
