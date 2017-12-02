const fs = require('fs');
const path = require('path');
const reactDocs = require('react-docgen');
// var componentInfo = reactDocs.parse(src);

/*
  recursively go through the given directory and collect a listing of all files
  that match the given condition. Once all nested folders are traversed, send the
  list to the callback
  @param dir - directory to walk through
  @param cond - condition to match for files found
  @param filelist - array of directory entries to process
  @retruns array of matching files found recursively
 */
const walk = (dir, cond) => new Promise((resolve, reject, files = []) => {
  const further = d => {
    fs.readdirSync(d)
      .map(file => path.join(d, file))
      .forEach(file => {
        if (fs.statSync(file).isDirectory()) {
          further(file + '/');
        } else if (cond(file)) {
          files = [...files, path.relative(__dirname, file)];
        }
      });
  };
  further(dir);
  resolve(files);
});

walk(
  path.join(__dirname, 'src'),
  file => /\.jsx$/.test(file)
)
  .then(jsxs => (
    jsxs.reduce((metadata, jsx) => ({
      ...metadata,
      [jsx]: reactDocs.parse(fs.readFileSync(jsx).toString()),
    }), {})
  ))
  .then(metadata => {
    fs.writeFileSync('metadata.json', JSON.stringify(metadata, null, 2));
  });
