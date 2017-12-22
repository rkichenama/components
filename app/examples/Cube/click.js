import React from 'react';
import ClickDecorator from 'components/ClickDecorator/ClickDecorator';
import { Stage } from '../';
import { RandomUsers } from '../';
import Cube from 'components/Cube/Cube';

const centered = {
  display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'
};
export default class extends React.Component {
  render () {
    return (
      <Stage>
        <RandomUsers count={6} component={results => (
          <ClickDecorator values={['front', 'back', 'left', 'right', 'top', 'bottom']} component={face => (
            <Cube face={face}>
              {
                results.map(({ name, picture }, u) => (
                  <div key={u} style={centered}>
                    <img src={picture.large} style={{ maxWidth: '100%' }} title={`${name.first} ${name.last}`} />
                  </div>
                ))
              }
            </Cube>
          )} />
        )} />
      </Stage>
    );
  }
}
