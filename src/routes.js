import dynamic from 'dva/dynamic';
import app from './index';

export const IndexPage = dynamic({
  app,
  models: () => [
    import('./models/demo'),
  ],
  component: () => import('./routes/IndexPage'),
});
