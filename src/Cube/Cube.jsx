import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';

import './Cube.scss';

const noop = () => {};
const faces = [
  'front',
  'back',
  'left',
  'right',
  'top',
  'bottom',
];

const firstLetter = str => `${str[0].toUpperCase()}${str.slice(1)}`;

/**
 * A card type component that has 6 faces and rotates about the shared center via given prop and has an onClick event to notify parent to take action. The animation is handled via css transforms with a perspective of the viewport and seems to handle stuttering well.
 */
export default class Cube extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    /** one of the enum values, either in Cube.Faces or as a static named constant off Cube */
    face: PropTypes.oneOf(faces),
    /** function that is triggered on click to nofiy that action can be taken */
    onClick: PropTypes.func,
  };

  static defaultProps = {
    onClick: noop,
    face: 'front',
    className: ''
  };

  static Faces = faces;

  render () {
    const { props: {children, onClick, face, className} } = this;
    const kids = Children.toArray(children).slice(0, 6);
    return (
      <div className={`cube ${face} ${className}`}>
        <div className='flip' onClick={onClick}>
          {
            Cube.Faces.map((side, s) => (
              <div className={`side ${side}`} key={s}>{kids[s] || null }</div>
            ))
          }
        </div>
      </div>
    );
  }
}

faces.forEach(face => Cube[firstLetter(face)] = face);
