import React from 'react';
import StateDecorator from 'components/StateDecorator/StateDecorator';
import { Stage } from '../';
import { RandomUsers } from '../';
import Cube from 'components/Cube/Cube';

const centered = {
  display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'
}
export default class extends React.Component {
  render () {
    return (
      <Stage>
        <RandomUsers count={60} component={users => users.reduce(
          (t, c, i) => {
            if (i % 6) { t[t.length - 1].push(c) }
            else { t.push([c]) }
            return t;
          }, []
        ).map((results, r) => (
          <StateDecorator key={r} values={['front', 'back', 'left', 'right', 'top', 'bottom']} delay={2500} component={face => (
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
        ))} />
      </Stage>
    );
  }
}
