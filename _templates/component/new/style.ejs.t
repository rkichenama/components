---
to: src/<%= h.PascalCase(name) %>/<%= h.PascalCase(name) %>.scss
---
.<%= h['style-case'](name) %> {
  /* to be replaced */
  background-color: hsla(0, 0, 50%, 0.5);
  border: 1px dashed white;
  width: 32px;
  height: 32px;
}
