import * as React from 'react';

export interface CanvasProps {
    className?: string;
    /**
     * An array of functions that will draw within the canvas intially after render. See __animation function__ for details
     */
    scene?: (...args: any[])=>any[];
    /**
     * An array of functions that will draw within the canvas in a looping sequence where each slide function is drawn after the complete scene array. See __animation function__ for details
     */
    sequence?: (...args: any[])=>any[];
    width?: number;
    height?: number;
    style?: Object;
}

export default class Canvas extends React.Component<CanvasProps, any> {
    render(): JSX.Element;

}

