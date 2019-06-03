# components
[![CircleCI](https://circleci.com/gh/rkichenama/components/tree/develop.svg?style=svg)](https://circleci.com/gh/rkichenama/components/tree/develop)
[![CodeFactor](https://www.codefactor.io/repository/github/rkichenama/components/badge)](https://www.codefactor.io/repository/github/rkichenama/components)

A library of reusable React components with a documentation app which features documentation, coverage, test results, and examples.

Project use webpack for build and dev, and jest for testing

## https://rkichenama.github.io/
* app - the documentation app
* config - misc configuration and mock files
* lib - the compiled component library, updated only in tags, TBD
* doc - the 'public' folder
* src - component source

## Roadmap
* convert to typescript
* docker service
  * add a nodejs docker image where jest is run
    * goal is to set up a service that will take a regex (defaults to all) of the test file, maybe a specific test, and for the container to pull the branch, install dependencies, run the test(s), and return the output (with coverage)
  * set up a github action that will trigger the docker service above through a webhook
  * create a (web|service) worker that will manage memoizing responses from a webhook to trigger the docker service
  * base all test results on promises returned from worker
* create and use a grid/flexbox layout style framework
* use (css modules|styled-components) in components
  * customize with custom properties(?)
