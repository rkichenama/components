import React from 'react';
import { mount } from 'enzyme';
import axios from 'axios';
import moxios from 'moxios';
import GitHubProfile from './GitHubProfile';

describe('GitHubProfile', () => {
  beforeEach(() => { moxios.install() });
  afterEach(() => { moxios.uninstall() });

  it('will silently handle errors', done => {
    let comp = mount(<GitHubProfile />);
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: { },
      }).then(() => {
        expect(comp.state('name')).toBe('');
        expect(comp.state('avatar_url')).toBe('');
        expect(comp.state('html_url')).toBe('');
        expect(comp.state('location')).toBe('');
        done();
      });
    });
  });

  it('will load some github profile info when given a username prop', done => {
    let comp = mount(<GitHubProfile username={'rkichenama'} />);
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          'avatar_url': 'avatar',
          'name': 'Richard Kichenama',
          'html_url': 'github.io',
          'location': 'Right Here',
        },
      }).then(() => {
        expect(comp.state('name')).toBe('Richard Kichenama');
        expect(comp.state('avatar_url')).toBe('avatar');
        expect(comp.state('html_url')).toBe('github.io');
        expect(comp.state('location')).toBe('Right Here');
        done();
      });
    });
  });

  it('changes state when updated with new props', done => {
    let comp = mount(<GitHubProfile />);
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: { },
      }).then(() => {
        expect(comp.state('name')).toBe('');
        expect(comp.state('avatar_url')).toBe('');
        expect(comp.state('html_url')).toBe('');
        expect(comp.state('location')).toBe('');

        comp.setProps({ username: 'rkichenama' });
        moxios.wait(() => {
          let request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: {
              'avatar_url': 'avatar',
              'name': 'Richard Kichenama',
              'html_url': 'github.io',
              'location': 'Right Here',
            },
          }).then(() => {
            expect(comp.state('name')).toBe('Richard Kichenama');
            expect(comp.state('avatar_url')).toBe('avatar');
            expect(comp.state('html_url')).toBe('github.io');
            expect(comp.state('location')).toBe('Right Here');
            done();
          });
        });
      });
    });
  });
  
});
