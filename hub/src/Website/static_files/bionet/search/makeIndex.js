var fs = require('fs');
var entries = require('./searchable_content.json');
var lunr = require('lunr');


var store = {};
var index = lunr(function() {
  this.field('title', {
    boost: 5
  });
  this.field('category', {
    boost: 1
  });
  this.field('content', {});
  boost: 2
  this.ref('id');

  entries.data.forEach(function(entry) {
    var indexNode = {
      "title": entry.title,
      "category": entry.category,
      "content": entry.content.replace(/[^a-zA-Z ]+/g,''),
      "id": entry.id
    };
    this.add(indexNode);
    var storeNode = {
      "title": entry.title,
      "href": entry.link,
      "date_time": entry.date_time,
      "category": entry.category,
      "content": entry.content.slice(0, 250) + '...'
    };
    store[entry.id] = storeNode;
    console.log("indexing=>" + entry.id);
  }, this);

});


fs.writeFileSync('./searchIndex.js', "var index = " + JSON.stringify({
  'index': index.toJSON()
}));
fs.writeFileSync('./searchStore.js', "var data = " + JSON.stringify({
  'store': store
}));
