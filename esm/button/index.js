// src/components/button/index.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.css';

var Button = function Button(_ref) {
  var text = _ref.text;

  var _useState = useState(0),
      value = _useState[0],
      setValue = _useState[1];

  return React.createElement("button", {
    className: "btn",
    onClick: function onClick() {
      return setValue(value + 1);
    }
  }, "\u8FD9\u662F\u4E00\u4E2A\u7EC4\u4EF6\u6309\u94AE", text + '|' + value);
};

Button.propTypes = {
  text: PropTypes.any
};
export default Button;