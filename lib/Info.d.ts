import * as React from 'react';

export interface InfoProps {
    /**
     * the replacement for `summary` tag, should accept a string or nodes
     */
    title?: any;
    children?: any;
    className?: string;
    style?: Object;
    /**
     * toggles whether the caret should be on the right if present and/or true
     */
    right?: boolean;
    /**
     * allows pre-setting the open state.
     * could be used to change state programmatically
     */
    open?: boolean;
    /**
     * callback triggered after open state has changed.
     */
    onStateChanged?: (...args: any[])=>any;
}

export default class Info extends React.PureComponent<InfoProps, any> {
    render(): JSX.Element;

}

