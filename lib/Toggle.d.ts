import * as React from 'react';

export interface ToggleProps {
    /**
     * the value, true or false, of the underlying state
     */
    value?: boolean;
    /**
     * function that is notified when the sttae changes
     */
    onValueChange?: (...args: any[])=>any;
}

export default class Toggle extends React.PureComponent<ToggleProps, any> {
    render(): JSX.Element;

}

