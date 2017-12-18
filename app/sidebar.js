import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Catcher from './error';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const dictionary = {
  // key: path -> path.key
  'ClickDecorator': ['Decorators'],
  'StateDecorator': ['Decorators'],
};
const keys = Object.keys(dictionary);

const Item = ({lbl, onClick, className}) => (
  <li className={`sidebar-item ${className || ''}`}>
    <div {...{onClick}} data-link={lbl}>
      {lbl}
    </div>
  </li>
);

class Folder extends PureComponent {
  state = {
    open: true,
  };

  render () {
    const { props: {k, subtree, currentPage, handleClick} } = this;
    return (
      <li className='sidebar-item fldr'>
        <div
          className={`folderName ${this.state.open ? 'open' : '' }`}
          onClick={e => { e.stopPropagation(); this.setState(({open}) => ({open: !open}))}}
        >{ k }</div>
        { List(subtree[k], currentPage, handleClick) }
      </li>
    );
  }
}
 
const createObjectPath = (obj, path, component) => {
  if (path.length) {
    const fldr = path.shift();
    if (!obj[fldr]) { obj[fldr] = {} }
    createObjectPath(obj[fldr], path, component);
  } else {
    obj[component] = false;
  }
};

const List = (subtree, currentPage, handleClick) => (
  <ul className='unstyled treeList'>
    {
      Object.keys(subtree).sort().map((key, i) => {
        if (subtree[key]) {
          return (
            <Folder key={i} {...{subtree, currentPage, handleClick, k: key}}/>
          );
        } else {
          return (
            <Item key={i} lbl={key} onClick={e => handleClick(e, key)} className={
              currentPage === key ? 'active' : null
            } />
          )
        }
      })
    }
  </ul>
)

class Sidebar extends PureComponent {

  static propTypes = {
    components: PropTypes.arrayOf(PropTypes.string).isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };

  state = {
    tree: {},
  }

  componentWillMount () { this.normalize() }
  componentWillReceiveProps ({ components }) {
    this.normalize(components);
  }

  normalize (components = this.props.components) {
    // take each string and add to its place in a nested tree
    const tree = components.reduce(
      (tree, component) => {
        if (keys.indexOf(component) !== -1) {
          /* */
          createObjectPath(tree, [...dictionary[component]], component);
        } else {
          // add to root of tree
          tree[component] = false;
        }
        return tree;
      }, {}
    );
    this.setState({tree}, () => { console.info(tree)});
  }

  handleClick = (evt, component) => {
    evt.preventDefault();
    const newPath = `/${component}`;
    if (newPath !== this.props.location.pathname) {
      this.props.history.push(`/${component}${this.props.location.search}`);
    }
  };

  render () {
    const {
      props: { components, location: { pathname } },
      state: { tree },
    } = this;
    const currentPage = pathname.substring(1);

    return (
      <div className='sidebar'>
        { List(tree, currentPage, this.handleClick) }
      </div>
    );
    // return (
    //   <ul className='sidebar'>
    //     {
    //       components.map((item, i) => (
    //         <Item key={i} lbl={item} onClick={this.handleClick} className={
    //           currentPage === item ? 'active' : null
    //         } />
    //       ))
    //     }
    //     <li><a>Link</a></li>
    //     <li><a href="#">Link</a></li>
    //   </ul>
    // );
  }
}

const mapStateToProps = ({ keys: components }) => ({
  components
});

export default withRouter(connect(
  mapStateToProps
)(Sidebar));
