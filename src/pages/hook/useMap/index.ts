import { useState, useMemo } from 'react';

interface Actions<T, U> {
  set: (key: T, value: U) => void;
  get: (key: T) => U | undefined;
  setAll: (newMap: Iterable<[T, U]>) => void;
  remove: (key: T) => void;
  reset: () => void;
}

function useMap<T, U>(
  initialValue?: Iterable<[T, U]>,
): [Map<T, U>, Actions<T, U>] {
  const initialMap = useMemo<Map<T, U>>(
    () => new Map(initialValue ? initialValue : new Map()),
    [],
  );

  const [state, setState] = useState(initialMap);

  const actions = useMemo<Actions<T, U>>(() => {
    const set = (key: T, value: U) => {
      setState(prev => {
        const newMap = new Map(prev);
        newMap.set(key, value);
        return newMap;
      });
    };

    const get = (key: T) => {
      return state.get(key);
    };

    const setAll = (newMap: Iterable<[T, U]>) => {
      setState(new Map(newMap));
    };

    const remove = (key: T) => {
      setState(prev => {
        const newMap = new Map(prev);
        newMap.delete(key);
        return newMap;
      });
    };

    const reset = () => {
      setState(initialMap);
    };
    return { set, get, setAll, remove, reset };
  }, [initialMap]);

  return [state, actions];
}

export default useMap;
