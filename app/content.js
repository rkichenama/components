import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Introduction from './introduction';
import PropTable from './proptable';

class Content extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    location: PropTypes.shape({
       pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  render () {
    const { props: { data, location: { pathname } }} = this;

    const documentation = data[pathname.substring(1)] || {};

    return (
      <article className='floating-column'>
        <Introduction {...documentation} />
        <PropTable {...documentation} />
      </article>
    );
  }
}

const mapStateToProps = ({ components: data }) => ({
  data
});

export default withRouter(connect(
  mapStateToProps
)(Content));
