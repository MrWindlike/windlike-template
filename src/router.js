import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { Router } from 'dva/router';
import React from 'react';
import BackLayout from './routes/BackLayout';

function RouterConfig({ history }) {
  return (
    <LocaleProvider locale={zh_CN}>
      <Router history={history}>
        <BackLayout isCollapsible isCloseWhenOpenOther />
      </Router>
    </LocaleProvider >
  );
}

export default RouterConfig;
