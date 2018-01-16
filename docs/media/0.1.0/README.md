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
