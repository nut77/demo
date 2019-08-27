import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';
import { routerRedux } from 'dva';

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/',
    component: require('../../layout').default,
    routes: [
      {
        path: '/',
        component: require('../Home').default,
        exact: true,
      },
      {
        path: '/home',
        component: require('../Home').default,
        exact: true,
      },
      {
        path: '/tab',
        component: require('../Tab').default,
        exact: true,
      },
      {
        path: '/dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            component: require('../Dashboard/Analysis').default,
            exact: true,
          },
          {
            path: '/dashboard/monitor',
            component: require('../Dashboard/Monitor').default,
            exact: true,
          },
          {
            path: '/dashboard/workplace',
            component: require('../Dashboard/Workplace').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('F:/github/demo/react/pro/antd-course/node_modules/_umi-build-dev@1.10.14@umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/page', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/puzzlecard',
        component: require('../PuzzleCard').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('F:/github/demo/react/pro/antd-course/node_modules/_umi-build-dev@1.10.14@umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/page', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: () =>
      React.createElement(
        require('F:/github/demo/react/pro/antd-course/node_modules/_umi-build-dev@1.10.14@umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/page', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
history.listen(routeChangeHandler);
routeChangeHandler(history.location);

export { routes };

export default function RouterWrapper(props = {}) {
  return <Router history={history}>{renderRoutes(routes, props)}</Router>;
}
