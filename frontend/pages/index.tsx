import type { NextPage } from 'next';
import { useAppSelector } from '@store/hooks';

const Home: NextPage = () => {
  const theme = useAppSelector((state) => state.setting.theme);

  return (
    <div>
      다모드 여부:
      {' '}
      {theme}
    </div>
  );
};

export default Home;
