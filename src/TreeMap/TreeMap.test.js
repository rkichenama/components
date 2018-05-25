import React from 'react';
import { mount } from 'enzyme';
import TreeMap from './TreeMap';

const randUnder = ceil => Math.ceil(Math.random() * ceil);
const randBetween = (ceil, floor = 0) => floor + randUnder(ceil);
const randStr = () => Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0,4);
const generateDemoTree = (depth, max = randBetween(100000, 10)) => {
  if (depth <= 0) { return [] }
  return Array(randUnder(5)).fill(0)
    .map((_, i) => {
      const size = randBetween(max, 10);
      return {
        size,
        name: randStr(),
        tree: generateDemoTree(depth - 1, size),
      }
    });
};
const depth = 10;

xdescribe('TreeMap', () => {
  it('should render a treemap');
});
