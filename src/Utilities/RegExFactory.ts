const escapeRegExp = s => s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

const _regexp = (flags, strings, ...values) => {
  const pattern = strings[0] + values.map((v, i) => escapeRegExp(v) + strings[i + 1]).join('');
  return RegExp(pattern, flags);
};

const regexp = new Proxy(_regexp.bind(undefined, ''), {
  get: (ignored, property) => _regexp.bind(undefined, property)
});

export default regexp;
// http://lea.verou.me/2018/06/easy-dynamic-regular-expressions-with-tagged-template-literals-and-proxies/
