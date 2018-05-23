import * as React from 'react';

export type CubeFace = "front" | "back" | "left" | "right" | "top" | "bottom";

export interface CubeProps {
    children: React.ReactNode;
    className?: string;
    /**
     * one of the enum values, either in Cube.Faces or as a static named constant off Cube
     */
    face?: CubeFace;
    /**
     * function that is triggered on click to nofiy that action can be taken
     */
    onClick?: (...args: any[])=>any;
}

export default class Cube extends React.PureComponent<CubeProps, any> {
    render(): JSX.Element;

}

