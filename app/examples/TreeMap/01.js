import React from 'react';
import { Stage } from '../';
import TreeMap from 'components/TreeMap/TreeMap.jsx';

const randUnder = ceil => Math.ceil(Math.random() * ceil);
const randBetween = (ceil, floor = 0) => floor + randUnder(ceil);
const randStr = () => Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0,4);
const generateDemoTree = (depth, max = randBetween(100000, 10)) => {
  if (depth <= 0) { return [] }
  return Array(randUnder(8)).fill(0)
    .map((_, i) => {
      const size = randBetween(max, 10);
      return {
        size,
        name: randStr(),
        tree: generateDemoTree(depth - 1, size),
      }
    });
};
const depth = 3;

export default class extends React.PureComponent {
  state = {
    data: generateDemoTree(depth),
    interval: false,
  }
  componentDidMount () {
    this.setState({
      interval: setInterval(() => {
        this.setState({ data: generateDemoTree(depth) });
      }, 1200)
    })
  }
  componentWillUnmount () { clearInterval(this.state.interval) }
  render () {
    return (
      <Stage style={{ flexBasis: '100%' }}>
        <TreeMap style={{ height: '280px' }} tree={this.state.data}/>
      </Stage>
    );
  }
}
