import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from './routes/history';
import Loadable from "react-loadable";
import { Provider } from 'mobx-react';
import zhCN from "antd/lib/locale-provider/zh_CN";
import store from "./store";
import { lazyLoad } from 'web-react-base-component';

import 'web-react-base-component/lib/index.css';
import { LocaleProvider, message } from 'antd';
message.config({
  maxCount: 1
});
const Login = Loadable({
  loader: () => import('./pages/login'),
  loading: lazyLoad
});

const JFF = Loadable({
  loader: () => import('./pages'),
  loading: lazyLoad
});
function App() {
  console.log(store)
  return (
    <LocaleProvider locale={zhCN}>
      <Provider {...store}>
        <Router history={history}>
          <Switch>
            <Route path={'/login'} component={Login} />
            <Route path={'/'} component={JFF} />
          </Switch>
        </Router>
      </Provider>
    </LocaleProvider>
  );
}

export default App;
