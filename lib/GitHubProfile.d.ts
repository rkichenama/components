import * as React from 'react';

export interface GitHubProfileProps {
    /**
     * user on github whose profile information to display
     */
    username?: string;
    className?: string;
    style?: Object;
}

export default class GitHubProfile extends React.PureComponent<GitHubProfileProps, any> {
    render(): JSX.Element;

}

