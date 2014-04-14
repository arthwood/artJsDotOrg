var Main = ArtJs.Class(
  function () {
    ArtJs.globalize();
    ArtJs.doInjection();
  }
);

ArtJs.onDocumentLoad.add(ArtJs.$D(null, function() {
  this.main = new Main();
}));
