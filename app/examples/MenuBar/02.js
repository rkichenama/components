import React from 'react';
import { Stage } from '../';
import MenuBar from 'components/MenuBar/MenuBar';

export default class extends React.PureComponent {
  render () {
    return (
      <Stage style={{ width: '800px', height: '220px', 'align-items': 'flex-start' }}>
        <MenuBar {...{ maxDisplay: 4, initOpen: true }}>
          {
            Array(7).fill(0).map((_, k) => (
              <a key={k} href='#' onClick={
                e => {
                  e.preventDefault();
                }
              }>Link{k + 1}</a>
            ))
          }
        </MenuBar>
      </Stage>
    );
  }
}
