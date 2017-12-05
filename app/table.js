import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Markdown from './markdown';

const DefaultValues = {
  [`''`]: 'empty string',
  ['[]']: 'empty array',
  ['{}']: 'empty object',
}

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
      case /(description|docblock)/i.test(name): return <Markdown source={value} />;
      case name === 'defaultValue':
        const v = (value && value.value) || (<i>none</i>);
        return (Object.keys(DefaultValues).includes(v)) ? DefaultValues[v] : v;
      case type === 'bool': return value ? <span style={{color: 'var(--clr-accent, #900)'}}>✔</span> : null;
      case (value instanceof Array): return (<Table columns={Object.keys(value[0])} data={value} />);
      case (value instanceof Object): return (<Table columns={Object.keys(value)} data={[value]} />);
      // case /array/.test(typeof(value)): return <Table props={} columns={['name']}/>
      default: return value;
    }
  }
  render () {
    const { props: { data, columns }} = this;

    if (!data) { return null; }
    
    const rows = [...data].sort((a, b) => {
      if (a.required === b.required) {
        return a.name ? a.name.localeCompare(b.name) : a.description.localeCompare(b.description);
      }
      if (a.required) { return -1; }
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
            rows.length ? rows.map((row, r) => (
              <tr key={r}>
                {
                  columns.map((column, c) => (
                    <td key={c} className={ column.type || '' }>
                      { this.renderValueForType(column, row[(column.name || column)]) }
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
