import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { renderN } from '../shared/util';

import { DragSource } from 'react-dnd';

import Image from './Image';

@DragSource(
  'dropComponent',
  {
    beginDrag (props) { return { } },
    endDrag (props, monitor, component) {
      if (!monitor.didDrop()) { return }
      // const source = monitor.getItem();
      const { setRenderComponent } = monitor.getDropResult();
      const { comp } = props;
      setRenderComponent(comp);
    }
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)
class ImageSource extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    comp: PropTypes.node.isRequired
  };

  render () {
    const {connectDragSource, isDragging} = this.props;
    return connectDragSource(
      <div className={`source ${isDragging ? 'dragging' : ''}`}>
        ImageSource ({this.props.comp.props.category})
      </div>
    );
  }
}

class Text extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    comp: PropTypes.string.isRequired
  };

  render () {
    const {connectDragSource, isDragging} = this.props;
    return connectDragSource(
      <div className={`source ${isDragging ? 'dragging' : ''}`}>
        TextSource
      </div>
    );
  }
}

const TextSource = DragSource(
  'dropTextComponent',
  {
    beginDrag (props) { return { } },
    endDrag (props, monitor, component) {
      if (!monitor.didDrop()) { return }
      // const source = monitor.getItem();
      const { setRenderComponent } = monitor.getDropResult();
      const { comp } = props;
      setRenderComponent(<div>{comp}</div>);
    }
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(Text);

export default class List extends Component {
  render () {
    return (
      <div className='list'>
        <ImageSource comp={<Image category='abstract' />} />
        <ImageSource comp={<Image category='nature' />} />
        <ImageSource comp={<Image category='people' />} />
        <TextSource comp={`
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet accumsan tortor. Pellentesque
          condimentum nisl eget mi venenatis cursus. Nulla pellentesque et urna ac vulputate. Ut elementum eu tellus
          non porta. Quisque a aliquam dui. Integer in fringilla tortor, id laoreet erat. Phasellus ut neque a leo
          tempus sollicitudin at at arcu. Cras laoreet arcu odio, non auctor nisl sagittis vel. Sed malesuada, quam
          vitae viverra fermentum, magna lorem eleifend nibh, id aliquam diam magna eget nisl. Proin vulputate nulla
          ut eros porta venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ornare eget elit
          sed rutrum. Aliquam non justo vel odio interdum luctus.
          `} />
      </div>
    );
  }
}
