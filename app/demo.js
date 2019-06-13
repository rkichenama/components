import React, { PureComponent } from 'react';

import Catcher from './error';
import { Prism as Highlighter} from 'react-syntax-highlighter';

let style;
if (process.env.NODE_ENV === 'production') {
  style = require('react-syntax-highlighter/dist/esm/styles/prism').prism;
} else {
  style = require('react-syntax-highlighter/dist/esm/styles/prism').okaidia;
}

export default class Demo extends PureComponent {
  render () {
    const { props: { file } } = this;
    const demo = file.replace(/^app\/examples/, '');
    const Component = require('./examples' + demo).default;
    const source = require('!raw-loader!./examples' + demo);

    return (
      <div className='demo'>
        <h4>{ file }</h4>
        <div>
          <Catcher>
            <Component key={0} />
          </Catcher>
        </div>
        <Highlighter key={1} language='jsx' {...{ style }} showLineNumbers wrapLines>
          { source }
        </Highlighter>
      </div>
    );
  }
}
