import React, { Component } from 'react';
import './Content.less';
import { Route, Redirect, Switch } from 'dva/router';
import { Layout, Button, Icon, Popover, Dropdown, Menu } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'dva';

const { Header, Content: Main, Footer } = Layout;

class Content extends Component {
  static propTypes = {
    subMenus: PropTypes.array.isRequired,   /** 菜单配置信息 */
  }

  render() {
    const { menu, subMenu } = this.props.match.params;
    const menus = this.props.subMenus;
    const sub = menus.filter((subMenu) => subMenu.link === menu)[0];
    const title = sub.titles && sub.titles.length ? `-${sub.titles[sub.links.indexOf(subMenu)]}` : '';

    return (
      <Layout className="content">
        <Header style={{ background: '#fff', padding: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
          <h1 className="title">Windlike系统-{sub.name}{title}</h1>
        </Header>
        <Main style={{ margin: '0 16px' }}>
          <Switch>
            {/* Route写在这里 */}
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
