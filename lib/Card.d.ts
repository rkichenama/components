import * as React from 'react';

export interface CardProps {
    /**
     * the structure of this component requires at least 1 child, no more than 2
     */
    children: React.ReactNode;
    /**
     * callback to notify parent, which decides on whether the `flipped` prop should change
     */
    onClick?: (...args: any[])=>any;
    /**
     * the current state, whether the front is shown (`false`) or the back (`true`)
     */
    flipped?: boolean;
    className?: string;
}

export default class Card extends React.PureComponent<CardProps, any> {
    render(): JSX.Element;

}

