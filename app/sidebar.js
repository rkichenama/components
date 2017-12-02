import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const Item = ({lbl, slug, onClick}) => (
  <li className='sidebar-item'>
    <button className='btn' {...{onClick}} data-link={slug}>{lbl}</button>
  </li>
);

export default class Sidebar extends PureComponent {

  handleClick = ({target}) => { console.log(target.getAttribute('data-link'))};

  render () {
    return (
      <ul className='sidebar'>
        {
          [
            {lbl: 'Component', slug: '#'},
            {lbl: 'Component', slug: '#'},
            {lbl: 'Component', slug: '#'},
            {lbl: 'Component', slug: '#'},
            {lbl: 'Component', slug: '#'},
            {lbl: 'Component', slug: '#'},
            {lbl: 'Component', slug: '#'},
            {lbl: 'Component', slug: '#'},
            {lbl: 'Component', slug: '#'},
            {lbl: 'Component', slug: '#'},
            {lbl: 'Component', slug: '#'},
            {lbl: 'Component', slug: '#'},
            {lbl: 'Component', slug: '#'},
            {lbl: 'Component', slug: '#'},
            {lbl: 'Component', slug: '#'},
            {lbl: 'Component', slug: '#'},
            {lbl: 'Component', slug: '#'},
            {lbl: 'Component', slug: '#'},
            {lbl: 'Component', slug: '#'},
          ].map((item, i) => (
            <Item key={i} {...item} onClick={this.handleClick} />
          ))
        }
      </ul>
    );
  }
}
