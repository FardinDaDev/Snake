// Custom Hook by Dan Abramov, https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// TypeScript Added by Mario Kandut

import { useEffect, useRef } from 'react';

export function useInterval(callback: any, delay: number | null) {
  const savedCallback = useRef<() => void | null>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (typeof savedCallback?.current !== 'undefined') {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}