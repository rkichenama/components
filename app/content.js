import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Introduction from './introduction';
import PropTable from './proptable';
import MethodTable from './methodtable';
import Demos from './demos';

class Content extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    location: PropTypes.shape({
       pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  render () {
    const { props: { data, location: { pathname } }} = this;
    const documentation = data[pathname.substring(1)] || false;
    
    let k = 0;

    return (
      <article className='floating-column'>
        <Introduction {...documentation} />
        {
          documentation ? ([
            <PropTable {...documentation} key={k++} />,
            <MethodTable {...documentation} key={k++} />,
            <Demos {...documentation} key={k++} />,
          ]) : (
            null
          )
        }
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
