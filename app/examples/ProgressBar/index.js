import React from 'react';
import ProgressBar from 'components/ProgressBar/ProgressBar.jsx';
import StateDecorator from 'components/StateDecorator/StateDecorator';


export default class PBExample extends React.PureComponent {
  render () {
    return (
      <div>
        <div>
          <StateDecorator values={['black', 'orange', 'gray']} delay={2500} component={barColor => (
            <StateDecorator values={Array(10).fill(0).map((v,i) => i / 10)} delay={250} component={value => (
              <ProgressBar {...{barColor, value}} />
            )} />
          )} />
        </div>
        <div className='has-success'>
          <StateDecorator values={['black', 'orange', 'gray']} delay={2500} component={barColor => (
            <StateDecorator values={Array(10).fill(0).map((v,i) => i / 10)} delay={250} component={value => (
              <ProgressBar {...{barColor, value}}>
                <p>Success</p>
              </ProgressBar>
            )} />
          )} />
        </div>
        <div className='has-info'>
          <StateDecorator values={['black', 'orange', 'gray']} delay={2500} component={barColor => (
            <StateDecorator values={Array(10).fill(0).map((v,i) => i / 10)} delay={250} component={value => (
              <ProgressBar {...{barColor, value}}>
                <p>Info</p>
              </ProgressBar>
            )} />
          )} />
        </div>
        <div className='has-warning'>
          <StateDecorator values={['black', 'orange', 'gray']} delay={2500} component={barColor => (
            <StateDecorator values={Array(10).fill(0).map((v,i) => i / 10)} delay={250} component={value => (
              <ProgressBar {...{barColor, value}}>
                <p>Warning</p>
              </ProgressBar>
            )} />
          )} />
        </div>
        <div className='has-error'>
          <StateDecorator values={['black', 'orange', 'gray']} delay={2500} component={barColor => (
            <StateDecorator values={Array(10).fill(0).map((v,i) => i / 10)} delay={250} component={value => (
              <ProgressBar {...{barColor, value}}>
                <p>Error</p>
              </ProgressBar>
            )} />
          )} />
        </div>
      </div>
    );
  }
}
