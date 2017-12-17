import React from 'react';
import Stage from '../stage';
import ClickDecorator from 'components/ClickDecorator/ClickDecorator';

export default class extends React.PureComponent {
  render () {
    return (
      <Stage>
        <ClickDecorator values={'This ain\'t a scene it\'s an arms race'.split(' ')} component={value => (
          <button className='btn'>{ value }</button>
        )} />
      </Stage>
    );
  }
}
