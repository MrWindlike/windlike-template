import React, { Component } from 'react';
import './Content.less';
import { Route, Redirect, Switch } from 'dva/router';
import { Layout, Button, Icon, Popover, Dropdown, Menu } from 'antd';
import { connect } from 'dva';

const { Header, Content: Main, Footer } = Layout;

class Content extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { menu, subMenu } = this.props.match.params;
    const menus = this.props.subMenus;
    const sub = menus.filter((subMenu) => subMenu.link === menu)[ 0 ];
    const title = sub.values.length ? `-${sub.values[ sub.links.indexOf(subMenu) ]}` : '';
    const menulist = (
      <Menu>
        <Menu.Item>
          <a onClick={this.logout}>注销登录</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <Layout className="content">
        <Header style={ { background: '#fff', padding: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' } } >
          <h1 className="title">Windlike系统-{ sub.name }</h1>
          <Dropdown overlay={menulist} placement="bottomRight">
            <span style={{marginRight: 40, cursor: 'pointer'}}>{this.props.name?this.props.name:"admin"}</span>
          </Dropdown>
        </Header>
        <Main style={ { margin: '0 16px' } }>
          <Switch>
            {/* Route写在这里 */ }
          </Switch>
        </Main>
        <Footer style={ { textAlign: 'center' } }>
          copyright © 2018 Windlike All Rights Reserved.
        </Footer>
      </Layout>
    )
  }
}

export default Content;
