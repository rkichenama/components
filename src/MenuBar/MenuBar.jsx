import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

import './MenuBar.scss';

/**
 * MenuBar
 * */
export default class MenuBar extends Component {

  static propTypes = {
    /** number of items to show in the primary row */
    maxDisplay: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func
    ]),
    /** flag for whether the more menu should be initially open */
    initOpen: PropTypes.bool,
    children: PropTypes.node
  }

  static defaultProps = {
    maxDisplay: 4,
    initOpen: false,
  }

  state = {
    open: this.props.initOpen,
  }

  /**
   * @return {Object} - the component children each wrapped with a list item
   * @memberof MenuBar
   */
  renderItems = () => Children.map(this.props.children, (child, k) => (
    <li key={k}>{ child }</li>
  ));

  /**
   * toggles the open state of the More menu
   * @param {Event} evt
   */
  handleMoreClick = evt => {
    evt.preventDefault();
    this.setState(({ open }) => ({ open: !open }));
  }

  render () {
    const {
      props: { maxDisplay },
      state: { open },
      handleMoreClick
    } = this;
    const displayCount = /function/.test(typeof maxDisplay) ? maxDisplay() : maxDisplay;
    const items = this.renderItems();
    return (
      <nav className='menu-bar'>
        <ul className='-primary'>
          { items.slice(0, displayCount) }
          {
            displayCount < items.length
              ? (
                <li className={`-more`}>
                  <a href='#' type='button' onClick={handleMoreClick}>More &darr;</a>
                  <ul className={`-secondary${!open ? ' -hidden': ''}`}>
                    { items.slice(displayCount) }
                  </ul>
                </li>
              )
              : null
          }
        </ul>
      </nav>
    );
  }
}
