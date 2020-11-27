import { useEffect, useRef } from 'react';

type TargetElement = HTMLElement | Element | Document | Window;

function useEventListener(
  eventType: string,
  target: TargetElement | null,
  handler: Function,
) {
  const fnHandler = useRef<Function>();
  useEffect(() => {
    fnHandler.current = handler;
  }, [handler]);
  useEffect(() => {
    const eventHandler = (event: Event) => {
      return fnHandler.current && fnHandler.current(event);
    };
    const currentTarget = target || window;
    currentTarget.addEventListener(eventType, eventHandler);
    return () => {
      currentTarget.removeEventListener(eventType, eventHandler);
    };
  }, [target, eventType]);
}

export default useEventListener;
