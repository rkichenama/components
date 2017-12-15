import React from 'react';
import { ClickDecorator } from 'components/StateDecorator/StateDecorator';
import axios from 'axios';
import Card from 'components/Card/Card';

const centered = {
  display: 'flex', 'align-items': 'center', 'justify-content': 'center', height: '100%'
}
export default class extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      results: [],
    };
  }
  componentDidMount() {
    axios.get(`https://randomuser.me/api/?inc=name,picture&page=1&results=3&seed=abc`)
      .then(({ data: { results } }) => {
        this.setState({ results });
      });
  }
    render () {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ flexBasis: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ClickDecorator values={[false, true]} component={flipped => (
            <Card flipped={flipped}>
              {
                this.state.results.map(({ name, picture }, u) => (
                  <div key={u} style={centered}>
                    <img src={picture.large} style={{ maxWidth: '100%' }} title={`${name.first} ${name.last}`} />
                  </div>
                ))
              }
            </Card>
          )} />
        </div>
      </div>
    );
  }
}
