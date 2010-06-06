var Main = function () {
  ArtJs.globalize();
  ArtJs.doInjection();
};

Main.prototype = {
};

window.onload = function() {
  this.main = new Main();
};
