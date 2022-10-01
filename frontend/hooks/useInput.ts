import { ChangeEvent, useCallback, useState } from 'react';

const useInput = <T>(initialValue: T): object => {
  const [value, setValue] = useState<T | string>(initialValue);
  const reset = useCallback(() => {
    setValue('');
  }, []);
  const onChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setValue(target.value);
    },
    [],
  );

  return {
    value,
    reset,
    onChange,
  };
};

export default useInput;
