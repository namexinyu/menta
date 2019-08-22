import Loadable from "react-loadable";
import { lazyLoad } from 'web-react-base-component';

export default [
  {
    path: '/conpany/conpanylist',
    component: Loadable({
      loader: () => import('../pages//company/company-list'),
      loading: lazyLoad
    })
  }, {
    path: '/CompanyStar',
    component: Loadable({
      loader: () => import('../pages//company/company-star'),
      loading: lazyLoad
    })
  }
];
