import { Breadcrumb, Layout } from 'antd';
import { Switch } from 'dva/router';
import React, { Component } from 'react';
import routes from '../../routes';

const { Content } = Layout;
const routeComponents = routes.map(({name, Component}) => Component());

export default class FrontContent extends Component {
  static propTypes = {

  }

  render() {
    return (
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <Switch location={location}>
            {routeComponents}
          </Switch>
        </div>
      </Content>
    );
  }
}
