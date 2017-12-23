import React from 'react';
import { Stage } from '../';
import StateDecorator from 'components/StateDecorator/StateDecorator';

export default class extends React.PureComponent {
  render () {
    return (
      <Stage>
        <StateDecorator delay={1250} values={'This ain\'t a scene it\'s an arms race'.split(' ')} component={value => (
          <div>{ value }</div>
        )} />
      </Stage>
    );
  }
}
