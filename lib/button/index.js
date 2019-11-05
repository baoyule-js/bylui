"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// src/components/button/index.js
var Button = function Button(_ref) {
  var text = _ref.text;

  var _useState = (0, _react.useState)(0),
      value = _useState[0],
      setValue = _useState[1];

  return _react.default.createElement("button", {
    className: "btn",
    onClick: function onClick() {
      return setValue(value + 1);
    }
  }, "\u8FD9\u662F\u4E00\u4E2A\u7EC4\u4EF6\u6309\u94AE", text + '|' + value);
};

Button.propTypes = {
  text: _propTypes.default.any
};
var _default = Button;
exports.default = _default;