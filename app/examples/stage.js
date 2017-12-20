import React from 'react';

export default ({ children, style = {} }) => (
  <div className='stage'>
    <div className='stage' {...{ style }}>
      { children }
    </div>
  </div>
);
