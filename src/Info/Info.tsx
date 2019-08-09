import * as React from 'react';
const {
  useState,
  useEffect
} = React;
import { RKLibrary, mergeProps } from '../library';

import './Info.scss';

interface InfoProps extends RKLibrary.StylingProps {
  children?: React.ReactChildren,
  /** the replacement for `summary` tag, should accept a string or nodes */
  title?: React.ReactNode,
  /** toggles whether the caret should be on the right if present and/or true */
  right?: boolean,
  /** allows pre-setting the open state. could be used to change state programmatically */
  open?: boolean,
  /** callback triggered after open state has changed. */
  onStateChanged?: Function,
}

/**
 * Intended as a replacement for the Details / Summary pair, duplicating the ease of a cross browser collapsible element.
 */
const Info: React.StatelessComponent<InfoProps> = ({
  title, children, right, className, style, onStateChanged, open: initiallyOpen
}) => {
  const [ open, setOpen ] = useState(initiallyOpen);
  useEffect(
    () => {
      setOpen(initiallyOpen);
    },
    [initiallyOpen]
  );
  const attributes: object = mergeProps(
    { className: 'information' },
    open ? { className: 'open' } : {},
    { className, style }
  );
  const onClick = evt => {
    evt.preventDefault();
    setOpen(onStateChanged(open));
  };
  const headAttributes: object = { className: right ? 'right' : 'left', onClick };

  return (
    <article {...attributes}>
      <header {...headAttributes}>
        { title }
      </header>
      { open ? (<section>{children}</section>) : null }
    </article>
  );
};
Info.defaultProps = {
  right: false,
  open: false,
  title: 'Info',
  onStateChanged: v => !v,
};

export default Info;
