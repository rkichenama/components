(function () {
  function copyBoard (a) {
    return a.map(function (r) {
      return r.map(function (c) {
        return c;
      });
    })
  }

  function Life (field) {
    this.height = (field && field.length) || 0;
    this.width = (field && field[0].length) || 0;
    this.last = [];
    this.board = (field && copyBoard(field)) || [[]];
  }

  Life.prototype = {
    neighborsFrom: function (hood) {
      var life = this;
      return function neighborsOf(y, x) {
        var up = hood[((y - 1 + life.height) % life.height)];
        var dn = hood[((y + 1 + life.height) % life.height)];
        var lt = ((x - 1 + life.width) % life.width);
        var rt = ((x + 1 + life.width) % life.width);
        return [
          up[lt], up[x], up[rt],
          hood[y][lt], hood[y][rt],
          dn[lt], dn[x], dn[rt],
        ].reduce(function (sum, cell) {
          return sum + +!!cell;
        }, 0);
      }
    },
    get game() {
      return copyBoard(this.board);
    },
    next: function () {
      var prev = copyBoard(this.board);
      var neighbors = this.neighborsFrom(prev);
      this.last = prev;
      this.board = this.board.map(function (row, y) {
        return row.map(function (cell, x) {
          var count = neighbors(y, x);
          if (!!cell) {
            if (count < 2 || count > 3) {
              return 0;
            }
          } else if (count === 3) {
            return 1;
          }
          return cell;
        })
      });

      return this;
    }
  };

  (window || global).Life = Life;
})();
