import { useEffect, useState } from "react";

export const useDebounce = (
  callback: Function,
  delay: number,
  dependencies: any[]
) => {
  const [debouncedCallback, setDebouncedCallback] = useState<Function>(
    () => callback
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCallback(() => callback);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [...dependencies, callback, delay]);

  return debouncedCallback;
};
