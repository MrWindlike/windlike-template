import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { Router } from 'dva/router';
import React from 'react';
import FrontLayout from './routes/Layout/FrontLayout';
import BackLayout from './routes/Layout/BackLayout';

function RouterConfig({ history }) {
  return (
    <LocaleProvider locale={zh_CN}>
      <Router history={history}>
        {/* 前台布局 */}
        <FrontLayout history={history} />
        {/* 后台布局 */}
        {/* <BackLayout
         isCollapsible 
         isCloseWhenOpenOther /> */}
      </Router>
    </LocaleProvider >
  );
}

export default RouterConfig;
