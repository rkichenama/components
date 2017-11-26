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
```
