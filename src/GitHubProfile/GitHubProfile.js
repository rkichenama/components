/* */
import React from 'react';
import PropTypes from 'prop-types';
import {
  compose,
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
