import * as React from 'react';

export type ProgressBarValue = number | number[];

export interface ProgressBarProps {
    /**
     * color the filled progress bar should be
     */
    barColor?: string;
    /**
     * class to apply to the container `section`
     */
    className?: string;
    /**
     * list of classes to apply to each value bar
     */
    classNames?: string[];
    title?: string;
    /**
     * the percentage to display, given as a positive value `[0, 1]`. can be either a single float or an array of floats denoting a list of segments progress
     */
    value?: ProgressBarValue;
    children?: React.ReactNode;
}

export default class ProgressBar extends React.Component<ProgressBarProps, any> {
    render(): JSX.Element;

}

