import * as React from 'react';
import { RKLibrary } from '../library';
import './Info.scss';
interface InfoProps extends RKLibrary.StylingProps {
    children?: React.ReactChildren;
    title?: React.ReactNode;
    right?: boolean;
    open?: boolean;
    onStateChanged?: Function;
}
declare const Info: React.StatelessComponent<InfoProps>;
export default Info;
