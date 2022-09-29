import type { NextPage } from 'next';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { decrement, increment } from '@store/modules/counterSlice';

const Home: NextPage = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const incrementCount = () => {
    dispatch(increment());
  };

  const decrementCount = () => {
    dispatch(decrement());
  };

  return (
    <div>
      테덕스 리스트 카운트:
      {count}
      <br />
      <button type="button" onClick={incrementCount}>더하기</button>
      <button type="button" onClick={decrementCount}>빼기</button>
    </div>
  );
};

export default Home;
