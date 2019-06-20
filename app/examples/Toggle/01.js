import React from 'react';
import { Stage } from '../';
import Toggle from 'components/Toggle/Toggle';

export default class extends React.PureComponent {
  state = {
    value: false
  };

  render () {
    return (
      <Stage style={{ flexBasis: '80%' }}>
        <div style={{ flex: '0', flexBasis: '32px' }}>
          <Toggle label='' value={ this.state.value } onValueChange={ value => this.setState({ value }) } />
        </div>
        <div style={{ flex: '1' }}>
          &nbsp;&nbsp;Wax { this.state.value ? 'on' : 'off' }
        </div>
      </Stage>
    );
  }
}
