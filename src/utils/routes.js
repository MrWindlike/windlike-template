import app from '../index';
import { Route } from 'dva/router';
import dynamic from 'dva/dynamic';

function routesCreator(routes = []) {
  const routeComponents = routes.map((route) => {
    const RouteComponent = dynamic({
      app,
      models: () => route.models,
      component: () => route.component,
    });

    return {
      name: route.name,
      component: (props = {}) => (
          <Route
            path={route.path}
            render={() => <RouteComponent {...props} />}
          />
      ),
    };
  });

  return routeComponents;
}

export default routesCreator;
