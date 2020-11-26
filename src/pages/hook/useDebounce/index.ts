import { useCallback, useEffect, useState, useRef } from 'react';

type Fn = (...args: any) => any;
type Timer = ReturnType<typeof setTimeout>;

const useDebounce = (fn: Fn, ms: number): Fn => {
  const timer = useRef<Timer | null>();
  function executeFn(...args: any[]) {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      fn.apply(undefined, args);
      timer.current = null;
    }, ms);
  }
  return executeFn;
};

export default useDebounce;
