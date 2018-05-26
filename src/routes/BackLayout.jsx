import MENUS from 'Assets/menus';
import { Layout } from 'antd';
import { Redirect, Route, Switch } from 'dva/router';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './BackLayout.less';
import Content from './Content/Content';
import MenuList from './MenuList/MenuList';

const { Sider } = Layout;
const initRoute = MENUS[0].links && MENUS[0].links.length ? `${MENUS[0].link}/${MENUS[0].links[0]}` : `${MENUS[0].link}/default`;

class BackLayout extends Component {
  static propTypes = {
    isCloseWhenOpenOther: PropTypes.bool, /** 当打开其他一级菜单时是否关闭当前菜单 */
    isCollapsible: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      openKeys: [],
      preOpenKeys: [],
    };
  }

  onCollapse = (collapsed) => {
    this.setState({
      collapsed,
      preOpenKeys: collapsed ? this.state.openKeys : [],
      openKeys: collapsed ? [] : this.state.preOpenKeys,
    });
  }

  onMenuOpenChange = (openKeys, rootSubmenuKeys) => {
    /** 找最新打开的菜单 */
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1 ||
        !this.props.isCloseWhenOpenOther) {
      /** 在目录中没有包含最新单开的菜单或者不需要关闭其他菜单 */
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  render() {
    const { isCollapsible, isCloseWhenOpenOther } = this.props;
    const { openKeys } = this.state;

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          collapsible={isCollapsible}
        >
          <div className={styles.logo} />
          <Switch>
            {/* Menu */}
            <Route
              path="/:menu/:subMenu"
              render={
                props => (
                  <MenuList
                    subMenus={MENUS}
                    openKeys={openKeys}
                    onMenuOpenChange={this.onMenuOpenChange}
                    isCloseWhenOpenOther={isCloseWhenOpenOther}
                    {...props}
                  />
                )
              }
            />
            <Route render={() => <Redirect to={initRoute} />} />
          </Switch>
        </Sider>
        {/* Content */}
        <Route
          path="/:menu/:subMenu"
          render={props => <Content {...props} subMenus={MENUS} />}
        />
      </Layout>
    );
  }
}

export default BackLayout;
