import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './GitHubProfile.scss';

const noWrap = str => (<span style={{whiteSpace: 'nowrap'}}>{str}</span>);

export default class GitHubProfile extends PureComponent {
  static propTypes = {
    /**
     * user on github whose profile information to display
     */
    username: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    username: '',
    className: '',
    style: {},
  };

  state = {
    name: '', avatar_url: '', html_url: '', location: '',
  };

  /**
   * Using `props.username`, will retrieve github info using v3 API
   * @param {Object} props - component props
   * @param {string} props.username - the github username to pull
   */
  fetchUserInfo = async props => {
    const { username } = props;
    try {
      let {
        data: {avatar_url, name, html_url, location}
      } = await axios.get(`https://api.github.com/users/${username}`);
      this.setState({
        avatar_url, name, html_url, location
      });
    } catch (e) {
      /* failed request */
    }
  };

  componentDidMount () { this.fetchUserInfo(this.props) }

  componentDidUpdate () {
    if (this.state.username !== this.props.username) {
      this.fetchUserInfo(this.props);
    }
  }

  componentWillUpdate ({ username }) {
    if (username !== this.props.username) {
      this.setState({
        avatar_url: false,
        name: false,
        html_url: false,
        location: false,
      });
    }
  }

  render () {
    const {
      props: { username, className, style },
      state: { name, avatar_url, html_url, location },
    } = this;
    let k = 0;

    return (
      <div {...{className: `github-profile ${className}`, style}} >
        {(html_url && avatar_url) ? [
          (<div className='img' key={k++}>
            <a href={html_url}>
              <img src={avatar_url} width='48' alt='avatar' />
            </a>
          </div>),
          (<div className='text' key={k++}>
            <div>
              {noWrap(name)} {noWrap(<a href={html_url}>({username})</a>)}
            </div>
            <div>{noWrap(location)}</div>
          </div>)
        ] : null}
      </div>
    );
  }
}
