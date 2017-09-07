/* */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  compose, withState, withHandlers,
  defaultProps, lifecycle,
  setDisplayName, setPropTypes
} from 'recompose';

import axios from 'axios';

const Styles = {
  container: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  img: {
    flex: '0 0 auto'
  },
  text: {
    flex: '1 1 auto',
    paddingLeft: '8px'
  }
};

const noWrap = str => (<span style={{whiteSpace: 'nowrap'}}>{str}</span>);

const GitHubProfile = ({username, name, avatar_url, html_url, location, className = ''}) => (
  <div style={Styles.container} {...{className}} >
    <div style={Styles.img}>
      <a href={html_url}>
        <img src={avatar_url} width='48' />
      </a>
    </div>
    <div style={Styles.text}>
      <div>
        {noWrap(name)} {noWrap(<a href={html_url}>({username})</a>)}
      </div>
      <div>{noWrap(location)}</div>
    </div>
  </div>
);

const enhance = compose(
  setPropTypes({
    username: PropTypes.string,
    name: PropTypes.string,
    avatar_url: PropTypes.string,
    html_url: PropTypes.string
  }),
  defaultProps({
    username: 'rkichenama'
  }),
  lifecycle({
    componentDidMount () {
      axios.get(`https://api.github.com/users/${this.props.username}`)
        .then(({data, data: {avatar_url, name, html_url, location} }) => {
          console.warn('/users', data);
          this.setState({
            avatar_url, name, html_url, location
          });
        });
    }
  }),
  setDisplayName('Stateless(GitHubProfile)')
);

export default enhance(GitHubProfile);
