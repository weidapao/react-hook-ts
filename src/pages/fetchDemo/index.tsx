import React, { useState, useRef } from 'react';
import useFetch from '../hook/useFetch';

export default () => {
  const [data, loading, error] = useFetch<{ name: string }>('/api/ggg', {
    id: 12345,
  });

  return <span>{data?.name}</span>;
};
