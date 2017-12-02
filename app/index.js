import React from 'react';
// import PropTypes from 'prop-types';
import { render } from 'react-dom';

import './scss/docs.scss';

import Sidebar from './sidebar';

const Index = () => ([
  <section key={'sidebar'} className='sidebar-container'>
    <Sidebar />
  </section>,
  <section key={'content'} className='content-container'>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
    Hello, World! <br/>
  </section>,
]);

render(<Index />, document.getElementById('root'));
