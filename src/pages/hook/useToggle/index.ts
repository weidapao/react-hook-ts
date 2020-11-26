import { useMemo } from 'react';
import { useState } from 'react';

type IState = string | number | boolean | undefined;

interface Actions<T = IState> {
  toggle: (value?: T) => void;
  setLeft: () => void;
  setRight: () => void;
}

function useToggle<T = IState>(defaultValue: T): [T, Actions<T>];
function useToggle<T = boolean>(): [boolean, Actions<T>];
function useToggle<T = IState, U = IState>(
  defaultValue: T,
  reverseValue: U,
): [T | U, Actions<T | U>];

function useToggle<T extends IState = IState, U extends IState = IState>(
  defaultValue: T = false as T,
  reverseValue?: U,
) {
  const [state, setState] = useState<T | U>(defaultValue);
  const actions = useMemo(() => {
    const reverseOriginal = (reverseValue ? reverseValue : !defaultValue) as
      | T
      | U;
    const setLeft = () => {
      setState(defaultValue);
    };
    const setRight = () => {
      setState(reverseOriginal);
    };
    const toggle = (value: T | U) => {
      if (value !== undefined) {
        setState(value);
        return;
      }
      setState(state =>
        state === defaultValue ? reverseOriginal : defaultValue,
      );
    };
    return { setLeft, setRight, toggle };
  }, [defaultValue, reverseValue]);
  return [state, actions];
}

export default useToggle;
