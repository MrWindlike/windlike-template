import { Layout } from 'antd';
import { Switch } from 'dva/router';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import User from 'Components/User/User';
import UserMenu from '../Layout/UserMenu';
import routes from '../../routes';
import './BackContent.less';
const { Header, Content: Main, Footer } = Layout;
const routeComponents = routes.map(({name, Component}) => Component());

class Content extends Component {
  state = {
    title: '',
  }

  static propTypes = {
    subMenus: PropTypes.array.isRequired, /** 菜单配置信息 */
  }

  render() {
    const { menu, subMenu } = this.props.match.params;
    const menus = this.props.subMenus;
    const sub = menus.filter(subMenu => subMenu.link === menu)[0];
    const title = sub && sub.menus && sub.menus.length ? `-${sub.titles[sub.links.indexOf(subMenu)]}` : '';

    return (
      <Layout className="content">
        <Header 
        style={{ background: '#fff', padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
          <h1 className="title">Windlike系统-{sub ? sub.name : '404'}{title}</h1>
          <User
          menu={UserMenu({
            history: this.props.history,
          })}
          username="Windlike"
          ></User>
        </Header>
        <Main style={{ margin: '0 16px' }}>
          <Switch>
            {/* Route写在这里 */}
            { routeComponents }
          </Switch>
        </Main>
        <Footer style={{ textAlign: 'center' }}>
          copyright © 2018 Windlike All Rights Reserved.
        </Footer>
      </Layout>
    );
  }
}

export default Content;
