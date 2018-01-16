import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel, Row, Col } from 'react-bootstrap';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Deck from '../Deck/Deck';
import Card from '../Card/Card';
import StateDecorator from '../StateDecorator/StateDecorator';

import './DnDExample.scss';

const FlippingCard = StateDecorator('flipped', [true, false], 6000)(Card);

class LI extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    // for dragging
    connectDragSource: PropTypes.func.isRequired,
    // for dropping
    connectDropTarget: PropTypes.func.isRequired,
  };
  render () {
    const { children, connectDragSource, connectDropTarget } = this.props;

    // DragSource needs a native element
    return connectDragSource(connectDropTarget(
      <span>
        <FlippingCard className='source'>
          {children}
        </FlippingCard>
      </span>
    ), { dropEffect: 'move' });
  }
}

const specTarget = {
  hover (props, monitor, component) {
    const {ind: overInd} = props;
    const {ind: dragInd} = monitor.getItem();

    if (dragInd !== overInd) {
      monitor.getItem().ind = overInd;
    }
  }
};
const collectTarget = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop()
});

const specSource = {
  beginDrag (props) { return { ind: props.ind }; },
  isDragging (props, monitor) { return monitor.getItem().ind === props.ind},
  endDrag (props, monitor, component) {
    const {ind: dragInd} = props;
    const {ind: dropInd} = monitor.getItem();

    if (dragInd !== dropInd) {
      return props.reorder(dragInd, dropInd);
    }
    return null;
  }
};
const collectSource = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

const ListItem = DragSource('listItem', specSource, collectSource)(
  DropTarget('listItem', specTarget, collectTarget)(
    LI
  )
);

const OrderedListContext = DragDropContext(HTML5Backend)(
    Deck
);

export default class DnDExample2 extends Component {
  constructor (...args) {
    super(...args);
    [
      'reorder'
    ].map(fn => (this[fn] = this[fn].bind(this)));
    this.state = {
      items: [
        ['Bruce Banner', 'Hulk'],
        ['Carl Lucas', 'Luke Cage'],
        ['Carol Danvers', 'Captain Marvel'],
        ['Danny Rand', 'Iron Fist'],
        ['Doreen Alene Green', 'Squirrel Girl'],
        ['Jessica Campbell', 'Jessica Jones'],
        ['Matt Murdock', 'Daredevil'],
        ['Neena Thurman', 'Domino'],
        ['Pytor Rasputin', 'Colossus'],
        ['Tony Stark', 'Iron Man'],
        ['Wade Wilson', 'Deadpool'],
      ]
    }
  }
  reorder (src, dest) {
    const { items } = this.state;
    // move src to before dest
    // remove src from items
    const out = items.filter((item, i) => i !== src)
    this.setState({items: [
      // everything before dest
      ...out.slice(0, dest),
      // src
      items[src],
      // everything after dest
      ...out.slice(dest)
    ]});
  }
  render () {
    const { reorder } = this;
    return (
      <Panel>
        <OrderedListContext className='reorder'>
            {
              this.state.items.map(([name, alias], i) => (
                <ListItem {...{reorder}} key={i} ind={i}>
                  <span>{name}</span>
                  <span>{alias}</span>
                </ListItem>
              ))
            }
        </OrderedListContext>
      </Panel>
    );
  }
}

DnDExample2.propTypes = {

};
