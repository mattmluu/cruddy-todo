const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

//var items = {id: text};
// something+id.js
//

// Public API - Fix these CRUD functions ///////////////////////////////////////

//directory con
exports.create = (text, callback) => {

  counter.getNextUniqueId((error, counter) => {
    if (error) {
      callback(error);
    } else {
      var newPath = path.join(exports.dataDir, `${counter}.txt`);
      fs.writeFile(newPath, text, (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null, { id: counter, text: text });
        }
      });
    }
  });
  //exports.dataDir = path.join(__dirname, 'data');
  // var id = counter.getNextUniqueId(callback);
  // //items[id] = text;
  // console.log(dataDir(id, text));
};

exports.readAll = (callback) => {
  var data = _.map(items, (text, id) => {
    return { id, text };
  });
  callback(null, data);
};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
