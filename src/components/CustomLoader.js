import React from 'react';
import loader from '../assets/loader.svg';

const CustomLoader = ({ className = 'transparent-loader' }) => {
  return (
    <div className={`${className} text-center`}>
      <img src={loader} alt="Loading..." style={{ opacity: 1 }} />
    </div>
  );
};

export default CustomLoader;
