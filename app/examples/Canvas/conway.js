import React, { Component } from 'react';
import { Stage } from '../';
import Canvas, {
  Clear, FilledRect, BorderedRect, Rect, Circle
} from 'components/Canvas/Canvas';

const copyBoard = a => a.map(r => r.map(c => c));

class Life {
  constructor (field) {
    this.height = (field && field.length) || 0;
    this.width = (field && field[0].length) || 0;
    this.last = [];
    this.board = (field && copyBoard(field)) || [[]];
  }

  /** this defines a public read only member */
  get game() { return copyBoard(this.board); }

  /** this board wraps edges */
  neighborsFrom = hood => (y, x) => {
      const up = hood[((y - 1 + this.height) % this.height)];
      const dn = hood[((y + 1 + this.height) % this.height)];
      const lt = ((x - 1 + this.width) % this.width);
      const rt = ((x + 1 + this.width) % this.width);

      return [
        up[lt], up[x], up[rt],
        hood[y][lt], hood[y][rt],
        dn[lt], dn[x], dn[rt],
      ].reduce(function (sum, cell) {
        return sum + +(cell > .5);
      }, 0);
    }

  next = () => {
    const prev = copyBoard(this.board);
    const neighbors = this.neighborsFrom(prev);
    this.last = prev;
    this.board = this.board.map((row, y) => row.map((cell, x) => {
      const count = neighbors(y, x);
      return (cell > .5)
        ? (count < 2 || count > 3)
          ? .3
          : 1
        : (count === 3)
          ? .7
          : 0
    }));
    // enable chaining
    return this;
  }
}

const size = 240;
const randBoard = () => {
  const b = Array(Math.floor(size / 4)).fill(Array(Math.floor(size / 4)).fill(0));
  return b.map(r => r.map(c => +!!(Math.random() > 0.7)));
}
export default class extends React.Component {
  state = {
    life: new Life(randBoard()),
    board: [],
    cycle: false,
    refresh: false,
  }
  componentDidMount () {
    this.setState({
      cycle: setInterval(() => {
        this.setState(({ life }) => ({ board: life.next().board }));
      }, 150),
      refresh: setInterval(() => {
        this.setState({ life: new Life(randBoard()) })
      }, 1000 * 60 * 2.5)
    })
  }
  render () {
    return (
      <Stage>
        <Canvas width={size} height={size} style={{ backgroundColor: '#fff' }} scene={[
          Clear(),
          args => {
            this.state.board.forEach((row, y) => {
              row.forEach((col, x) => {
                if (col > 0) {
                  if (col > .7) {
                    FilledRect({x: x * 4, y: y * 4, w: 4, h: 4}, '#000')(args)
                  } else if (col > .3) {
                    FilledRect({x: x * 4, y: y * 4, w: 4, h: 4}, '#5b714b')(args)
                  } else {
                    FilledRect({x: x * 4, y: y * 4, w: 4, h: 4}, '#ff3333')(args)
                  }
                }
              })
            })
          }
        ]} />
      </Stage>
    );
  }
}
