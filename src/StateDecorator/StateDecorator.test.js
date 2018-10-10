import React from 'react';
import { mount } from 'enzyme';
import StateDecorator from './StateDecorator';

describe('StateDecorator', () => {
  const spy = jasmine.createSpy('react').and.returnValue(<span>Test</span>);
  let decorated;

  jest.useFakeTimers();

  beforeEach(() => {
    spy.calls.reset();
  });

  describe('sequence', () => {
    it('should push down the next value to component', () => {
      decorated = mount(
        <StateDecorator delay={100} values={['aaa', 'bbb']} component={spy} />
      );
      expect(decorated.state('value')).toBe('aaa');
      jest.runTimersToTime(StateDecorator.instances * 200 + 101);
      expect(spy).toHaveBeenCalledWith('bbb');
    });

    it('should change saved values list', () => {
      decorated = mount(
        <StateDecorator delay={100} values={['aaa', 'bbb']} component={spy} />
      );
      const [next, ...values] = decorated.state('values');
      jest.runTimersToTime(StateDecorator.instances * 200 + 101);
      const vals = decorated.state('values');
      expect(vals[vals.length - 1]).toBe(next);
      values.forEach((val, v) => {
        expect(vals[v]).toBe(val);
      });
    });
  });

  describe('random', () => {
    it('should not change the order of the items in state', () => {
      decorated = mount(
        <StateDecorator seq={false} delay={100} values={['aaa', 'bbb']} component={spy} />
      );
      jest.runTimersToTime(StateDecorator.instances * 200 + 101);
      expect(decorated.state('values')).toEqual(['bbb', 'aaa']);
    });
  });
});
