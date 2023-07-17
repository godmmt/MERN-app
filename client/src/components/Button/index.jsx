import React from 'react';
import './button.scss';

const Button = (props) => {
  const { children, classname, ...rest } = props;
  return (
    <button className={`customize-button ${classname}`} type='button' {...rest}>
      {children}
    </button>
  );
};

export default Button;
