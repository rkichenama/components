import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Item = ({lbl, onClick, className}) => (
  <li className={`sidebar-item ${className}`}>
    <button className='btn' {...{onClick}} data-link={lbl}>
      {lbl}
    </button>
  </li>
);

class Sidebar extends PureComponent {

  static propTypes = {
    components: PropTypes.arrayOf(PropTypes.string).isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };

  handleClick = ({currentTarget}) => {
    const newPath = `/${currentTarget.getAttribute('data-link')}`;
    if (newPath !== this.props.location.pathname) {
      this.props.history.push(`/${currentTarget.getAttribute('data-link')}`);
    }
  };

  render () {
    const { props: { components, location: { pathname } }} = this;
    const currentPage = pathname.substring(1);

    return (
      <ul className='sidebar'>
        {
          components.map((item, i) => (
            <Item key={i} lbl={item} onClick={this.handleClick} className={
              currentPage === item ? 'active' : null
            } />
          ))
        }
        <li><a>Link</a></li>
        <li><a href="#">Link</a></li>
      </ul>
    );
  }
}

const mapStateToProps = ({ keys: components }) => ({
  components
});

export default withRouter(connect(
  mapStateToProps
)(Sidebar));
