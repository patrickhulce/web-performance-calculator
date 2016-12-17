import MainLayout from 'src/layouts/main'

import homeRoute from './home'

export default function (store) {
  return {
    path: '/',
    indexRoute: homeRoute(store),
    getComponent(nextState, next) {
      next(null, MainLayout)
    },
    childRoutes: [
      {path: '*', onEnter: (s, replace) => replace('/')},
    ],
  }
}
