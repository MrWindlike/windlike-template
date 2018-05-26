import routesCreator from 'Utils/routes';

export default routesCreator([
  {
    name: '首页',
    path: '/default-menu/default',
    models: [import('./models/demo')],
    component: import('./routes/IndexPage'),
  },
]);
