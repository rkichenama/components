import * as React from 'react';

export interface TreeMapTree {
    size?: number;
    name?: string;
    tree?: any[];
}

export interface TreeMapProps {
    /**
     * used internally, denoted the levels deep this render is and limits how far down the hole we go
     */
    depth?: number;
    tree: TreeMapTree[];
    className?: string;
    style?: Object;
}

export default class TreeMap extends React.Component<TreeMapProps, any> {
    render(): JSX.Element;

}

