import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default class extends React.Component {
  static propTypes = {
    component: PropTypes.func.isRequired,
    count: PropTypes.number,
  };

  static defaultProps = {
    count: 100,
  }

  constructor(...args) {
    super(...args);
    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    axios.get(`https://randomuser.me/api/?inc=name,picture&page=1&results=${this.props.count}&seed=abc`)
      .then(({ data: { results } }) => {
        this.setState({ results });
      });
  }

  render () { return this.props.component(this.state.results) }
}
