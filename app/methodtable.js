import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Table from './table';

export default class MethodTable extends PureComponent {
  static propTypes = {
    methods: PropTypes.array,
  }
  render () {
    const { props: { methods }} = this;

    if (!methods) { return null; }

    const props = methods.reduce((fns, {name, ...method}) => ({
      ...fns, [name]: method
    }), {});
    
    return (
        <section className='propTable'>
          <h3>Methods</h3>
          <Table {...{columns: [
            'name', 'docblock', /* 'modifiers',*/ 'params', 'returns',
          ], props}} />
        </section>
      );
  }
}
