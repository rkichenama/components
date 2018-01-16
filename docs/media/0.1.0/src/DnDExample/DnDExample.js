import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel, Row, Col } from 'react-bootstrap';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Form from './Form';
import List from './List';

import './DnDExample.scss';

const ListItem = DragSource('listItem', {
  beginDrag (props) { return { text: props.text }}
}, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(
  ({text}) => (
    <li className='item'>{text}</li>
  )
);

const OrderedList = DropTarget('listItem', {
  // hover (props, monitor, component) {
  //
  // },
  canDrop (props, monitor) {
    return true;
  }
}, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType()
}))(
    ({children}) => (
      <ol className='list'>
        {children}
      </ol>
    )
);

// const OrderedListContext = DragDropContext(HTML5Backend)(
//     ({children}) => (
//       <div>
//         {children}
//       </div>
//     )
// );



@DragDropContext(HTML5Backend)
export default class DnDExample extends Component {
  constructor (...args) {
    super(...args);
    [

    ].map(fn => (this[fn] = this[fn].bind(this)));
  }
  render () {
    return (
      <Panel>
        <Row>
          <Col xs={9}>
            <Form />
          </Col>
          <Col xs={3}>
            <List />
          </Col>
        </Row>
      </Panel>
    );
  }
}

DnDExample.propTypes = {

};
/*
<OrderedListContext>
  <OrderedList>
    {
      ['ha', 'he', 'hi'].map((text, i) => (<ListItem key={i} {...{text}} />))
    }
  </OrderedList>
</OrderedListContext>

 */
