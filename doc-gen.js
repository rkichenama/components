const fs = require('fs');
const path = require('path');
const reactDocs = require('react-docgen');
const reactTsDocs = require('react-docgen-typescript');

/*
  recursively go through the given directory and collect a listing of all files
  that match the given condition. Once all nested folders are traversed, send the
  list to the callback
  @param dir - directory to walk through
  @param cond - condition to match for files found
  @param filelist - array of directory entries to process
  @returns array of matching files found recursively
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

const srcFldr = path.join(__dirname, 'src');
const storeJson = path.join(__dirname, 'app/store/metadata.json');

const tsParserOptions = {};

/*
search the local src directory for all the jsx files. assumed to be Components
*/
walk(
  srcFldr,
  file => /\.(j|t)sx$/.test(file)
)
  .then(jsxs => (// run them through react-gendoc
    jsxs.reduce((obj, filename) => {
      const source = fs.readFileSync(filename).toString();
      const metadata = /\.tsx?$/i.test(filename)
        ? reactTsDocs
          .withCustomConfig('./tsconfig.json')
          .parse(filename)[0]
        : reactDocs.parse(source);
      if (metadata.props) {
        metadata.props = Object.keys(metadata.props).map(name => ({
          ...(metadata.props[name]),
          name,
        }));
      }
      // if there is a readme.md file parallel to the component, then load it as the description
      const readme = path.join(__dirname, path.dirname(filename), 'readme.md');
      if (fs.existsSync(readme)) {
        metadata.description = fs.readFileSync(readme).toString();
      }

      obj[ metadata.displayName || path.basename(filename).split('.')[0] ] = {
        ...metadata,
        filename,
      };
      return obj;

      return {
        ...obj,
        [metadata.displayName]: {
          ...metadata,
          filename,
        },
      };
    }, {})
  ))
  .then(components => {// normalize the data
    return {
      components,
      keys: Object.keys(components),
    };
  })
  .then(metadata => {// write the store
    fs.writeFileSync(storeJson, JSON.stringify(metadata, null, 2));
  });
