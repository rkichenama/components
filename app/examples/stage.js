import React from 'react';

export default ({ children, style = {}, className = '' }) => (
  <div className={`stage ${className}`}>
    <div className='stage' {...{ style }}>
      { children }
    </div>
  </div>
);
