var art = {
  component: {},
  model: {},
  events: {
    ON_SIDEBAR: 'Sidebar::onClick'
  }
};

artjs.TemplateLibrary.config.PATH = 'templates';
artjs.TemplateLibrary.config.TEMPLATES = [
  'content/components',
  'content/introduction', 
  'content/templates', 
  'content/testing', 
  'disqus',
  'doc', 
  'ga', 
  'member', 
  'section' 
];
artjs.Broadcaster.register(art.events.ON_SIDEBAR);
