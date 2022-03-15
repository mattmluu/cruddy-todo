const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

//var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

//invoke readCounter
//invoke writeCounter
//what is the callback??
//errFirstCallbackStructure--> callback(error, successResponse)

exports.getNextUniqueId = (callback) => {
  readCounter((readError, counter) => {
    if (readError) {
      callback (readError);
      // return = callback
      // error case (callback)
    } else {
      counter++;
      writeCounter (counter, (writeError, counter) => {
        if (writeError) {
          callback (writeError);
        // return = callback
        // error case (callback)
        } else {
          // success case
          // return/callback
          //why is counter++ not down here
          callback (null, counter);
        }
      });
    }
  });
};


















// exports.getNextUniqueId = (callback) => {
//   readCounter((readError, counter)=>{
//     if (readError) {
//       callback(readError);
//       // throw ('this is an error');
//     } else {
//       counter++;
//       writeCounter(counter, (writeError) => {
//         if (writeError) {
//           callback(writeError);
//           // throw ('writeError');
//         } else {
//           callback(null, counter);
//         }
//       });
//     }
//   });
//   // readCounter
//   // writeCounter

//   counter = counter + 1;
//   return zeroPaddedNumber(counter);
// };



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
