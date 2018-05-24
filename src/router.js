import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import { LocaleProvider, Layout } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import MENUS from 'Assets/menus';
import MenuList from './routes/MenuList/MenuList';
import Content from './routes/Content/Content';

const { Sider } = Layout;
const initRoute = MENUS[0].links && MENUS[0].links.length ? `${MENUS[0].link}/${MENUS[0].links[0]}` : `${MENUS[0].link}/default`;

function RouterConfig({ history }) {
  return (
    <LocaleProvider locale={ zh_CN }>
      <Router history={ history }>
        <Layout style={ { minHeight: '100vh' } }>
          <Sider>
            <Switch>
              {/* Menu */ }
              <Route path="/:menu/:subMenu" render={ (props) => <MenuList { ...props } subMenus={ MENUS }></MenuList> }></Route>
              <Route render={ () => <Redirect to={initRoute} /> }></Route>
            </Switch>
          </Sider>
          {/* Content */ }
          <Route path="/:menu/:subMenu" render={ (props) => <Content { ...props } subMenus={ MENUS }></Content> }></Route>
        </Layout>
      </Router>
    </LocaleProvider >
  );
}

export default RouterConfig;
