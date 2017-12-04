import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Table extends PureComponent {
  static propTypes = {
    props: PropTypes.object,
    columns: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired
        })
      ])
    ).isRequired,
  }

  renderValueForType = (column, value, key) => {
    const { type = 'string', name = column } = ((/object/.test(typeof(column)) && column )|| {});
    switch (true) {
      case name === 'type': return value.name;
      case name === 'name': return key;
      case name === 'defaultValue': return (value && value.value) || (<i>none</i>);
      case type === 'bool': return value ? <span style={{color: 'var(--clr-accent, #900)'}}>✔</span> : null;
      default: return value;
    }
  }
  render () {
    const { props: { props, columns }} = this;

    if (!props) { return null; }
    
    const propNames = Object.keys(props).sort((a, b) => {
      const [x, y] = [props[a], props[b]];
      if (x.required === y.required) { return a.localeCompare(b); }
      if (x.required) { return -1; }
      return 1;
    });

    return (
      <table>
        <thead>
          <tr>
            {
              columns.map((column, c) => (
                <th key={c} className={ column.type || '' }>
                  { column.name || column }
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            propNames.length ? propNames.map(prop => (
              <tr key={prop}>
                {
                  columns.map((column, c) => (
                    <td key={c} className={ column.type || '' }>
                      { this.renderValueForType(column, props[prop][(column.name || column)], prop) }
                    </td>
                  ))
                }
              </tr>
            )) : (
              <tr>
                <td colSpan={columns.length} className='empty-table-state'>
                  no data
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    );
  }
}
