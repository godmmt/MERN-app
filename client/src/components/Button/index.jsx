import React from 'react';
import Loading from 'components/Loading';
import './button.scss';

const Button = (props) => {
  const {
    children = '',
    cx, // other classNames
    loading = false,
    disabled = false,
    type = 'button',
    ...rest
  } = props;

  const loadingClassName = loading ? 'loading-button' : '';

  return (
    <button className={`customize-button ${cx} ${loadingClassName}`} type={type} disabled={loading || disabled} {...rest}>
      {loading ? <Loading /> : children}
    </button>
  );
};

export default Button;
