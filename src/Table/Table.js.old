import React, { Component, createElement } from 'react';
import PropTypes from 'prop-types';

class Element extends Component {
  render () {
    const { tag = 'td', children, ...props } = this.props;
    return createElement(tag, props, children);
  }
}
Element.propTypes = {
  tag: PropTypes.string,
  children: PropTypes.node,
};

const Row = props => (<Element tag='tr' {...props} />);
const Head = props => (<Element tag='thead' {...props} />);
Head.Cell = props => (<Element tag='th' {...props} />);
Head.Cell.displayName = 'Th';
const Body = props => (<Element tag='tbody' {...props} />);
Body.Cell = props => (<Element tag='td' {...props} />);
Body.Cell.displayName = 'Td';
const Tbl = props => (<Element tag='table' {...props} />);

export default class Table extends Component {
  render () {
    return (
      <Tbl>
        <Head>
          <Row>
            <Head.Cell />
          </Row>
        </Head>
        <Body>
          <Row>
            <Body.Cell />
          </Row>
        </Body>
      </Tbl>
    );
  }
}
