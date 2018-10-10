import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './Toggle.scss';

/**
 * A simple toggle component.
 *
 * In order to customize, you can use CSS variables below to change colors and timings
 * * `--toggle-track-padding` - the vertical padding of the track, 4px default
 * * `--toggle-animation-duration` - the time of the slide transition, 750ms default
 * * `--toggle-switch-color` - color of the disc in the center and the border around the track, white default
 * * `--toggle-track-color` - color of the track the disc travels on, 20% black default
 */
export default class Toggle extends PureComponent {
  static propTypes = {
    /** the value, true or false, of the underlying state */
    value: PropTypes.bool,
    /** function that is notified when the sttae changes */
    onValueChange: PropTypes.func,
  };

  static defaultProps = {
    value: false,
    onValueChange: () => {},
  }

  state = {
    value: false,
  }

  componentWillMount () { this.preloadValue() }

  componentWillReceiveProps (props) { this.preloadValue(props) }

  /**
   * use the value prop to load into statepreloadValue
   * @param {Object} props - component props
   * @param {bool} props.value - toggle state
   */
  preloadValue = (props = this.props) => {
    const { value } = props;
    this.setState({ value });
  };

  handleClick = () => {
    this.setState(({ value }) => ({ value: !value }), () => {
      this.props.onValueChange(this.state.value);
    });
  }

  render () {
    const { value } = this.state;
    return (
      <div className='toggle-container' onClick={this.handleClick}>
        <div className={`toggle-track${ value ? ' on': ' off' }`}>
          <div className='toggle-switch'>
          </div>
        </div>
      </div>
    );
  }
}
