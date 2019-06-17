import React from 'react';
import { Stage } from '../';
import Table from 'components/Table/Table';

const data = [
	{ "name": "Aaron", "phone": "16190918 7252", "uuid": "34A616A2-D7C5-734C-3337-9C55DEF35E1B" },
	{ "name": "Chandler", "phone": "16060307 0723", "uuid": "41BBD44F-3BBA-B47D-52C4-BEA4A64B4A76" },
];
const columns = [ 'name', 'phone' ];
const rowAttrs = data => ({ 'data-uuid': data.uuid });
const cellAttrs = (data, column) => ({ [`data-${column}`]: data[column] });
const content = (row, column, isHeader) => (isHeader ? column : `${column} = "${row[column]}"`);
const collapse = {
  rowAttrs,
  content (data) {
    return Array(3).fill(false).map((_, i) => (<p key={i}>{data.uuid}</p>))
  },
  cellAttrs (data) { return {'data-expando': data.name } }
};
const className = 'data-table';
const id ='demo-table';
const style = { fontSize: '0.8em' };


export default class UnstyledTable extends React.Component {
  render () {
    return (
      <Stage style={{ flexBasis: '80%' }}>
        <div style={{ width: '100%' }}>
          <Table {...{ data, columns, rowAttrs, cellAttrs, content, collapse, id, className, style }} />
        </div>
      </Stage>
    );
  }
}
