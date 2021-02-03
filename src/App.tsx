import { StylesProvider } from '@material-ui/core';
import { IndexPage } from 'pages';
import { FC } from 'react';

export const App: FC = () => (
  <StylesProvider injectFirst>
    <IndexPage />
  </StylesProvider>
);
