import React from 'react';
import ReactMarkdown from 'react-markdown';

const Markdown = ({source}) => (
  <ReactMarkdown {...{source}} />
);

export default Markdown;
