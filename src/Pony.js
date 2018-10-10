/* global union */
import React from 'react';

const RemoteData = union([
  'NotAsked',
  'Pending',
  'Success',
  'Failure'
]);

const fetchPony = () =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      if (Math.random() > 0.2) {
        return resolve({
          name: 'Twilight Sparkle',
          type: 'Unicorn',
          element: 'Magic',
        });
      }
      return reject({
        message: `I just don't know what went wrong.`,
      });
    }, 500)
  );

export default class Pony extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: RemoteData.NotAsked(),
    };
  }

  fetchData = () => {
    this.setState({ data: RemoteData.Pending() });
    fetchPony()
      .then(pony => this.setState({ data: RemoteData.Success(pony) }))
      .catch(err => this.setState({ data: RemoteData.Failure(err) }));
  };

  render() {
    return this.state.data.match({
      NotAsked: () => (
        <div>
          <h1>Press &quot;load&quot;</h1>
          <button onClick={this.fetchData}>Load!</button>
        </div>
      ),
      Pending: () => (
        <div>
          <h1>Loading...</h1>
        </div>
      ),
      Success: ({ name, type, element }) => (
        <div>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Type:</strong> {type}
          </p>
          <p>
            <strong>Element of Harmony:</strong> {element}
          </p>
          <button onClick={this.fetchData}>Reload</button>
        </div>
      ),
      Failure: ({ message }) => (
        <div>
          <p>{message}</p>
          <button onClick={this.fetchData}>Retry</button>
        </div>
      ),
    });
  }
}
