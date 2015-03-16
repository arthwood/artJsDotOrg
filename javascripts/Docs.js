var art = {
  component: {},
  events: {
    ON_SIDEBAR: 'Sidebar::onClick'
  },
  view: {}
};

artjs.TemplateLibrary.config.PATH = 'templates';
artjs.TemplateLibrary.config.TEMPLATES = [
  'content/class',
  'content/component',
  'content/delegate',
  'content/event',
  'content/introduction', 
  'content/template', 
  'content/testing',
  'content/view',
  'disqus',
  'doc', 
  'ga', 
  'member', 
  'section' 
];
artjs.Broadcaster.register(art.events.ON_SIDEBAR);
