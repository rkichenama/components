import React from 'react';
// import PropTypes from 'prop-types';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import Sidebar from './sidebar';
import Content from './content';

const Docs = () => (
  <Router>
    <div>
      <section className='sidebar-container'>
        <Sidebar />
      </section>
      <section className='content-container'>
        <Route component={Content} />
      </section>
    </div>
  </Router>
);

export default Docs;
