import React, { useState, useRef } from 'react';
import useEventListener from '../hook/useEventListener';

export default () => {
  const [value, setValue] = useState(0);

  const clickHandler = (event: Event) => {
    setValue(value + 1);
    console.log(event)
  };

  const ref = useRef(null);
  useEventListener('click', ref.current, clickHandler);

  return (
    <button ref={ref} type="button">
      You click {value} times
    </button>
  );
};
