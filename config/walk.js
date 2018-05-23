const { join } = require('path');
const { readdir, stat } = require('fs');
const { promisify } = require('util');
/**
 * recursively go through the given directory and collect a listing of all files
 * that match the given condition. Once all nested folders are traversed, send
 * the list to the callback
 *
 * @param {String} dir - directory to walk through
 * @param {Function} cond - condition to match for files found
 * @param {Function} done - callback given the listing of files that match the cond function
 */
const walk = (dir, cond, done) => {
  let results = [];

  readdir(dir, function (err, list) {
    if (err) { return done(err, results); }

    (function next () {
      if (!list.length) { return done(null, results); }

      // pull next entry from this directory
      let entry = join(dir, list.shift());

      stat(entry, (ignored, details) => {
        if (details && details.isDirectory()) {
          // recurse if the entry is a directory
          walk(entry, cond, (ignored, res) => {
            results = [...results, ...res];
            next();
          });
        } else {
          // add to results if meets condition
          if (cond(entry)) { results.push(entry); }
          next();
        }
      });
    })();
  });
};

module.exports = promisify(walk);
