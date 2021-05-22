import * as React from 'react';
import { RKLibrary } from '../library';
import './ProgressBar.scss';
interface ProgressBarProps extends RKLibrary.StylingProps {
    barColor?: string | string[];
    classNames?: string[];
    title?: string;
    value: number | number[];
    text?: string | string[];
}
declare const ProgressBar: React.StatelessComponent<ProgressBarProps>;
export default ProgressBar;
