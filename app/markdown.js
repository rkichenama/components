import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

export default class Markdown extends PureComponent {
  static propTypes = {
    source: PropTypes.string.isRequired,
  }
  
  render() {
    const { props: { source: src }} = this;
    // remove jsdoc config from markdown source
    const source = src.replace(/^@.*$/mg, '').trim();

    return (
      <ReactMarkdown {...{source}} />
    );
  }
}
