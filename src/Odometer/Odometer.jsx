import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import './Odometer.scss';

class Column extends Component {
  static propTypes = {
    place: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired
  }

  state = {
    animating: true,
    prevValue: 0,
  }

  shouldComponentUpdate ({ value }) {
    return value !== this.state.prevValue;
  }

  /* eslint-disable-next-line camelcase */
  UNSAFE_componentWillReceiveProps () {
    this.setState({ animating: true });
  }

  handleTransitionEnd = () => setTimeout(() => this.setState({ animating: false, prevValue: this.props.value }), 250);

  /**
   * for a given column index, calucate the distance of travel to the new display digit
   *
   */
  calculateDistance = ({ value, size } = this.props, { animating } = this.state) => -(
    value + (animating ? (value ? 10 : 20) : 0)
  ) * size;

  /**
   * render the n-th digit
   * @param {number} n - index of digit to render
   * @return {Node} - a single digit with multiple digits
   * */
  renderDigit = n => (
    <div key={n} className='digit'>{ n % 10 }</div>
  );

  /**
   * render n digits
   * @param {number} n - number of digits to render
   * @return {Node} - multiple digit nodes
   * */
  renderDigits = n => {
    const digits = [];
    for (let i = 0; i < n; ++i)
      digits.push(this.renderDigit(i));
    return digits;
  };

  render () {
    return (
      <div className={`column${ this.state.animating ? ' animating' : ''}`} style={{ transform: `translateY(${this.calculateDistance()}px)`, transitionDelay: `${50 * this.props.place}ms`}} onTransitionEnd={this.handleTransitionEnd}>
        {
          this.renderDigits(21)
        }
      </div>
    );
  }
}

/**
 * An odometer that would display a positive numer ina rolling fashion
 */
export default class Odometer extends PureComponent {
  static propTypes = {
    value: PropTypes.number,
    digits: PropTypes.number,
    size: PropTypes.number,
  }

  static defaultProps = {
    value: 0,
    digits: 7,
    size: 96,
  }

  state = {
    value: '',
    prevValue: '',
  }

  /* eslint-disable-next-line camelcase */
  UNSAFE_componentWillReceiveProps ({ value, digits }, init = false) {
    if (init || (value !== this.props.value)) {
      this.setState({
        value: this.stringify(value, digits),
        prevValue: this.stringify(this.state.value, digits)
      });
    }
  }

  componentDidMount () { this.componentWillReceiveProps(this.props, true) }

  /**
   * make the value into a string, front padded with zeros
   * @param {number} value
   * @param {number} digits - the width of the string
   */
  stringify = (value, digits) => value.toString().padStart(digits, '0');

  /**
   * render c columns
   * @param {number} c - number of columns to render
   * @return {Node} - multiple column nodes
   * */
  renderColumns = (c = this.props.digits) => {
    const columns = [];
    for (let i = 0; i < Math.max(c, this.state.value.length); ++i) {
      columns.push((
        <Column key={i} place={6 - i} value={Number(this.state.value[i] || 0)} size={this.props.size} />
      ));
    }
    return columns;
  };

  render () {
    return (
      <div className='odometer' style={{ '--glyph': `${this.props.size}px`}}>
        { this.renderColumns() }
      </div>
    );
  }
}
