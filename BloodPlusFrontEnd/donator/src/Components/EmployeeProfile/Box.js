'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HBox = exports.VBox = undefined;

var _class, _temp, _class2, _temp2, _class3, _temp3;

var _Element2 = require('./Element');

var _Element3 = _interopRequireDefault(_Element2);

var _Stylesheet = require('./Stylesheet');

var _Stylesheet2 = _interopRequireDefault(_Stylesheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var boxStylesheet = (0, _Stylesheet2.default)('Box', {
  base: {
    position: 'relative',

    overflow: 'hidden',

    margin: 0,
    padding: 0,

    display: 'flex',
    alignItems: 'stretch',
    flexBasis: 'auto',
    flexShrink: 0,

    minHeight: 0,
    minWidth: 0
  }
});

boxStylesheet.inject();

var Box = (_temp = _class = function (_Element) {
  _inherits(Box, _Element);

  function Box() {
    _classCallCheck(this, Box);

    return _possibleConstructorReturn(this, (Box.__proto__ || Object.getPrototypeOf(Box)).apply(this, arguments));
  }

  return Box;
}(_Element3.default), _class.className = boxStylesheet.toClassName(), _temp);
var VBox = exports.VBox = (_temp2 = _class2 = function (_Box) {
  _inherits(VBox, _Box);

  function VBox() {
    _classCallCheck(this, VBox);

    return _possibleConstructorReturn(this, (VBox.__proto__ || Object.getPrototypeOf(VBox)).apply(this, arguments));
  }

  return VBox;
}(Box), _class2.defaultProps = Object.assign({}, Box.defaultProps, {
  flexDirection: 'column'
}), _temp2);
var HBox = exports.HBox = (_temp3 = _class3 = function (_Box2) {
  _inherits(HBox, _Box2);

  function HBox() {
    _classCallCheck(this, HBox);

    return _possibleConstructorReturn(this, (HBox.__proto__ || Object.getPrototypeOf(HBox)).apply(this, arguments));
  }

  return HBox;
}(Box), _class3.defaultProps = Object.assign({}, Box.defaultProps, {
  flexDirection: 'row'
}), _temp3);
