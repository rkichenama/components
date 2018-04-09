import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './TreeMap.scss';

const TreeNode = PropTypes.shape({
  size: PropTypes.number,
  name: PropTypes.string,
  tree: PropTypes.array
});

/**
 * My interpretation of a treemap
 */
export default class TreeMap extends Component {
  static propTypes = {
    /** used internally, denoted the levels deep this render is and limits how far down the hole we go */
    depth: PropTypes.number,
    tree: PropTypes.arrayOf(TreeNode),
    className: PropTypes.string,
    style: PropTypes.object,
  }

  static defaultProps = {
    depth: 0,
    tree: [],
    className: '',
    style: {},
  }

  render () {
    const {
      props: { depth, tree, className, style }
    } = this;
    if (!tree.length || depth > 12) { return null }
    const totalSize = tree.reduce((t, { size }) => (t + size), 0);
    return (
      <div
        className={`tree-map${depth % 2 ? '' : ' alt'} ${className}`}
        {...{style}}
      >
        {
          tree.map(({ name, size, tree}) => {
            const basis = (size / totalSize * 100);
            return basis > 5 ? (
              <article
                key={name}
                alt={name}
                className='tree-node'
                style={{
                  flexBasis: `${basis.toFixed(2)}%`
                }}
              >
                <TreeMap depth={depth + 1} {...{ tree }} />
              </article>
            ) : null
          })
        }
      </div>
    );
  }
}
