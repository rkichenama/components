import { components, keys } from './metadata.json';
import { meta, tests } from './tests.json';

keys.forEach(key => {
  if (components[key] && tests[key]) {
    components[key].testStatus = tests[key];
  }
});

export default {
  keys,
  components,
  testStatus: meta,
};
