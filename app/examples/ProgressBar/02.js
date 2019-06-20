/* eslint-disable react/display-name */
import React from 'react';
import ProgressBar from 'components/ProgressBar/ProgressBar';
import StateDecorator from 'components/StateDecorator/StateDecorator';

import ID from '../../children';

const colors = [
  ['red','orange','yellow'],
  ['orange','yellow','green'],
  ['yellow','green','cyan'],
  ['green','cyan','blue'],
  ['cyan','blue','purple'],
  ['blue','purple','red'],
  ['purple','red','orange'],
];


const mocks = Array(105).fill(0).map((v,i) => Array(3).fill(i / 100));

export default () => {
  return (
    <ID>
      <StateDecorator values={colors} delay={2500} component={barColor => (
        <StateDecorator values={mocks} delay={250} component={value => (
          <ProgressBar {...{barColor, value, text: ['ProgressBar', 'ProgressBar', 'ProgressBar']}} />
        )} />
      )} />
      <StateDecorator values={colors} delay={2500} component={barColor => (
        <StateDecorator values={mocks} delay={250} component={value => (
          <ProgressBar {...{barColor, value, text: ['ProgressBar']}} />
        )} />
      )} />
      <StateDecorator values={colors} delay={2500} component={barColor => (
        <StateDecorator values={mocks} delay={250} component={value => (
          <ProgressBar {...{barColor, value, text: [undefined, 'ProgressBar']}}>
            Status Text
          </ProgressBar>
        )} />
      )} />
      <StateDecorator values={colors} delay={2500} component={barColor => (
        <StateDecorator values={mocks} delay={250} component={value => (
          <ProgressBar {...{barColor, value, text: [undefined, undefined, 'ProgressBar']}}>
            Status Text
          </ProgressBar>
        )} />
      )} />
    </ID>
  );
};
