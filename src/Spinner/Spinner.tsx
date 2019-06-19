import * as React from 'react';

import './Spinner.scss';

interface BasicProps {
  /** the css class attribute */
  className?: string,
  /** the css style attribute */
  style?: object,
  /** the id attribute */
  id?: string
}
interface SpinnerProps extends BasicProps {
  for: React.ComponentClass<any, any>,
  /** function that, if result is true, will show spinner */
  test: Function,
  blockingClass?: string
}

/**
 * A simple spinner that uses a font based animation that scrolls vertically through an infinite transform animation. It should be used as a wrapper for a component which will block the UI if the test returns true. The actual spinner is an offset from the top of the rendered component with a minimum height of double the font size.
 */
const Spinner: React.StatelessComponent<SpinnerProps> = ({ for: component, test, blockingClass = '', ...props }) => {
  return (
    <div className={
      test(props)
        ? `rrk-spinner${blockingClass ? ` ${blockingClass}`: ''}`
        : undefined
    }>
      { React.createElement(component, props as React.ClassAttributes<React.ComponentClass> ) }
      <span className='spinner' />
    </div>
  );
};

export default Spinner;
