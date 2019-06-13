import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Children from './children';
import Catcher from './error';
import Markdown from './markdown';
import Table from './table';
import Demos from './demos';
import Tests from './tests';
import Stats from './stats';

import Info from 'components/Info/Info';


class Content extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    status: PropTypes.object.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string,
    }).isRequired,
  };

  componentDidMount () { this.switchBodyClass(this.props.location) }
  componentDidUpdate () { this.switchBodyClass(this.props.location) }

  switchBodyClass ({ search }) {
    if (search) {
      // theme
      const theme = /theme=(\w+)/i.exec(search);
      theme && (document.body.className = theme[1]);
    }
  }

  render () {
    const { props: { data, location: { pathname }, status }} = this;
    const doc = data[pathname.substring(1)] || false;

    let k = 0;

    return (
      <Children>
        <article className='floating-column'>
          {
            doc ? (
              <Catcher>
                {/* introduction */}
                <section className='meta-section'>
                  <Info title={`${doc.displayName} (${doc.filename})`}>
                    {
                      doc.description ? (
                        <Markdown source={doc.description || ''} />
                      ) : (
                        <div className='empty-dataset'>no description given</div>
                      )
                    }
                  </Info>
                </section>
                {/* tests table */}
                <section className='meta-section'>
                  <Catcher>
                    <Tests component={doc.displayName} />
                  </Catcher>
                </section>
                {/* prop table */}
                <section className='meta-section'>
                  <Info title='Props'>
                    <Table {...{columns: [
                      { name: 'required', type: 'bool' },
                      'name',
                      { name: 'type', type: 'props' },
                      'defaultValue', 'description'
                    ], data: doc.props}} />
                  </Info>
                </section>
                {/* method table */}
                <section className='meta-section'>
                  <Info title='Methods'>
                    <Table {...{columns: [
                      'name',
                      { name: 'modifiers', type: 'list' },
                      { name: 'params', type: 'params' },
                      { name: 'returns', type: 'params' },
                      { name: 'docblock', type: 'markdown' },
                    ], data: doc.methods}} />
                  </Info>
                </section>
                {/* demos */}
                <Demos {...doc} key={k++} />
              </Catcher>
            ) : (
              <Catcher>
                <h2>Please select one of the components to the left</h2>
              </Catcher>
            )
          }
        </article>
        <Stats {...status} />
      </Children>
    );
  }
}

const mapStateToProps = ({ components: data, testStatus: { meta: status } }) => ({
  data,
  status
});

export default withRouter(connect(
  mapStateToProps
)(Content));
