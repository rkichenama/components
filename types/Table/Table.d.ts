import * as React from 'react';
import './Table.scss';
import { RKLibrary } from '../library';
interface SharedData extends RKLibrary.StylingProps {
    data?: Array<any> | object;
}
interface CollapseRowProps extends SharedData {
    rowAttrs?: Function;
    cellAttrs?: Function;
    content?: Function;
}
interface TableProps extends RKLibrary.StylingProps, CollapseRowProps {
    data: Array<object>;
    columns: Array<string | number>;
    collapse?: CollapseRowProps;
}
declare const Table: React.StatelessComponent<TableProps>;
export default Table;
