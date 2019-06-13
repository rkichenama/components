import React from 'react';
import ClickDecorator from 'components/ClickDecorator/ClickDecorator';
import { Stage } from '../';
import { RandomUsers } from '../';
import Card from 'components/Card/Card';

const centered = {
  display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'
};
export default class extends React.Component {
  render () {
    return (
      <Stage>
        <RandomUsers count={2} component={results => (
          <ClickDecorator values={[false, true]} component={flipped => (
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
        )} />
      </Stage>
    );
  }
}
