import Context from './Context';

describe('Canvas', () => {
  describe('Context', () => {
    const context = {
      fillStyle: false,
      strokeStyle: false,
      clearRect: jest.fn(() => ('fake')),
      fillRect: jest.fn(() => ('fake')),
      strokeRect: jest.fn(() => ('fake')),
      fill: jest.fn(() => ('fake')),
      stroke: jest.fn(() => ('fake')),
      fillStyle: jest.fn(() => ('fake')),
      strokeStyle: jest.fn(() => ('fake')),
      beginPath: jest.fn(() => ('fake')),
      arc: jest.fn(() => ('fake')),
      moveTo: jest.fn(() => ('fake')),
      lineTo: jest.fn(() => ('fake')),
      closePath: jest.fn(() => ('fake')),
      createLinearGradient: jest.fn(() => ('fake')),
      createRadialGradient: jest.fn(() => ('fake')),
    };
    const canvas = {
      getBoundingClientRect: () => ({ width: 200, height: 200 }),
      getContext: () => context,
    };
    let ctx;

    beforeEach(() => {
      ctx = Context(canvas);
    });

    [
      [ 'clear', 'clearRect' ],
      [ 'paint', 'fill' ],
      [ 'outline', 'stroke' ],
      [ 'begin', 'beginPath' ],
      [ 'end', 'closePath' ],
      // [ 'arc', 'arc' ],
      // [ 'moveTo', 'moveTo' ],
      // [ 'lineTo', 'lineTo' ],
    ].forEach(([ wrapper, wrapped ]) => {
      it(`wraps ${wrapped} via ${wrapper}`, () => {
        ctx[wrapper]();
        expect(context[wrapped]).toHaveBeenCalled();
      });
    });

    [
      // [ 'arc', 'arc' ],
      [ 'moveTo', 'moveTo' ],
      [ 'lineTo', 'lineTo' ],
    ].forEach(([ wrapper, wrapped ]) => {
      it(`wraps ${wrapped} via ${wrapper}`, () => {
        const spot = { x: 90, y: 32 };
        ctx[wrapper](spot);
        expect(context[wrapped]).toHaveBeenCalledWith(spot.x, spot.y);
      });
    });

    it('wraps arc with arc', () => {
      const spot = { x: 90, y: 32 };
      const angles = { from: 45, to: 270 };
      const radius = 24;
      ctx.arc(spot, radius, angles);
      expect(context.arc).toHaveBeenCalledWith(
        spot.x, spot.y, radius, angles.from, angles.to
      );
    });

    describe('gradients (not chainable)', () => {
      let gradient;

      beforeEach(() => {
        ({ gradient } = ctx);
      });

      it('wraps createLinearGradient with gradient.linear', () => {
        const start = { x: 0, y: 32 };
        const end = { x: 32, y: 0 };
        gradient.linear(start, end);
        expect(context.createLinearGradient).toHaveBeenCalledWith(
          start.x, start.y, end.x, end.y
        );
      });

      it('wraps createRadialGradient with gradient.radial', () => {
        const start = { x: 0, y: 32 };
        const radius1 = 4;
        const end = { x: 32, y: 0 };
        const radius2 = 7;
        gradient.radial(start, radius1, end, radius2);
        expect(context.createRadialGradient).toHaveBeenCalledWith(
          start.x, start.y, radius1,
          end.x, end.y, radius2
        );
      });
    });

    describe('rect', () => {
      let rect;

      beforeEach(() => {
        ({ rect } = ctx);
      });

      it('wraps clearRect with rect.clear', () => {
        const x = 6, y = 4, w = 13, h = 17;
        rect.clear(x, y, w, h);
        expect(context.clearRect).toHaveBeenCalledWith(x, y, w, h);
      });

      it('wraps fillRect with rect.fill', () => {
        const x = 6, y = 4, w = 13, h = 17;
        rect.fill({x, y, w, h});
        expect(context.fillRect).toHaveBeenCalledWith(x, y, w, h);
      });

      it('wraps strokeRect with rect.stroke', () => {
        const x = 6, y = 4, w = 13, h = 17;
        rect.stroke({x, y, w, h});
        expect(context.strokeRect).toHaveBeenCalledWith(x, y, w, h);
      });
    });

    describe('style', () => {
      let style;

      beforeEach(() => {
        ({ style } = ctx);
      });

      it('wraps fillStyle with style.fill', () => {
        context.fillStyle = 'black',
        style.fill('orange');
        expect(context.fillStyle).toBe('orange');
      });

      it('wraps strokeStyle with style.stroke', () => {
        context.strokeStyle = 'black';
        style.stroke('orange');
        expect(context.strokeStyle).toBe('orange');
      });
    });

  });
});
