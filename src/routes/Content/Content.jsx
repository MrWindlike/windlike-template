import { Layout } from 'antd';
import { Switch } from 'dva/router';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import routes from '../../routes';
import './Content.less';

const { Header, Content: Main, Footer } = Layout;

class Content extends Component {
  static propTypes = {
    subMenus: PropTypes.array.isRequired, /** 菜单配置信息 */
  }

  render() {
    const { menu, subMenu } = this.props.match.params;
    const menus = this.props.subMenus;
    const sub = menus.filter(subMenu => subMenu.link === menu)[0];
    const title = sub.titles && sub.titles.length ? `-${sub.titles[sub.links.indexOf(subMenu)]}` : '';

    return (
      <Layout className="content">
        <Header 
        style={{ background: '#fff', padding: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} 
        >
          <h1 className="title">Windlike系统-{sub.name}{title}</h1>
        </Header>
        <Main style={{ margin: '0 16px' }}>
          <Switch>
            {/* Route写在这里 */}
            {
              routes.map(route => <route.component key={route.name} />)
            }
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
