import * as React from 'react';
import { mount } from 'enzyme';
import Table from './Table';

describe('Table', () => {
  const defaultProps = {
    data: [
      { "name": "Aaron", "phone": "16190918 7252", "uuid": "34A616A2-D7C5-734C-3337-9C55DEF35E1B" },
      { "name": "Chandler", "phone": "16060307 0723", "uuid": "41BBD44F-3BBA-B47D-52C4-BEA4A64B4A76" },
      { "name": "Jamal", "phone": "16550719 2838", "uuid": "72A1EBE5-1CF8-73DF-FF06-885CD0AB0A20" },
      { "name": "Jemima", "phone": "16580801 8450", "uuid": "F1EBA483-AE03-8B43-E36F-4A39BDBFFD2D" },
      { "name": "Joseph", "phone": "16610423 2803", "uuid": "4CC422A7-62A6-A144-7D25-BC1F97E5932A" },
      { "name": "Mona", "phone": "16110528 5058", "uuid": "C178CDB5-1E36-4091-4BA0-00FE31D7ED9D" },
      { "name": "Owen", "phone": "16950719 6872", "uuid": "A0281EFF-A116-0392-EB28-23DCCEA6219F" },
      { "name": "Russell", "phone": "16810121 9213", "uuid": "DB182B7F-E922-88F9-F9A4-50B9BA67596D" },
      { "name": "Abigail", "phone": "16490708 8001", "uuid": "87521109-DEC2-BBE7-E8EB-BF1BC1455D19" },
    ],
    columns: [ 'name', 'phone' ]
  };

  const render = (props = {}) => mount(
    <Table {...defaultProps} {...props} />
  );

  describe('renders a table', () => {
    const wrapper = render();

    it('has headings', () => {
      const headings = wrapper.find('th');
      defaultProps.columns
        .forEach((name, c) => {
          expect(headings.at(c).text()).toBe(defaultProps.columns[c])
        });
    });

    it('has rows for the data', () => {
      const rows = wrapper.find('tbody .table-row');
      defaultProps.data
        .forEach((data, r) => {
          const row = rows.at(r);
          expect(row.find('td')).toHaveLength(defaultProps.columns.length);
          expect(row.text()).toBe(defaultProps.columns.reduce((t, c) => `${t}${data[c]}`, ''));
        });
    });
  });
});
