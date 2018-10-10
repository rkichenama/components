/* */
import React from 'react';
import PropTypes from 'prop-types';
import {
  compose, withHandlers,
  defaultProps, lifecycle,
  setDisplayName, setPropTypes
} from 'recompose';

import axios from 'axios';

import './GitHubProfile.scss';

const noWrap = str => (<span style={{whiteSpace: 'nowrap'}}>{str}</span>);

const GitHubProfile = ({username, name, avatar_url, html_url, location, className = ''}) => (
  <div className={`github-profile ${className}`} >
    {(html_url && avatar_url) ? [
      (<div className='img' key={1}>
        <a href={html_url}>
          <img src={avatar_url} width='48' alt='avatar' />
        </a>
      </div>),
      (<div className='text' key={2}>
        <div>
          {noWrap(name)} {noWrap(<a href={html_url}>({username})</a>)}
        </div>
        <div>{noWrap(location)}</div>
      </div>)
    ] : null}
  </div>
);

const enhance = compose(
  setDisplayName('Stateless(GitHubProfile)'),
  setPropTypes({
    username: PropTypes.string,
    name: PropTypes.string,
    avatar_url: PropTypes.string,
    html_url: PropTypes.string,
    location: PropTypes.string,
    className: PropTypes.string,
  }),
  defaultProps({
    username: ''
  }),
  withHandlers({
    fetchUserInfo: ({username}) => async component => {
      try {
        let {
          data: {avatar_url, name, html_url, location}
        } = await axios.get(`https://api.github.com/users/${username}`);
        component.setState({
          avatar_url, name, html_url, location
        });
      } catch (e) {
        // failed request
      }
    }
  }),
  lifecycle({
    componentDidMount () {
      this.props.fetchUserInfo(this);
    },
    componentWillUpdate ({ username }) {
      if (username !== this.props.username) {
        this.setState({
          avatar_url: false,
          name: false,
          html_url: false,
          location: false,
        });
      }
    },
    componentDidUpdate ({ username }) {
      if (username !== this.props.username) {
        this.props.fetchUserInfo(this);
      }
    }
  }),
);

export default enhance(GitHubProfile);
