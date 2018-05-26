import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { Router } from 'dva/router';
import React from 'react';
import FrontLayout from './routes/FrontLayout/FrontLayout';
import BackLayout from './routes/BackLayout/BackLayout';

function RouterConfig({ history }) {
  return (
    <LocaleProvider locale={zh_CN}>
      <Router history={history}>
        <FrontLayout></FrontLayout>
        {/* <BackLayout isCollapsible isCloseWhenOpenOther /> */}
      </Router>
    </LocaleProvider >
  );
}

export default RouterConfig;
