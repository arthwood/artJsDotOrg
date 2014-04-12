art.model.Member = ArtJs.Class(
  function(header, description, example, params, more) {
    this.super(arguments);
    
    this.header = header;
    this.description = description;
    this.example = example;
    this.params = params; 
    this.more = more;
  }, null, null, ArtJs.Model
);
