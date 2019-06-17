A component for table data.

### Usage
Given props `data` and `columns`, a table will be constructed where a column is created for each entry in `columns` in order where the cell value will be `data[column]`; the default assuming that `data` is an array of objects and `columns` is an array of relevant field references within the objects contained in `data`.

### Customization
The component takes the basic props of `style`, `id`, and `className` to be applied to the table tag; please see Styling
- `content: (rowData, columnRef, isHeading) => React.Node` - given the data of the parent row, the current column, and a flag for whether this is in the thead, define how it should be rendered. By default, this will render the `columnRef` if `isHeading` is true, otherwise `rowData[columnRef]`
- `rowAttrs: (rowData) => Object` - given the data for the row, return an object to be applied as attributes to the resulting tr tag. This is ignored for row rendered in thead.
- `cellAttrs: (rowData, columnRef) => Object` - given the data for the row and the current column, return an object to be applied as attributes to the resulting td tag. This is ignored for th tags.
- `collapse` - object that will define behavior for collapsing rows
  - `collapse.content: (rowData) => React.Node` - given the data of the parent row, define how it should be rendered. There is no default for this, and will render null
  - `collapse.rowAttrs: (rowData) => Object` - similiar to same name function above
  - `collapse.cellAttrs: (rowData, columnRef) => Object` - similiar to same name function above, but will apply the resulting attributes to the section tag container within the column spanning td tag.

### Styling
