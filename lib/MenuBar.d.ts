import * as React from 'react';

export type MenuBarMaxDisplay = number | ((...args: any[])=>any);

export interface MenuBarProps {
    /**
     * number of items to show in the primary row
     */
    maxDisplay?: MenuBarMaxDisplay;
    /**
     * flag for whether the more menu should be initially open
     */
    initOpen?: boolean;
}

export default class MenuBar extends React.Component<MenuBarProps, any> {
    render(): JSX.Element;

}

