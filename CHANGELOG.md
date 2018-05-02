[comment]: # (## [version] - date)
[comment]: # (### Added)
[comment]: # (for new features)
[comment]: # (### Changed)
[comment]: # (for changes to existing functionality)
[comment]: # (### Deprecated)
[comment]: # (soon-to-be removed features)
[comment]: # (### Removed)
[comment]: # (for features)
[comment]: # (### Fixed)
[comment]: # (for any bugs)
[comment]: # (### Security)
[comment]: # (in case of vulnerabilities)
# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
* Spinner - text spinner for blocking ui
* Toggle - A horizontal toggle component
* TreeMap - A flexbox based alternating row / column chart of relative nesting sizes
* Odometer - A vertically scrolling counter with variable with and css animations
* MenuBar - A navigation bar that allows or right aligned minimization
### Changed
* add `title` prop to ProgressBar
* updated packages
* Updated ProgressBar to accept `value` prop to be an array of values
* Implemented a Union type to translate propTypes to be more readable
* Implemented custom column render for function parameters and return values
* Update Cube transitions to be more 3d
* Add randomness to current decorators, State and Click
* Revive dice Cube example
* tweak easing for Cube


## [1.0.1] - 2018-03-01
### Changed
* Replaced non IE compatible Details/Summary tags with Info component
### Fixed
* ProgressBar
  * CSS Transforms to improve responsiveness
  * Enforce range [0, 1]
* Cube - remove false errors during testing.
* Use css transform for ProgressBar instead of adjusting width or flex-basis

## [1.0.0] - 2017-12-22
### Added
* ProgressBar
* Info
* ClickDecorator and StateDecorator
### Changed
* Redirecting focus of this repo toward a personal reusable toolkit
* Began new webpack solution for developing and showcasing components
### Removed
* React Storybook
* recompose
* 'Homage' components

## [0.1.0] - 2017-09-27
### Added
* Deck - a container for
  * Cards - 2D flipping with front and back
  * Cube - 3D flipping with top, bottom, left, right, front, and back
* Canvas - wrapper for HTML5 canvas with a functional drawing interface and chain-able context
* React DnD example
* Punchcard tribute

[Unreleased]: https://github.com/rkichenama/components/compare/1.0.1...HEAD
[1.0.1]: https://github.com/rkichenama/components/compare/1.0.0...1.0.1
[1.0.0]: https://github.com/rkichenama/components/compare/0.1.0...1.0.0
[0.1.0]: https://github.com/rkichenama/components/compare/0.0.1...0.1.0
