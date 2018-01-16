import React, { Component } from 'react';
import '../global.scss';
import Punchcard from './Punchcard';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

const randoms = [];
const Randomize = () => {
  const randoms = [];
  for(let d = 0; d < 24; d++) {
    for(let w = 0; w < 7; w++) {
      !randoms[w] && (randoms[w] = []);
      randoms[w][d] = Math.random() > .45 ? true : false;
    }
  }
  return randoms;
};

class Container extends Component {
  constructor () {
    super();
    this.state = {
      active: Randomize(),
      interval: false
    };
  }
  componentDidMount () {
    this.setState({
      interval: setInterval(() => {
        this.setState({active: Randomize()}, () => {
          action('updated actives')();
        });
      }, 2500)
    })
  }
  componentWillUnmount () {
    this.state.interval && clearInterval(this.state.interval);
  }
  render () {
    return (
      <Punchcard active={this.state.active} />
    );
  }
}

storiesOf('Punchcard', module)
  .add('story',
    withInfo(null)(
      () => (
        <Container />
      )
    )
  );
