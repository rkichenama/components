import React from 'react';

const Centered = story => (
  <div className='centered'>
    <div>
      {story.children || story()}
    </div>
  </div>
);

export default Centered;
