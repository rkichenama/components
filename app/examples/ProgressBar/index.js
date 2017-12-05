import React from 'react';
import ProgressBar from 'components/ProgressBar/ProgressBar.jsx';
import StateDecorator from 'components/StateDecorator/StateDecorator';

// const PB = StateDecorator(
//   'barColor',
//   ['black', 'white', 'gray'],
//   2500
// )(StateDecorator(
//   'value',
//   Array(10).fill(0).map((v,i) => i / 10),
//   250
// )(ProgressBar));



export default class PBExample extends React.PureComponent {
  render () {
    return (
      <div>
        <div>
          <StateDecorator values={['black', 'white', 'gray']} delay={2500} component={barColor => (
            <StateDecorator values={Array(10).fill(0).map((v,i) => i / 10)} delay={250} component={value => (
              <ProgressBar {...{barColor, value}} />
            )} />
          )} />
        </div>
        <div>
          <StateDecorator values={['black', 'white', 'gray']} delay={2500} component={barColor => (
            <StateDecorator values={Array(10).fill(0).map((v,i) => i / 10)} delay={250} component={value => (
              <ProgressBar {...{barColor, value}}>
                <p style={{ fontSize: '8px' }}>Status</p>
              </ProgressBar>
            )} />
          )} />
        </div>
        <div className='has-success'>
          <StateDecorator values={['black', 'white', 'gray']} delay={2500} component={barColor => (
            <StateDecorator values={Array(10).fill(0).map((v,i) => i / 10)} delay={250} component={value => (
              <ProgressBar {...{barColor, value}}>
                <p style={{ fontSize: '8px' }}>Success</p>
              </ProgressBar>
            )} />
          )} />
        </div>
        <div className='has-info'>
          <StateDecorator values={['black', 'white', 'gray']} delay={2500} component={barColor => (
            <StateDecorator values={Array(10).fill(0).map((v,i) => i / 10)} delay={250} component={value => (
              <ProgressBar {...{barColor, value}}>
                <p style={{ fontSize: '8px' }}>Info</p>
              </ProgressBar>
            )} />
          )} />
        </div>
        <div className='has-warning'>
          <StateDecorator values={['black', 'white', 'gray']} delay={2500} component={barColor => (
            <StateDecorator values={Array(10).fill(0).map((v,i) => i / 10)} delay={250} component={value => (
              <ProgressBar {...{barColor, value}}>
                <p style={{ fontSize: '8px' }}>Warning</p>
              </ProgressBar>
            )} />
          )} />
        </div>
        <div className='has-error'>
          <StateDecorator values={['black', 'white', 'gray']} delay={2500} component={barColor => (
            <StateDecorator values={Array(10).fill(0).map((v,i) => i / 10)} delay={250} component={value => (
              <ProgressBar {...{barColor, value}}>
                <p style={{ fontSize: '8px' }}>Error</p>
              </ProgressBar>
            )} />
          )} />
        </div>
      </div>
    );
  }
}
