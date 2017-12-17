import React from 'react';
import StateDecorator from 'components/StateDecorator/StateDecorator';
import Stage from '../stage';
import RandomUsers from '../randomUsers';
import Card from 'components/Card/Card';

const centered = {
  display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'
}
export default class extends React.Component {
  render () {
    return (
      <Stage>
        <RandomUsers count={20} component={users => users.reduce(
          (t, c, i) => {
            if (i % 2) { t[t.length - 1].push(c) }
            else { t.push([c]) }
            return t;
          }, []
        ).map(results => (
          <StateDecorator values={[false, true]} delay={2500} component={flipped => (
            <Card flipped={flipped}>
              {
                results.map(({ name, picture }, u) => (
                  <div key={u} style={centered}>
                    <img src={picture.large} style={{ maxWidth: '100%' }} title={`${name.first} ${name.last}`} />
                  </div>
                ))
              }
            </Card>
          )} />
        ))} />
      </Stage>
    );
  }
}
