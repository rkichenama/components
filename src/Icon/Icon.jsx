import React from 'react';
import PropTypes from 'prop-types';

import getSvg from './getSvg';
import './Icon.scss';

// /\((.*)\).*\{([\s\S]*)\}/m

const dynSvg = name => {
  try {
    const { default: source } = require('!raw-loader!./svg/' + name + '.svg');
    return getSvg(source);
  } catch (e) {
    return null;
  }
};

/**
 * An Icon wrapper
 */
export default class Icon extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    ariaLabel: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    className: '',
    ariaLabel: null,
    style: {},
    name: 'thumbs-up'
  };

  render () {
    const {
      props: { name, className, style, ariaLabel }
    } = this;
    return (
      <svg
        role='img'
        aria-label={ariaLabel || name}
        className={`rk-icon${className ? ` ${className}` : ''}`}
        style={style}
        dangerouslySetInnerHTML={{__html: dynSvg(name)}}
      />
    );
  }
}
