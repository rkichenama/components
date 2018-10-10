const request = require('request-promise');
const cheerio = require('cheerio');

module.exports = username => request(`https://github.com/${username}`)
  .then(html => cheerio.load(html))
  .then($ => {
    const avatar = $('.h-card .u-photo .avatar').attr('src');
    const name = $('.vcard-names-container .vcard-names .vcard-fullname').text();
    const contributions = $('.js-contribution-graph .f4').text()
      .replace(/(\n|\r)/g, ' ')
      .replace(/ +/g, ' ')
      .trim();
    // const graph = $('.js-contribution-graph .js-calendar-graph').html();
    const history = [];
    $('.js-contribution-graph .js-calendar-graph .js-calendar-graph-svg')
      .find('rect')
        .each((i, rect) => {
          const date = $(rect).attr('data-date');
          const count = $(rect).attr('data-count');
          history[i] = { date, count };
        });

    const data = { avatar, name, contributions, history };
    console.log(data);
    // console.log($('.js-contribution-graph > .f4').text());
  });
