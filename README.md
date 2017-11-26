# components

Just a place to put React components I make

## Note
There is a git hook for pre-push to ensure the docs folder is updated.

```bash
npm run build-doc
git add ./docs/
commit=`git commit -m 'build docs'`
if [[ $commit == *"nothing to commit"* ]]
then
	exit 0
else
	echo >&2 "Commit doc changes"
	exit 1
fi
```

## TODO
http://www.koalastothemax.com/

https://github.com/modernserf/chers-closet
```javascript

const template = new Proxy(
  {},
  get: (target, key) => (id, ...params) => ([id, key, ...params])
);

const data = [
  template.is_a('white_shirt', 'top'); // ['white_shirts', 'is_a', 'top']
];
```

An iterable List interface
```javascript
class ListClass {
  constructor () {
    this._items = ['a', 1, 2];
    // iterating over List gives the items in order
    this[Symbol.iterator] = function* () { for (let i of this._items) yield i; }
  }
}

/* === */
const BoundsCheck = (len, a, b) => {
  if (Math.min(a, b) < 0 || Math.max(a, b) >= len) { throw Error(`Requested index is out of bounds: ${a}, ${b}`); }
};
const swap = (array, a, b) => ([
  ...array.slice(0, a),
  array[b],
  ...array.slice(a + 1, b),
  array[a],
  ...array.slice(b + 1)
]);
// insert into b, the value of a, shifting over
const insert = (array, a, b) => ([
  // the unchanged order before a target
  ...array.slice(0, Math.min(a, b)),
  ...((b < a) ?
    // move down, then shift up
    [array[a], ...array.slice(b, a)] :
    // shift down, then move up
    [...array.slice(a + 1, b + 1), array[a]]),
  // the unchanged order after a target
  ...array.slice(Math.max(a, b) + 1)
]);

const Helper = array => ({
    // make iterable
    [Symbol.iterator]: function* () { for (let i of array) yield i; },
    // swap positions of src and dest
    swap (src, dest) {
      BoundsChecl(array.length, src, dest);
      if (src !== dest) {
        array = swap(array, ...[src, dest].sort((a, b) => a - b));
      }
    },
    // insert from at place to, shifting right where necessary
    insert (from, to) {
      BoundsChecl(array.length, from, to);
      if (from !== to) { 
        array = insert(array, from, to);
      }
    },
});

const Proxifier = (array, helpers = Helper(array)) => (
  new Proxy(array, {
    get (target, key, proxy) {
      if (Object.keys(helpers).includes(key)) {
        return helpers[key]
      }
      return Reflect.get(target, key, proxy);
    },
    set (target, key, value) {
      if (Object.keys(helpers).includes(key)) {
        throw new Error(`Unable to change value of ${key}`)
      }
      return Reflect.set(target, key, value);
    }
  })
)

const ArrayProxyFactory = (array = []) => Proxifier(array);
```
