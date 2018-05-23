import * as React from 'react';

export interface SpinnerProps {
    blockingClass?: string;
    for: (...args: any[])=>any;
    /**
     * function that, if result is true, will show spinner
     */
    test: (...args: any[])=>any;
}

export default class Spinner extends React.PureComponent<SpinnerProps, any> {
    render(): JSX.Element;

}

