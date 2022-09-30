import { ChangeEvent, useCallback, useState } from 'react';

const useInput = <T>(initialValue: T): object => {
  const [value, setValue] = useState<T | string>(initialValue);
  const onChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setValue(target.value);
    },
    [],
  );

  return {
    value,
    onChange,
  };
};

export default useInput;
