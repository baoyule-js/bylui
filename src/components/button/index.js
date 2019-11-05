// src/components/button/index.js

import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Button = ({ text }) => {
    const [value,setValue]= useState(0);
    return <button className="btn" onClick={()=>setValue(value+1)}>这是一个组件按钮{text+'|'+value}</button>
}

Button.propTypes = {
  text: PropTypes.any
};

export default Button;

