import * as React from 'react';

export interface ClickDecoratorProps {
    /**
     * the function that will be passed the current value when changed
     */
    component: (...args: any[])=>any;
    /**
     * the list of values to loop through
     */
    values: any[];
    /**
     * flag to determine whether the values should be sequential or random
     */
    seq?: boolean;
}

export default class ClickDecorator extends React.Component<ClickDecoratorProps, any> {
    render(): JSX.Element;

}

