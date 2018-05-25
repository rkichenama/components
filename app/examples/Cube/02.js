/* eslint-disable react/display-name */
import React, { PureComponent } from 'react';
import { Knobs } from '../';
import Cube from 'components/Cube/Cube';

const faces = ['front', 'back', 'left', 'right', 'top', 'bottom'];

export default class extends PureComponent {
  render () {
    return (
      <Knobs name='Cube'>
        <Cube>
          {
            faces.map((face, u) => (
              <div key={u} style={{ color: 'black' }}>{face}</div>
            ))
          }
        </Cube>
      </Knobs>
    );
  }
}
/* eslint-enable react/display-name */
