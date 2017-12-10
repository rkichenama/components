import React from 'react';
import GitHubProfile from 'components/GitHubProfile/GitHubProfile';

const usernames = [
  '', 'rkichenama', 'getify', 'wesbos', 'leaverou', 'douglascrockford',
];

export default class extends React.Component {
  componentWillMount () { this.state = { username: '' } }

  handleOnChange = (evt) => { this.setState({username: evt.currentTarget.value}); };

  render () {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ flexBasis: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <GitHubProfile username={ this.state.username } />
        </div>
        <select onChange={this.handleOnChange} value={this.state.username} style={{ flexBasis: '20%' }}>
          { usernames.map(user => (<option key={user}>{user}</option>)) }
        </select>
      </div>
    );
  }
};
