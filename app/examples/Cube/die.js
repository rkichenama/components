import React, { Component, Children } from 'react';
import StateDecorator from 'components/StateDecorator/StateDecorator';
import { Stage } from '../';
import Cube from 'components/Cube/Cube';

import './die.scss';

const faces = ['front', 'back', 'left', 'right', 'top', 'bottom'];
const Dots = (n => {
  const dots = [];
  for (let i = 0; i < n; i++)
    dots[i] = (
      <div className='dot' key={i} />
    );
  return dots;
})(9);

const Die = ({ className, value }) => (
  <div className={`die`} value={`${value}`}>
    { Dots }
  </div>
);

export default class extends React.Component {
  render () {
    return (
      <Stage className='Die' style={{ height: '200px' }}>
        <StateDecorator seq={false} values={faces} delay={1250} component={face => (
          <Cube face={face}>
            {
              faces.map((_, u) => (
                <Die key={u} value={u + 1} />
              ))
            }
          </Cube>
        )} />
      </Stage>
    );
  }
}
