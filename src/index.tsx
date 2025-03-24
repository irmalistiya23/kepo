/* @refresh reload */
import './index.css';

import { render, Suspense } from 'solid-js/web';

import Layout from './layout.tsx';
import { Router } from '@solidjs/router';
import routes from '~solid-pages';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(
  () => <Router root={(props) => <Layout>{props.children}</Layout>}>{routes}</Router>,
  root,
);
