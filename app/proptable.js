import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Table from './table';

export default class PropTable extends PureComponent {
  static propTypes = {
    props: PropTypes.object,
  }
  render () {
    const { props: { props }} = this;

    if (!props) { return null; }
    
    return (
        <section className='propTable'>
          <h3>Props</h3>
          <Table {...{columns: [
            { name: 'required', type: 'bool' },
            'name', 'type', 'defaultValue', 'description'
          ], props}} />
        </section>
      );
  }
}
