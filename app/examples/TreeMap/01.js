import React from 'react';
import { Stage } from '../';
import TreeMap from 'components/TreeMap/TreeMap.jsx';

const randUnder = ceil => Math.ceil(Math.random() * ceil);
const randStr = () => Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0,4);
const generateDemoTree = depth => {
  if (depth <= 0) { return [] }
  return Array(randUnder(3)).fill(0)
    .map((_, i) => ({
      name: randStr(),
      size: randUnder(1000),
      tree: generateDemoTree(depth - 1),
    }));
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
      <Stage style={{ flexBasis: '98%' }}>
        <TreeMap style={{ height: '210px' }} tree={this.state.data}/>
      </Stage>
    );
  }
}
