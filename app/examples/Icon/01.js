import React from 'react';
import StateDecorator from 'components/StateDecorator/StateDecorator';
import Icon from 'components/Icon/Icon.jsx';

const svgs = require.context('../../../src/Icon/svg/', false, /^\.\/.*\.svg/)
  .keys().map(k => /\/([\s\S]*?)\./.exec(k)[1]);

const values = ['inherit', 'cyan', 'magenta', 'yellow', 'gray'];
const delay = 2500;

export default class Example extends React.PureComponent {
  render () {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        margin: 'auto',
        width: '80%'
      }}>
        {
          svgs.map(name => (
            <StateDecorator
              key={name}
              {...{ values, delay }}
              component={color => (
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color }}>
                  <section style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '100%' }}>
                    <Icon style={{ width: '0.5em', height: '1.0em' }} {...{ name }}/>
                    <Icon style={{ width: '1.0em', height: '1.0em' }} {...{ name }}/>
                    <Icon style={{ width: '1.5em', height: '1.5em' }} {...{ name }}/>
                    <Icon style={{ width: '2.0em', height: '2.0em' }} {...{ name }}/>
                    <Icon style={{ width: '2.5em', height: '2.0em' }} {...{ name }}/>
                  </section>
                  <section>{ name }</section>
                </div>
              )}
            />
          ))
        }
      </div>
    );
  }
}
