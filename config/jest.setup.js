var Enzyme = require('enzyme');
// var Adapter = require('enzyme-adapter-react-16');
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
