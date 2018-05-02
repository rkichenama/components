import React from 'react';
import { Stage } from '../';
import StateDecorator from 'components/StateDecorator/StateDecorator';
import MenuBar from 'components/MenuBar/MenuBar';

export default class extends React.PureComponent {
  render () {
    return (
      <Stage style={{ width: '800px', height: '220px', 'align-items': 'flex-start' }}>
        <StateDecorator delay={1250} values={[1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2]} component={maxDisplay => (
          <MenuBar {...{ maxDisplay, initOpen: true }}>
            {
              Array(7).fill(0).map((_, k) => (
                <a key={k} href='#' onClick={
                  e => {
                    e.preventDefault();
                  }
                }>Item{k + 1}</a>
              ))
            }
          </MenuBar>
        )} />
      </Stage>
    );
  }
}
