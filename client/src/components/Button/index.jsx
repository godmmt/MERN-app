import React from 'react';
import './button.scss';

const Button = (props) => {
  const {
    children,
    cx, // other classNames
    ...rest
  } = props;

  return (
    <button className={`customize-button ${cx}`} type='button' {...rest}>
      {children}
    </button>
  );
};

export default Button;
