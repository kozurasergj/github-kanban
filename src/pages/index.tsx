import { Provider } from 'react-redux';

import { Page } from '@/components/Page';

import store from '../store/store';

export default function Home() {
  return (
    <>
      <Provider store={store}>
        <Page />
      </Provider>
    </>
  );
}
