/* eslint-disable react/display-name */
import React from 'react';
import ProgressBar from 'components/ProgressBar/ProgressBar';
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

const mocks = Array(105).fill(0).map((v,i) => i / 100);

export default () => {
  return (
    <ID>
      <StateDecorator values={colors} delay={2500} component={barColor => (
        <StateDecorator values={mocks} delay={250} component={value => (
          <ProgressBar {...{barColor, value, text: 'ProgressBar'}} />
        )} />
      )} />
      <StateDecorator values={colors} delay={2500} component={barColor => (
        <StateDecorator values={mocks} delay={250} component={value => (
          <ProgressBar {...{barColor, value, text: 'ProgressBar'}}>
            Status Text
          </ProgressBar>
        )} />
      )} />
    </ID>
  );
};
