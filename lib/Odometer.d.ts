import * as React from 'react';

export interface OdometerProps {
    value?: number;
    digits?: number;
    size?: number;
}

export default class Odometer extends React.Component<OdometerProps, any> {
    render(): JSX.Element;

}

