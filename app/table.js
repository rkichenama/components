import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Markdown from './markdown';
import Catcher from './error';
import translateProp from './translateProp';
import translateParams from './translateParams';

const DefaultValues = {
  [`''`]: 'empty string',
  ['[]']: 'empty array',
  ['{}']: 'empty object',
  ['() => {}']: 'noop',
  ['() => { }']: 'noop',
};

const figureOutBest = (name, value) => {
  if (value instanceof Object) {
    if (Array.isArray(value)) {
      if (!Array.isArray(value[0])) {
        return 'array';//renderList(value);
      }
      return renderTable(value);
    }
    return renderTable([value]);
  }
  return value; //string
};

const fixTypeForName = name => {
  switch (true) {
    case /defaultValue/.test(name):
      return name;
    case /(modifiers)/i.test(name):
      return 'list';
    case /computed/i.test(name):
      return 'boolean';
    case /(description|docblock)/i.test(name):
      return 'markdown';
    case /(type|value)/i.test(name):
      return 'table';
    default: return 'string';
  }
};

const dealWithColumn = column => {
  const { type, name = column } = ((/object/.test(typeof(column)) && column ) || {});
  return {
    name,
    type: (type || fixTypeForName(name)),
  };
};

const renderForColumn = (column, value) => {
  let { type, name } = dealWithColumn(column);

  return (
    ( /(percent|number)/i.test(type) && renderNumber(value, /percent/i.test(type)) ) ||
    ( /markdown/i.test(type) && renderMarkdown(value) ) ||
    ( /^bool/i.test(type) && renderBoolean(value) ) ||
    ( /^default/i.test(type) && renderDefaultValue(value) ) ||
    ( /list/i.test(type) && renderList(value) ) ||
    ( /table/i.test(type) && renderTable(value) ) ||
    ( /props/i.test(type) && renderPropColumn(value) ) ||
    ( /params/i.test(type) && renderParamsColumn(value) ) ||
    figureOutBest(name, value) // string
  );
};

const renderPropColumn = value => translateProp(value);
const renderParamsColumn = value => {
  const v = Array.isArray(value) ? value : [ value ];
  return (
    <Catcher>
      <ul className='unstyled'>
        { v.map(translateParams).map(renderListItem) }
      </ul>
    </Catcher>
  );
};

const renderNumber = (value, percent) => (
  <Catcher><div className='text-right'>{ percent ? `${ Number(value).toFixed(2) }%` : value }</div></Catcher>
);
const renderMarkdown = value => (
  <Markdown source={value || ''} />
);
const renderBoolean = value => (
  value ? <span style={{color: 'var(--clr-accent, #900)'}}>✔</span> : null
);
const renderDefaultValue = value => {
  const v = (value && value.value) || (<i>none</i>);
  return (Object.keys(DefaultValues).includes(v)) ? (<i>{DefaultValues[v]}</i>) : v;
};
const renderListItem = (value, index) => (
  <li key={index}>{ value }</li>
);
const renderList = value => {
  return (
    <Catcher>
      <ul className='unstyled'>
        { value.map((v, i) => {
          if (/object/.test(typeof v)) {
            return ( <li key={i}>{ JSON.stringify(v) }</li> );
          }
          return renderListItem(v, i);
        })}
      </ul>
    </Catcher>
  );
};
const fixUnknowns = value => {
  if (value === null || value === undefined) { return '' }
  return value;
};
const xData = data => {
  if (Array.isArray(data)) {
    return data.map(({value, name}) => fixUnknowns(value || name));
  }
  return fixUnknowns(data);
};
const transposeData = data => {
  const heads = Object.keys(data[0]);
  return data.reduce((t, c) => {
    heads.forEach((head, h) => {
      t[h] = [...t[h], xData(c[head])];
    });
    return t;
  }, heads.map(head => ([head])));
};
const renderDataColumn = (col, c) => {
  let value = col;
  if (col instanceof Object) {
    value = Array.isArray(col) ? renderList(col) : (col.raw || col.name || col.toString());
  }
  return (
    <Catcher key={c}><td>{ value }</td></Catcher>
  );
};
const renderColumn = (col, c) => {
  if (c) {
    return renderDataColumn(col, c);
  }
  return (<Catcher key={c}><th>{ col }</th></Catcher>);
};
const renderTable = value => {
  if (!Array.isArray(value)) { return renderTable([value]) }
  if (value.length) {
    return (
      <table>
        <tbody>
          {
            transposeData(value).map((row, r) => (
              <tr key={r}>
                {
                  row.map(renderColumn)
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
  return value; // string?
};

const sortData = data => [...data].sort((a, b) => {
  if (a.required === b.required) {
    return a.name
      ? a.name.localeCompare(b.name)
      : a.description
        ? a.description.localeCompare(b.description)
        : a.value.localeCompare(b.value);
  }
  if (a.required) { return -1 }
  return 1;
});

const renderHeaderRow = columns => (
  <thead>
    <tr>
      {
        columns.map((column, c) => (
          <Catcher key={c}>
            <th className={ column.type || '' }>
              { column.name || column }
            </th>
          </Catcher>
        ))
      }
    </tr>
  </thead>
);
const renderTableColumn = (column, value) => (
  <td key={ column.name || column } className={ column.type || '' }>
    <Catcher>{ renderForColumn(column, value) }</Catcher>
  </td>
);
/* eslint-disable react/display-name */
const renderTableRow = columns => (row, r) => (
  <tr key={r}>
    {
      columns.map(
        column => renderTableColumn(
          column,
          fixUnknowns(row[(column.name || column)])
        )
      )
    }
  </tr>
);
/* eslint-enable react/display-name */

export default class Table extends PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    columns: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired
        })
      ])
    ).isRequired,
    full: PropTypes.bool,
  };

  static defaultProps = {
    full: false,
  };

  render () {
    const { props: { data, columns, full }} = this;

    if (!data) { return null }

    const rows = sortData(data);

    const row = renderTableRow(columns);

    const width = full ? { width: '100%' } : {};

    return (
      <table {...width}>
        { renderHeaderRow(columns) }
        <tbody>
          {
            rows.length ? rows.map(row) : (
              <tr>
                <td colSpan={columns.length} className='empty-table-state'>
                  no data available
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    );
  }
}
