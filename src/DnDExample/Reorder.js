import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel, Row, Col } from 'react-bootstrap';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import './DnDExample.scss';

const ListItem = DragSource('listItem', {
  beginDrag (props) { return { text: props.text }}
}, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(
  class extends Component {
    render () {
      const { text, connectDragSource, isDragging } = this.props;
      return connectDragSource(
        <li className='source'>{text}</li>
      );
    }
  }
);

const OrderedList = DropTarget('listItem', {
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
  class extends Component {
    render () {
      const { children, connectDropTarget } = this.props;
      return connectDropTarget(
        <ol className='target'>
          {children}
        </ol>
      )
    }
  }
);

const OrderedListContext = DragDropContext(HTML5Backend)(
    ({children}) => (
      <div>
        {children}
      </div>
    )
);



export default class DnDExample2 extends Component {
  constructor (...args) {
    super(...args);
    [

    ].map(fn => (this[fn] = this[fn].bind(this)));
  }
  render () {
    return (
      <Panel>
        <OrderedListContext>
          <OrderedList>
            {
              ['ha', 'he', 'hi'].map((text, i) => (<ListItem key={i} {...{text}} />))
            }
          </OrderedList>
        </OrderedListContext>
      </Panel>
    );
  }
}

DnDExample2.propTypes = {

};
