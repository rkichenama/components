import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './Info.scss';

const RenderableType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.node,
  PropTypes.array, // string or nodes, assumed to be renderable
]);

/**
 * Intended as a replacement for the Details / Summary pair, duplicating the ease of a cross browser collapsible element.
 *
 * TODO: rewrite as a render prop
 */
export default class Info extends PureComponent {
  static propTypes = {
    /** the replacement for `summary` tag, should accept a string or nodes */
    title: RenderableType,
    children: RenderableType,
    className: PropTypes.string,
    style: PropTypes.object,
    /** toggles whether the caret should be on the right if present and/or true */
    right: PropTypes.bool,
    /**
     * allows pre-setting the open state.
     *
     * could be used to change state programmatically
     */
    open: PropTypes.bool,
    /**
     * callback triggered after open state has changed.
     */
    onStateChanged: PropTypes.func,
  };

  static defaultProps = {
    style: {},
    className: '',
    right: false,
    open: false,
    onStateChanged: () => {},
  };

  state = {
    open: false,
  };

  /* eslint-disable-next-line camelcase */
  UNSAFE_componentWillMount () { this.preloadOpenState() }

  /* eslint-disable-next-line camelcase */
  UNSAFE_componentWillReceiveProps (props) { this.preloadOpenState(props) }

  /**
   * if an open prop is given, use it to load into state
   * @param {Object} props - component props
   * @param {bool} props.open - open state for section
   */
  preloadOpenState = (props = this.props) => {
    const { open } = props;
    this.setState({ open });
  };

  /**
   * internally handle clicking on the header
   * @param {Event} evt - a click event
   */
  handleToggleClick = evt => {
    evt.preventDefault();
    this.setState(({open}) => ({ open: !open }), () => {
      this.props.onStateChanged(this.state.open);
    });
  };

  render () {
    const {
      props: { title, children, right, className, style },
      state: { open },
    } = this;
    return (
      <article className={`information${open ? ' open': ''} ${className}`} style={style}>
        <header className={ right ? 'right' : 'left' } onClick={this.handleToggleClick}>
          { title || 'Info'}
        </header>
        <section>
          { open ? children : null }
        </section>
      </article>
    );
  }
}
