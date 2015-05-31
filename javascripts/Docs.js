var art = {
  component: {},
  controller: {},
  events: {
    ON_SIDEBAR: 'Sidebar::onClick'
  },
  view: {}
};

artjs.TemplateLibrary.config.BASE_TEMPLATES = [];
artjs.TemplateLibrary.config.PATH = 'templates';
artjs.TemplateLibrary.config.TEMPLATES = [
  'content/class',
  'content/component',
  'content/delegate',
  'content/event',
  'content/introduction', 
  'content/routing', 
  'content/template', 
  'content/testing',
  'content/utils',
  'content/view',
  'disqus',
  'doc', 
  'ga', 
  'member', 
  'section' 
];
artjs.Broadcaster.register(art.events.ON_SIDEBAR);
