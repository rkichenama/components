import {
  Clear, FilledRect, BorderedRect, Rect, Arc, Circle
} from './Helpers';

describe('Canvas', () => {
  describe('Helpers', () => {
    const context = {
      clear: jest.fn(() => context),
      paint: jest.fn(() => context),
      fill: jest.fn(() => context),
      outline: jest.fn(() => context),
      stroke: jest.fn(() => context),
      begin: jest.fn(() => context),
      arc: jest.fn(() => context),
      moveTo: jest.fn(() => context),
      lineTo: jest.fn(() => context),
      end: jest.fn(() => context),
      rect: {
        clear: jest.fn(() => context),
        fill: jest.fn(() => context),
        stroke: jest.fn(() => context),
      },
      style: {
        fill: jest.fn(() => context),
        stroke: jest.fn(() => context),
      },
      gradient: {
        linear: jest.fn(() => 'fake'),
        radial: jest.fn(() => 'fake'),
      },
    };

    it('Clear', () => {
      let ret = Clear()({context});
      expect(context.clear).toHaveBeenCalled();
      // should also return 'props' given
      expect(ret).toEqual({ context });
    });

    it('FilledRect', () => {
      const coords = {x: 3, y: 5, w: 7, h: 9}, color = 'orange';
      let ret = FilledRect(coords, color)({context});

      expect(context.style.fill).toHaveBeenCalledWith(color);
      expect(context.rect.fill).toHaveBeenCalledWith(coords);
      // should also return 'props' given
      expect(ret).toEqual({ context });
    });

    it('BorderedRect', () => {
      const coords = {x: 3, y: 5, w: 7, h: 9}, border = 'orange';
      let ret = BorderedRect(coords, border)({context});

      expect(context.style.stroke).toHaveBeenCalledWith(border);
      expect(context.rect.stroke).toHaveBeenCalledWith(coords);
      // should also return 'props' given
      expect(ret).toEqual({ context });
    });

    it('Rect', () => {
      const coords = {x: 3, y: 5, w: 7, h: 9}, color = 'blue', border = 'orange';
      let ret = Rect(coords, border, color)({context});

      expect(context.style.fill).toHaveBeenCalledWith(color);
      expect(context.rect.fill).toHaveBeenCalledWith(coords);
      expect(context.style.stroke).toHaveBeenCalledWith(border);
      expect(context.rect.stroke).toHaveBeenCalledWith(coords);
      // should also return 'props' given
      expect(ret).toEqual({ context });
    });

    it('Arc', () => {
      const
        center = {x: 3, y: 5},
        radius = 7,
        curve = {from: 35, to: 210},
        color = 'blue', border = 'orange';
      let ret = Arc(center, radius, curve, color, border) ({context});

      expect(context.begin).toHaveBeenCalled();
      expect(context.arc).toHaveBeenCalledWith(center, radius, curve);
      expect(context.style.fill).toHaveBeenCalledWith(color);
      expect(context.style.stroke).toHaveBeenCalledWith(border);
      expect(context.end).toHaveBeenCalled();
      // should also return 'props' given
      expect(ret).toEqual({ context });
    });

    it('Circle', () => {
      const
        center = {x: 3, y: 5},
        radius = 7,
        curve = { from: 0, to: 2 * Math.PI },
        color = 'blue', border = 'orange';
      let ret = Circle(center, radius, color, border)({ context });

      expect(context.begin).toHaveBeenCalled();
      expect(context.arc).toHaveBeenCalledWith(center, radius, curve);
      expect(context.style.fill).toHaveBeenCalledWith(color);
      expect(context.style.stroke).toHaveBeenCalledWith(border);
      expect(context.end).toHaveBeenCalled();
      // should also return 'props' given
      expect(ret).toEqual({ context });
    });
  });
});
