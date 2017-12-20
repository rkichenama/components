import React from 'react';
import Stage from '../stage';
import Info from 'components/Info/Info';

export default class extends React.Component {
  render () {
    return (
      <Stage style={{ flexBasis: '80%' }}>
        <div style={{ width: '100%' }}>
          <Info open>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mi urna, ornare id magna non, luctus volutpat turpis. Nam nec congue justo. Nullam risus ipsum, ornare at semper vitae, ullamcorper a diam. Fusce sit amet sagittis odio, pulvinar egestas orci. Proin tristique posuere felis nec bibendum. Cras velit tellus, auctor sed posuere non, convallis ac justo. Integer sed ullamcorper ex. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus erat id risus congue vestibulum.</p>
          </Info>
        </div>
      </Stage>
    );
  }
}
