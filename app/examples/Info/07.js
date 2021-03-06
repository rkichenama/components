/* eslint-disable react/display-name */
import React, { PureComponent } from 'react';
import { Knobs } from '../';
import Info from 'components/Info/Info';

export default class extends PureComponent {
  state = {
  }

  render () {
    return (
      <Knobs style={{ minHeight: '200px' }} name='Info'>
        <Info title={`titled`} open>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mi urna, ornare id magna non, luctus volutpat turpis. Nam nec congue justo. Nullam risus ipsum, ornare at semper vitae, ullamcorper a diam. Fusce sit amet sagittis odio, pulvinar egestas orci. Proin tristique posuere felis nec bibendum. Cras velit tellus, auctor sed posuere non, convallis ac justo. Integer sed ullamcorper ex. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus erat id risus congue vestibulum.</p>
        </Info>
      </Knobs>
    );
  }
}
/* eslint-enable react/display-name */
