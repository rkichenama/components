import React from 'react';
import { mount } from 'enzyme';
import Card from './Card';

describe('Card', () => {
  let card;

  describe('properly rendered', () => {
    let onClick;

    beforeEach(() => {
      onClick = jasmine.createSpy();
      card = mount(
        <Card {...{onClick}}>
          <div>1</div>
          <div>2</div>
        </Card>
      );
    });

    it('should trigger a callback when clicked', () => {
      expect(onClick).not.toHaveBeenCalled();
      card.find('.flip').simulate('click');
      expect(onClick).toHaveBeenCalled();
    });

    it('should toggle a class when prop changes', () => {
      expect(card.find('.card').hasClass('flipped')).toBeFalsy();
      card.setProps({ flipped: true });
      expect(card.find('.card').hasClass('flipped')).toBeTruthy();
    });
  });

  describe('improperly rendered', () => {
    it('should render no children', () => {
      card = mount(<Card />);
      expect(card.find('.flip > .front').children().length).toBe(0);
      expect(card.find('.flip > .back').children().length).toBe(0);
    });

    it('should render one child', () => {
      card = mount(<Card><div>1</div></Card>);
      expect(card.find('.flip > .front').children().length).toBe(1);
      expect(card.find('.flip > .back').children().length).toBe(0);
    });

    it('should render two children', () => {
      card = mount(<Card className='classy'><div>1</div><div>2</div><div>3</div></Card>);
      expect(card.find('.flip > div').length).toBe(2);
      expect(card.find('.flip > .front').children().length).toBe(1);
      expect(card.find('.flip > .back').children().length).toBe(1);
    });

  });
});
