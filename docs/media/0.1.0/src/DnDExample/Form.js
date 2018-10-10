import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DropTarget } from 'react-dnd';

import { renderN } from '../shared/util';

@DropTarget(
  ['dropComponent', 'dropTextComponent'],
  {// component is always null when hovering stateless components.
    drop (props, monitor, component) {
      if (monitor.didDrop()) { return }
      const { setRenderComponent } = component;
      return { setRenderComponent };
    },
    canDrop (props, monitor) {
      const type = monitor.getItemType();
      return (/dropTextComponent/i.test(type) && props.ind === 0) || /dropComponent/i.test(type);
    }
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  })
)
class Target extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    isOverCurrent: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    ind: PropTypes.number
  };

  constructor (...args) {
    super(...args);
    this.state = {
      component: null
    };
    [
      'setRenderComponent'
    ].forEach(fn => this[fn] = this[fn].bind(this));
  }

  setRenderComponent (component) {
    this.setState({component: null}, () => {
      this.setState({component});
    });
  }

  render () {
    const { isOverCurrent, canDrop, connectDropTarget } = this.props;
    const { component } = this.state;
    return connectDropTarget(
      <div className={`target ${isOverCurrent ? (canDrop ? 'over droppable' : 'over notDroppable') : ''}`}>
        {component ? component : 'Target'}
      </div>
    );
  }
}

export default class Form extends Component {
  render () {
    return (
      <div className='report'>
        { renderN(6, Target) }
      </div>
    );
  }
}
