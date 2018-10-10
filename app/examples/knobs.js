import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const strValue = str => str.replace(/^['"`]/, '').replace(/['"`]$/, '');

const figure = ({ type, name, defaultValue: { value: defValue = '' } = {} }) => (
  { value = defValue, checked = /true/i.test(value) } = {}, handleChange = () => {}
) => {
  let input;
  switch (type.name) {
    case 'bool':
      value = checked;
      input = (
        <input
          type='checkbox'
          name={name}
          checked={value}
          onChange={handleChange({ type, name })}
        />
      );
      break;
    case 'enum':
      value = strValue(value);
      input = (
        <ul className='unstyled'>
          {
            type.value.map(({ value: v, key = strValue(v)}) => (
              <li key={key}>
                <label>
                  <input
                    type='radio'
                    name={name}
                    value={key}
                    checked={ key === value}
                    onChange={handleChange({ type, name })}
                  />
                  { key }
                </label>
              </li>
            ))
          }
        </ul>
      );
      break;
    case 'string':
      value = strValue(value);
    default:
      input = (
        <input
          type='text'
          name={name}
          value={value}
          onChange={handleChange({ type, name })}
        />
      );
      break;
  }
  return { input, value };
};

class Knobs extends PureComponent {
  static propTypes = {
    /** The 'displayName' for the component. Needs to be specified because prod mangles component ids */
    name: PropTypes.string.isRequired,
    /** the metadata for the specific component */
    component: PropTypes.shape({
      description: PropTypes.string,
      displayName: PropTypes.string,
      filename: PropTypes.string,
      methods: PropTypes.arrayOf(PropTypes.object),
      props: PropTypes.arrayOf(
        PropTypes.shape({
          defaultValue: PropTypes.shape({
            computed: PropTypes.bool,
            value: PropTypes.string,
          }),
          description: PropTypes.string,
          name: PropTypes.string.isRequired,
          required: PropTypes.bool,
          type: PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.any,
          })
        })
      )
    }).isRequired,
    //
    children: PropTypes.element.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
  }

  figureOutValue = this.props.component.props
    .filter(({ name }) => !/^(children|className)$/i.test(name))
    .filter(({ type: { name }}) => !/^func/.test(name))
    .reduce((keys, prop) => Object.assign(keys, { [prop.name]: figure(prop) }), {})

  state = Object.keys(this.figureOutValue)
    .reduce((state, key) => Object.assign(state, { [key]:  this.figureOutValue[key]().value })
    , {})

  handleChange = prop => evt => {
    const { target } = evt;
    this.setState(state => Object.assign(
      {},
      state,
      {
        [target.name]: this.figureOutValue[target.name](target).value
      }
    ));
  }

  renderKnob = name => {
    return (
      <section className='knob' key={name}>
        <label>
          { name }
          { this.figureOutValue[name]({ value: this.state[name] }, this.handleChange).input }
        </label>
      </section>
    );
  }

  render () {
    const {
      props: { children, className, style },
      state,
      renderKnob
    } = this;

    return (
      <div className={`knobs${className ? ` ${className}` : ''}`}>
        <div style={{ width: "20%" }}>
          {
            Object.keys(this.figureOutValue)
              .map(renderKnob)
          }
        </div>
        <div className='stage' style={ Object.assign({}, style, { width: "80%" })}>
          { React.cloneElement(children, state) }
        </div>
      </div>
    );
  }
}

export default connect(
  ({ components }, { name  }) => ({
    component: components[name]
  })
)(Knobs);
