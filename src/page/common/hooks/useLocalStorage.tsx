import { useEffect, useState } from "react";

type LocalStorageType<T> = [T, (value: T) => void];

const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): LocalStorageType<T> => {
  const [value, setValue] = useState<T>(initialValue);
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

export default useLocalStorage;
