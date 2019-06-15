import React, {
  Fragment,
  createContext,
  FunctionComponent,
  useContext,
  useState
} from 'react';

interface SharedData {
  data?: Array<any> | object,
}
interface SharedRowCellProps extends SharedData {
  isHeader?: boolean
}
interface CellProps extends SharedRowCellProps {
  column: string | number
}
interface RowProps extends SharedRowCellProps {}
interface CollapseRowProps extends SharedData {
  rowAttrs?: Function,
  cellAttrs?: Function,
  content?: Function,
}
interface TableProps extends CollapseRowProps {
  data: Array<any[] | object>,
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

const Cell: FunctionComponent<CellProps> = ({
  isHeader = false, column = '', data = {}
}) => {
  const TagName = `t${(isHeader && 'h') || 'd'}`;
  const {
    content = (d: object, c: string, h: boolean) => h ? c : d[c],
    cellAttrs
  } = useContext(TableContext);
  const attributes = mergeProps({}, (!isHeader && cellAttrs && cellAttrs(data, column)) || {});
  const value = content(data, column, isHeader);

  return (
    <TagName {...attributes} >
      { value }
    </TagName>
  );
};

const CollapsingRow: FunctionComponent<CollapseRowProps> = ({
  data = {}
}) => {
  const [ collapsed, setCollapsed ] = useState(false);
  const {
    columns,
    collapse: { content, rowAttrs, cellAttrs }
  } = useContext(TableContext);
  const rowAttributes = mergeProps({ className: 'collapsable' }, (rowAttrs && rowAttrs(data)) || {});
  const cellAttributes = mergeProps({ className: 'collapsable-content' }, (cellAttrs && cellAttrs(data)) || {});

  return (
    <tr {...rowAttributes} >
      <td {...cellAttributes} colspan={columns.length}>
        { (content && content(data)) || null }
      </td>
    </tr>
  );
};
const Row: FunctionComponent<RowProps> = ({
  isHeader = false, data = {}
}) => {
  const [ collapsed, setCollapsed ] = useState(false);
  const {
    columns,
    rowAttrs,
    collapse
  } = useContext(TableContext);
  const attributes = mergeProps({}, (!isHeader && rowAttrs && rowAttrs(data)) || {});

  return (
    <Fragment>
      <tr {...attributes} >
        { columns.map(column => (<Cell key={column} {...{ isHeader, data, column }} />)) }
      </tr>
      {
        !isHeader && collapse && !collapsed
          ? (
            <CollapsingRow {...{ data }} />
          )
          : null
      }
    </Fragment>
  );
};

/**
 * A component for tables
 */
const Table: FunctionComponent<TableProps> = ({
  data, columns, rowAttrs, cellAttrs, content, collapse
}) => {
  return (
    <TableContext.Provider value={{ data, columns, rowAttrs, cellAttrs, content, collapse }}>
      <table>
        <thead>
          <Row isHeader />
        </thead>
        <tbody>
          {
            data.map((data, v) => (
              <Row key={v} {...{ data }}/>
            ))
          }
        </tbody>
      </table>
    </TableContext.Provider>
  );
};

export default Table;
