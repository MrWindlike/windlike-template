import routesCreator from 'Utils/routes';

export default routesCreator([
  {
    name: '首页',
    path: '/default-menu/default',
    models: [import('./models/demo')],
    component: import('./routes/IndexPage'),
  },
  {
    name: '关于',
    path: '/menu/submenu',
    models: [import('./models/demo')],
    component: import('./routes/IndexPage'),
  },
]);
