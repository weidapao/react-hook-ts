import React, { useEffect, useState } from 'react';
import {Button} from 'antd'
import useDebounce from '../hook/useDebounce'
export default function() {
  const [counter1, setCounter1] = useState(0);

  const [counter2, setCounter2] = useState(0);

  const handleClick = useDebounce(function() {
    console.count('click1');

    setCounter1(counter1 + 1);
  }, 500);

  useEffect(function() {
    const t = setInterval(() => {
      setCounter2(x => x + 1);
    }, 500);

    return clearInterval.bind(undefined, t);
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <Button
        onClick={function() {
          handleClick();
        }}
      >
        click
      </Button>

      <div>{counter1}</div>

      <div>{counter2}</div>
    </div>
  );
}
