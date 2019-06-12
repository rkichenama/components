import React, { createContext, FunctionComponent, useState, useEffect, useContext } from 'react';

interface SharedRowCellProps {
  data: Array<any> | object,
  isHeader?: boolean
}
interface CellProps extends SharedRowCellProps {
  column: string | number,
}
interface RowProps {
}
interface TableProps {
  data: Array<any[] | object>,
  columns: Array<string | number>,
  rowAttrs?: Function,
  content: (row: Array<any> | object, column: string | number, isHeader: boolean) => React.Node
}

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
  const attributes = (!isHeader && cellAttrs && cellAttrs(data, column)) || {};
  const value = content(data, column, isHeader);

  return (
    <TagName {...attributes} >
      { value }
    </TagName>
  );
};

const Row: FunctionComponent<RowProps> = ({
  isHeader = false, data = {}
}) => {
  const {
    columns,
    rowAttrs
  } = useContext(TableContext);
  const attributes = (!isHeader && rowAttrs && rowAttrs(data)) || {};

  return (
    <tr {...attributes} >
      { columns.map(column => (<Cell key={column} {...{ isHeader, data, column }} />)) }
    </tr>
  );
};

const Table: FunctionComponent<TableProps> = ({
  data, columns, rowAttrs, cellAttrs, content
}) => {
  return (
    <TableContext.Provider value={{ data, columns, rowAttrs, cellAttrs, content }}>
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
