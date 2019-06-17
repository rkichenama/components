import * as React from 'react';
import * as PropTypes from 'prop-types';
const {
  Fragment,
  createContext,
  useContext,
  useState
} = React;

import './Table.scss';

interface BasicProps {
  className?: string,
  style?: object,
  id?: string
}
interface SharedData extends BasicProps {
  data?: Array<any> | object,
}
interface SharedRowCellProps extends SharedData {
  isHeader?: boolean
}
interface CellProps extends SharedRowCellProps {
  column: string | number
}
interface RowProps extends SharedRowCellProps {
  isEven?: boolean
}
interface CollapseRowProps extends SharedData {
  rowAttrs?: Function,
  cellAttrs?: Function,
  content?: Function,
}
interface TableProps extends BasicProps, CollapseRowProps {
  /** the actual data displayed in the table */
  data: Array<object>,
  columns: Array<string | number>,
  collapse?: CollapseRowProps
}

const mergeProps: Function = (base, ...props) => {
  return props.reduce((t, c) => {
    Object.entries(c)
      .forEach(([ k, v]) => {
        if ([ 'className' ].includes(k) && /string/.test(typeof k)) {
          t[k] = [t[k], v].filter(i => !!i).join(' ');
        } else {
          t[k] = v;
        }
      });
    return t;
  }, base);
};

const TableContext = createContext({
  data: null,
  columns: null,
  rowAttrs: null,
  cellAttrs: null,
  content: null
} as TableProps);

const Cell: React.StatelessComponent<CellProps> = ({ isHeader, column, data }) => {
  const TagName = `t${(isHeader && 'h') || 'd'}`;
  const {
    content = (d: object, c: string, h: boolean) => h ? c : d[c],
    cellAttrs
  } = useContext(TableContext);
  const className = 'table-cell';
  const attributes = mergeProps({ className }, (!isHeader && cellAttrs && cellAttrs(data, column)) || {});
  const value = content(data, column, isHeader);

  return (
    <TagName {...attributes} >
      { value }
    </TagName>
  );
};
Cell.defaultProps = {
  isHeader: false,
  data: {},
  column: ''
};

const CollapsingRow: React.StatelessComponent<CollapseRowProps> = ({ data, className: bandable }) => {
  const {
    columns,
    collapse: { content, rowAttrs, cellAttrs }
  } = useContext(TableContext);
  const className = 'collapsable'
  const rowAttributes = mergeProps({ className: `${bandable} ${className}` }, (rowAttrs && rowAttrs(data)) || {});
  const cellAttributes = mergeProps({ className: `${className}-content` }, (cellAttrs && cellAttrs(data)) || {});

  return (
    <tr {...rowAttributes} >
      <td colSpan={columns.length}>
        <section {...cellAttributes}>
          { (content && content(data)) || null }
        </section>
      </td>
    </tr>
  );
};
CollapsingRow.defaultProps = {
  data: {}
};
const Row: React.StatelessComponent<RowProps> = ({ isHeader, data, isEven }) => {
  const [ collapsed, setCollapsed ] = useState(true);
  const onClick = () => { setCollapsed(!collapsed) };
  const className = `table-row${isEven ? ' banded' : ''}`;
  const {
    columns,
    rowAttrs,
    collapse
  } = useContext(TableContext);
  const attributes = mergeProps({ className, onClick }, (!isHeader && rowAttrs && rowAttrs(data)) || {});

  return (
    <Fragment>
      <tr {...attributes} >
        { columns.map(column => (<Cell key={column} {...{ isHeader, data, column }} />)) }
      </tr>
      {
        !isHeader && collapse && !collapsed
          ? (
            <CollapsingRow {...{ data, className }} />
          )
          : null
      }
    </Fragment>
  );
};
Row.defaultProps = {
  isHeader: false,
  data: {},
  isEven: false
};

const Table: React.StatelessComponent<TableProps> = ({
  data, columns, rowAttrs, cellAttrs, content, collapse,
  id, className, style
}) => {
  const attributes = mergeProps({ className: 'table-element' }, { id, className, style });
  return (
    <TableContext.Provider value={{ data, columns, rowAttrs, cellAttrs, content, collapse }}>
      <table {...attributes} >
        <thead>
          <Row isHeader />
        </thead>
        <tbody>
          {
            data.map((data, v) => (
              <Row key={v} {...{ data, isEven: !!(v % 2) }}/>
            ))
          }
        </tbody>
      </table>
    </TableContext.Provider>
  );
};
Table.defaultProps = {
  data: [],
  columns: [],
  rowAttrs: () => ({}),
  cellAttrs: () => ({}),
  content: (d: object, c: string, h: boolean) => h ? c : d[c]
};

export default Table;
