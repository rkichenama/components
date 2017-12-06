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

export default class Demo extends PureComponent {
  render () {
    const { props: { file } } = this;
    const demo = file.replace(/^app\/examples/, '');

    try {
      const Component = require('./examples' + demo).default;
      const source = require('!raw-loader!./examples' + demo);
      return (
        <section className='demo'>
          <h4>{ file }</h4>
          <div>
            <Component key={0} />
          </div>
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
