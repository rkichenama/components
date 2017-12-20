A component wrapper for the html5 Canvas tag. It will render a canvas as the root element, processing passed props to render image and/or animation. To assist in this, there are helper functions also exported.

### Animation function
The functions passed at props to this component will receive each named prop given to the component as well as an additional argument `context`. This last argument is a convenience wrapper for the context2d of the rendered canvas that provides chainable functions for drawing. The aim is to enable creating an array of functions that draw layers on the canvas.

### Helpers
* Clear
* FilledRect
* BorderedRect
* Rect
* Arc
* Circle
