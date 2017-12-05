import React, { PureComponent } from 'react';

import Highlighter from 'react-syntax-highlighter/prism';
// import { xcode as style } from 'react-syntax-highlighter/styles';
// import js from 'react-syntax-highlighter/languages/prism/javascript';

// registerLanguage('javascript', js);

let style;
if (process.env.NODE_ENV === 'production') {
  style = require('react-syntax-highlighter/styles/prism/prism').default;
} else {
  style = require('react-syntax-highlighter/styles/prism/okaidia').default;
}

export default class Examples extends PureComponent {
  render () {
    const { props: { file } } = this;
    try {
      const Component = require('./examples/' + file).default;
      const source = require('!raw-loader!./examples/' + file + '/index.js');
      return (
        <section className='example'>
          <Component key={0} />
          <Highlighter key={1} language='javascript' {...{ style }} showLineNumbers wrapLines>
            { source }
          </Highlighter>
        </section>
      );
    } catch (err) {
      return (
        <span >no examples available</span>
      );
    }
  }
}
