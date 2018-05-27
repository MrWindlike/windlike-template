import MENUS from 'Assets/menus';
import { Layout } from 'antd';
import { Redirect, Route, Switch } from 'dva/router';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './Layout.less';
import Logo from 'Components/Logo/Logo';
import BackContent from '../Content/BackContent';
import Menu from 'Components/Menu/MenuList';
import icon from 'Assets/icon-back.png';

const { Sider } = Layout;
const initRoute = MENUS[0].links && MENUS[0].links.length ? `${MENUS[0].link}/${MENUS[0].links[0]}` : `${MENUS[0].link}/default`;

class BackLayout extends Component {
  static propTypes = {
    isCloseWhenOpenOther: PropTypes.bool, /** 当打开其他一级菜单时是否关闭当前菜单 */
    isCollapsible: PropTypes.bool,
    logoIcon: PropTypes.string.isRequired,
    logoName: PropTypes.string.isRequired,
    infoNum: PropTypes.number.isRequired,
  }

  static defaultProps = {
    logoIcon: icon,
    logoName: 'Windlike',
    infoNum: 0,
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
    const { isCollapsible, isCloseWhenOpenOther, logoIcon, logoName } = this.props;
    const { openKeys, collapsed } = this.state;

    return (
      <Layout className={styles.layout}>
        <Sider
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          collapsible={isCollapsible}
        >
          <Logo 
          logoIcon={logoIcon} 
          logoName={logoName} 
          collapsed={collapsed}
          />
          <Switch>
            {/* Menu */}
            <Route
              path="/:menu/:subMenu"
              render={
                props => (
                  <Menu
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
          render={props => <BackContent {...props} subMenus={MENUS} />}
        />
      </Layout>
    );
  }
}

export default BackLayout;
