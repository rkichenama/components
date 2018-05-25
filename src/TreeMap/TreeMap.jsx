import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './TreeMap.scss';

/**
 * My interpretation of a treemap
 */
export default class TreeMap extends Component {
  static propTypes = {
    /** used internally, denoted the levels deep this render is and limits how far down the hole we go */
    depth: PropTypes.number,
    tree: PropTypes.arrayOf(PropTypes.shape({
      size: PropTypes.number,
      name: PropTypes.string,
      tree: PropTypes.array
    })).isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
  }

  static defaultProps = {
    depth: 1,
    className: '',
    style: {},
  }

  /**
   * recursively render the tree into Nodes
   * @param {number} depth - how deep is this current level
   * @param {Array} tree - list of nodes at this level of the tree
   * @param {nunber} totalSize - size of the root
   * @return {array} - list of renderable nodes
   */
  static renderTreeNodes = (
    depth,
    tree,
    totalSize = totalSize = tree.reduce((t, { size }) => (t + size), 0)
  ) => tree.map(({ name, size, tree}) => {
    const basis = (size / totalSize * 100);
    return basis > 1 ? (
      <article
        key={name}
        alt={name}
        className={`tree-node${depth % 2 ? '' : ' alt'}`}
        style={{
          flexBasis: `${basis.toFixed(2)}%`
        }}
      >
        { TreeMap.renderTreeNodes(depth + 1, tree, totalSize) }
      </article>
    ) : null;
  });

  render () {
    const {
      props: { depth, tree, className, style }
    } = this;
    if (!tree.length || depth > 12) { return null }
    const totalSize = tree.reduce((t, { size }) => (t + size), 0);
    return (
      <div
        className={`tree-map ${className}`}
        {...{style}}
      >
        { TreeMap.renderTreeNodes(depth, tree) }
      </div>
    );
  }
}
