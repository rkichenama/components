import * as React from 'react';
import './Spinner.scss';
interface BasicProps {
    className?: string;
    style?: object;
    id?: string;
}
interface SpinnerProps extends BasicProps {
    for: React.ComponentClass<any, any>;
    test: Function;
    blockingClass?: string;
}
declare const Spinner: React.StatelessComponent<SpinnerProps>;
export default Spinner;
