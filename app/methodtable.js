import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Table from './table';

export default class MethodTable extends PureComponent {
  static propTypes = {
    methods: PropTypes.array,
  }
  render () {
    const { props: { methods: data }} = this;

    if (!data) { return null; }

    return (
        <section className='propTable'>
          <h3>Methods</h3>
          <Table {...{columns: [
            'name', /* 'modifiers',*/ {
              name: 'params', type: 'table'
            },
            {
              name: 'returns', type: 'table'
            }, 'docblock',
          ], data}} />
        </section>
      );
  }
}
