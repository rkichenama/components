import React from 'react';
import { Stage } from '../';
import Table from 'components/Table/Table.tsx';

const data = [
	{ "name": "Aaron", "phone": "16190918 7252", "uuid": "34A616A2-D7C5-734C-3337-9C55DEF35E1B" },
	{ "name": "Chandler", "phone": "16060307 0723", "uuid": "41BBD44F-3BBA-B47D-52C4-BEA4A64B4A76" },
	{ "name": "Jamal", "phone": "16550719 2838", "uuid": "72A1EBE5-1CF8-73DF-FF06-885CD0AB0A20" },
	{ "name": "Jemima", "phone": "16580801 8450", "uuid": "F1EBA483-AE03-8B43-E36F-4A39BDBFFD2D" },
	// { "name": "Joseph", "phone": "16610423 2803", "uuid": "4CC422A7-62A6-A144-7D25-BC1F97E5932A" },
	// { "name": "Mona", "phone": "16110528 5058", "uuid": "C178CDB5-1E36-4091-4BA0-00FE31D7ED9D" },
	// { "name": "Owen", "phone": "16950719 6872", "uuid": "A0281EFF-A116-0392-EB28-23DCCEA6219F" },
	// { "name": "Russell", "phone": "16810121 9213", "uuid": "DB182B7F-E922-88F9-F9A4-50B9BA67596D" },
  // { "name": "Abigail", "phone": "16490708 8001", "uuid": "87521109-DEC2-BBE7-E8EB-BF1BC1455D19" },
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


export default class extends React.Component {
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
