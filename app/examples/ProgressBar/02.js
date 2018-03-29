import React from 'react';
import ProgressBar from 'components/ProgressBar/ProgressBar.jsx';
import StateDecorator from 'components/StateDecorator/StateDecorator';

import ID from '../../children';

const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'cyan',
  'blue',
  'purple',
];

const mocks = Array(105).fill(0).map((v,i) => Array(3).fill(i / 100));

export default class extends React.PureComponent {
  render () {
    return (
      <ID>
        <StateDecorator values={colors} delay={2500} component={barColor => (
          <StateDecorator values={mocks} delay={250} component={value => (
            <ProgressBar {...{barColor, value}} />
          )} />
        )} />
        <StateDecorator values={colors} delay={2500} component={barColor => (
          <StateDecorator values={mocks} delay={250} component={value => (
            <ProgressBar {...{barColor, value}}>
              Status Text
            </ProgressBar>
          )} />
        )} />
      </ID>
    );
  }
}
