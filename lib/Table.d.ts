import * as React from 'react';
import './Table.scss';
interface BasicProps {
    className?: string;
    style?: object;
    id?: string;
}
interface SharedData extends BasicProps {
    data?: Array<any> | object;
}
interface CollapseRowProps extends SharedData {
    rowAttrs?: Function;
    cellAttrs?: Function;
    content?: Function;
}
interface TableProps extends BasicProps, CollapseRowProps {
    data: Array<object>;
    columns: Array<string | number>;
    collapse?: CollapseRowProps;
}
declare const Table: React.StatelessComponent<TableProps>;
export default Table;
