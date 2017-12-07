import React from 'react';
// import PropTypes from 'prop-types';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import Sidebar from './sidebar';
import Content from './content';

import ID from './children';

const Docs = () => (
  <Router>
    <ID>
      <section className='sidebar-container'>
        <Sidebar />
      </section>
      <section className='content-container'>
        <Route component={Content} />
      </section>
    </ID>
  </Router>
);

export default Docs;
