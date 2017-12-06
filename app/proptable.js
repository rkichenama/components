import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Table from './table';

export default class PropTable extends PureComponent {
  static propTypes = {
    props: PropTypes.array,
  }
  render () {
    const { props: { props: data }} = this;

    if (!data) { return null; }
    
    return (
      <section>
        <h3>Props</h3>
        <Table {...{columns: [
          { name: 'required', type: 'bool' },
          'name', 'type', 'defaultValue', 'description'
        ], data}} />
      </section>
    );
  }
}
