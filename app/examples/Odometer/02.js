import React from 'react';
import { Stage } from '../';

import Odometer from 'components/Odometer/Odometer.jsx';

export default class extends React.PureComponent {
  state = {
    value: 0
  }

  componentDidMount () {
    setInterval(() => this.setState(({ value }) =>
      ({ value: Math.ceil(Math.random() * 9999999) })), 1000);
  }

  render () {
    return (
      <Stage style={{ flexBasis: '80%', '--glyph': '96px' }}>
        <Odometer size={96} value={this.state.value}/>
      </Stage>
    );
  }
}
