import * as React from 'react';
import { RKLibrary, mergeProps } from '../library';
import './ProgressBar.scss';

interface ProgressBarProps extends RKLibrary.StylingProps {
  /** color the filled progress bar should be */
  barColor?: string | string[];
  /** list of classes to apply to each value bar */
  classNames?: string[];
  /** hover title for the bar(s) */
  title?: string;
  /** the percentage to display, given as a positive value `[0, 1]`. can be either a single float or an array of floats denoting a list of segments progress */
  value: number | number[];
  /** the text to display for a the bar */
  text?: string | string[];
}

/**
 * A simple progress bar that moves from left to right when given a value(s) between
 * 0 and 1. Basically, most of the css can be overriden besides the props to set colors.
 * One line of text is expected for the status, which will be center white with black outline.
 */
const ProgressBar: React.StatelessComponent<ProgressBarProps> = ({
  barColor, value, text, className, title, classNames
}) => {
  const values: number[] = [].concat(value)
    .map(val => (-1 + Math.max(0, Math.min(val, 1))));
  const texts: string[] = [].concat(text);
  const barColors: string[] = [].concat(barColor);
  const attributes: object = mergeProps(
    { className: 'status-progress' },
    { className, title }
  );

  const bars = values.map((val, i) => {
    const barAttributes = mergeProps(
      {
        className: 'status-progress-bar-value',
        style: {
          transform: `translateX(${val * 100}%)`,
          background: barColors[i] || barColor
        }
      },
      { className: classNames[i] }
    );
    return (
      <div key={i} className='status-progress-bar'>
        <div {...barAttributes} />
        <div className='status-progress-text'>{texts[i]}</div>
      </div>
    );
  });
  // TODO: maybe allow for proportional sizes of the segments
  return (
    <section {...attributes} >
      { bars }
    </section>
  );
};
ProgressBar.defaultProps = {
  barColor: 'green',
  classNames: [],
  value: 0
};

export default ProgressBar;
