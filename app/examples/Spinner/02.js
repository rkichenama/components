import React from 'react';
import { Stage } from '../';
import Spinner from 'components/Spinner/Spinner';

const Dummy = props => (
  <pre style={{ minHeight: '44px', backgroundColor: 'rgba(0, 0, 0, 0.6)', color: 'white' }}>
    { JSON.stringify(props, null, 2) }
  </pre>
);

export default class extends React.PureComponent {
  render () {
    return (
      <Stage style={{ flexBasis: '80%' }}>
        <div style={{ width: '100%' }}>
          <Spinner
            test={() => false} {...{ hide: false }} for={Dummy}
            ironman='tony stark' thor='odinson'
          />
        </div>
      </Stage>
    );
  }
}
