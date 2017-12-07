import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Catcher from './error';
import Markdown from './markdown';
import Table from './table';
import Demos from './demos';

class Content extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
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
      const theme = /theme\=(\w+)/i.exec(search);
      theme && (document.body.className = theme[1]);
    }
  }

  render () {
    const { props: { data, location: { pathname } }} = this;
    const doc = data[pathname.substring(1)] || false;
    
    let k = 0;

    return (
      <article className='floating-column'>
      {
        doc ? (
          <Catcher>
            {/* introduction */}
            <section>
              <h1>{doc.displayName}</h1>
              <h2>{doc.filename}</h2>
              {
                doc.description ? (
                  <Markdown source={doc.description} />
                ) : (
                  <div className='empty-dataset'>no description given</div>
                )
              }
            </section>
            {/* prop table */}
            <section>
              <h3>Props</h3>
              <Table {...{columns: [
                { name: 'required', type: 'bool' },
                'name', 'type', 'defaultValue', 'description'
              ], data: doc.props}} />
            </section>
            {/* method table */}
            <section>
              <h3>Methods</h3>
              <Table {...{columns: [
                'name', /* 'modifiers',*/ {
                  name: 'params', type: 'table'
                },
                {
                  name: 'returns', type: 'table'
                }, 'docblock',
              ], data: doc.methods}} />
            </section>
            {/* demos */}
            <Demos {...doc} key={k++} />
          </Catcher>
        ) : (
          `Please select one of the components to the left`
        )
      }
      </article>
    );
  }
}

const mapStateToProps = ({ components: data }) => ({
  data
});

export default withRouter(connect(
  mapStateToProps
)(Content));
