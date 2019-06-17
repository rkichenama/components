// @ts-nocheck
const { promisify } = require('util');
const fs = require('fs');
const writeFile = promisify(fs.writeFile);
// const appendFile = promisify(fs.appendFile);
const { resolve, relative, basename, join } = require('path');
const walk = require('./walk');
const config = require('./webpack-base.config');
const { pipe, setProdEnv, addCssExtraction, addMinifiers } = require('./mutators');
const { generateFromFile } = require('react-to-typescript-definitions');

const rootFolder = resolve(__dirname, '../');

pipe(setProdEnv, addCssExtraction, addMinifiers)(config);

config.target = 'web';
config.output.path = join(rootFolder, '/lib/');
config.performance.hints = false;

const defineModule = async (name, filepath) => {
  await writeFile(`lib/${name}.d.ts`, generateFromFile(null, filepath, { topLevelModule: true }));
};

const writeIndexesCurry = () => {
  const index = fs.createWriteStream('lib/index.js', { flags: 'a' });
  const definitions = fs.createWriteStream('lib/index.d.ts', { flags: 'a' });
  return name => {
    index.write(`module.exports.${name} = require('./lib/${name}').default;\n`);
    definitions.write(`import ${name} from 'lib/${name}'; export var ${name};\n`);
  };
};

module.exports = async () => {
  const components = await walk(
    join(rootFolder, 'src'),
    file =>  /\.(j|t)sx$/.test(file) && !/\.[tT]est\./.test(file)
  );
  const writeIndexes = writeIndexesCurry();
  const definitions = [];

  config.entry = components.reduce((entries, component) => {
    const name = basename(component).split('.')[0];
    const folder = relative(rootFolder, component);
    entries[name] = [ `./${folder}` ];
    if (/\.jsx$/.test(component)) {
      definitions.push(defineModule(name, folder));
    }
    writeIndexes(name);
    return entries;
  }, { });

  await Promise.all(definitions);

  return config;
};
