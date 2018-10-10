import React from 'react';
import { mount } from 'enzyme';
import Spinner from './Spinner';

describe('Spinner', () => {
  class Ex extends React.Component {
    render () { return (<span />) }
  }
  const props = {
    first: 'primary',
    second: 'secondary',
    third: 'tertiary',
    fourth: () => (`I'm a function!`)
  };
  const render = block => mount(
    <Spinner for={Ex} test={() => block} {...props} />
  );

  it('should pass to a component pruned props', () => {
    const spinner = render(false);
    expect(spinner.find(Ex).props()).toEqual(props);
  });

  it('should cover a component with a spinner', () => {
    const spinner = render(true);
    expect(spinner.find('.spinner')).toHaveLength(1);
  });

  it('should not cover a component with a spinner', () => {
    const spinner = render(false);
    expect(spinner.find('.rrk-spinner .spinner')).toHaveLength(0);
  });
});
