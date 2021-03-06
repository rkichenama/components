import React from 'react';
import { Stage } from '../';
import Info from 'components/Info/Info';

const Title = () => ([
  <div key={0}>An</div>,
  <div key={1}>Array</div>,
  <div key={2}>Title</div>,
]);

export default class extends React.Component {
  render () {
    return (
      <Stage style={{ flexBasis: '80%' }}>
        <div style={{ width: '100%' }}>
          <Info title={<Title />}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mi urna, ornare id magna non, luctus volutpat turpis. Nam nec congue justo. Nullam risus ipsum, ornare at semper vitae, ullamcorper a diam. Fusce sit amet sagittis odio, pulvinar egestas orci. Proin tristique posuere felis nec bibendum. Cras velit tellus, auctor sed posuere non, convallis ac justo. Integer sed ullamcorper ex. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus erat id risus congue vestibulum.</p>
          </Info>
        </div>
      </Stage>
    );
  }
}
