art.model.Member = artjs.Class(
  function(header, description, example, params, more) {
    this.super(header, description, example, params, more);
    
    this.header = header;
    this.description = description;
    this.example = example;
    this.params = params; 
    this.more = more;
  }, null, null, artjs.Model
);
