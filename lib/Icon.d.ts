import * as React from 'react';

export interface IconProps {
    name: string;
    className?: string;
    ariaLabel?: string;
    style?: Object;
}

export default class Icon extends React.Component<IconProps, any> {
    render(): JSX.Element;

}

