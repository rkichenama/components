import React from 'react';

const renderN = (n, Component, props = {}) => {
  const buckets = [];
  for (let i = 0; i < n; i++)
    buckets[i] = (<Component key={i} ind={i} {...props} />);
  return buckets;
};

export { renderN };
