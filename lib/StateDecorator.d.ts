import * as React from 'react';

export interface StateDecoratorProps {
    /**
     * the function that will be passed the current value when changed
     */
    component: (...args: any[])=>any;
    /**
     * the period to wait, in ms, before changing the value
     */
    delay?: number;
    /**
     * the list of values to loop through
     */
    values: any[];
    /**
     * flag to determine whether the values should be sequential or random
     */
    seq?: boolean;
}

export default class StateDecorator extends React.Component<StateDecoratorProps, any> {
    render(): JSX.Element;

}

