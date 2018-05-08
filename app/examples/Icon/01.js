import React from 'react';
import { Stage } from '../';
import Icon from 'components/Icon/Icon.jsx';

const svgs = require.context('../../../src/Icon/svg/', false, /^\.\/.*\.svg/)
  .keys().map(k => /\/([\s\S]*?)\./.exec(k)[1]);

export default class extends React.PureComponent {
  render () {
    return (
      <Stage>
        {
          svgs.map(name => (
            <div key={name} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Icon style={{ width: '1.0em', height: '1.0em' }} {...{ name }}/>
                <Icon style={{ width: '1.5em', height: '1.5em' }} {...{ name }}/>
                <Icon style={{ width: '2.0em', height: '2.0em' }} {...{ name }}/>
              </section>
              <section>{ name }</section>
            </div>
          ))
        }
      </Stage>
    );
  }
}
