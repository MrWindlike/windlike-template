import MENUS from 'Assets/menus';
import MenuList from 'Components/Menu/MenuList';
import MenuCreator from 'Components/Menu/MenuCreator';
import Info from 'Components/Info/Info';
import User from 'Components/User/User';
import Logo from 'Components/Logo/Logo';
import HeaderSearch from 'ant-design-pro/lib/HeaderSearch';
import { Layout, Dropdown, Icon } from 'antd';
import { Redirect, Route, Switch, Link } from 'dva/router';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Content from '../Content/FrontContent';
import styles from './Layout.less';
import UserMenu from './UserMenu';
import icon from 'Assets/icon-front.png';

const { Header, Footer } = Layout;
const initRoute = MENUS[0].links && MENUS[0].links.length ? `${MENUS[0].link}/${MENUS[0].links[0]}` : `${MENUS[0].link}/default`;
const ResponsiveMenu = function(props) {
  const { subMenus } = props;
  const { menu, subMenu } = props.match.params;
  const sub = subMenus.filter(subMenu => subMenu.link === menu)[0];
  const title = sub ?
   (sub.menus && sub.menus.length ? `${sub.titles[sub.links.indexOf(subMenu)]}` : sub.name) :
   ('首页');

  return (
    <div>
      <MenuList 
      className={styles['nav-desktop']}
      style={{ lineHeight: '64px' }}
      mode="horizontal" 
      theme="light" 
      {...props} />
      <Dropdown 
      overlay={
        MenuCreator(subMenus, {
          mode: 'vertical',
          theme: 'light',
        })
      }>
        <a className={styles['nav-phone']} href="#">
          {title}<Icon type="down" className="margin-left-sm" />
        </a>
      </Dropdown>
    </div>
  );
};

export default class FrontLayout extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    logoIcon: PropTypes.string.isRequired,
    logoName: PropTypes.string.isRequired,
    infoNum: PropTypes.number.isRequired,
  }

  static defaultProps = {
    logoIcon: icon,
    logoName: 'Windlike',
    infoNum: 0,
  }

  render() {
    const { location } = this.props.history;
    const { logoName, logoIcon, infoNum } = this.props;
    
    return (
      <Layout className={styles.layout} id="front-layout">
        {/* 头部 */}
        <Header className={`flex-between ${styles['header-light']}`}>
          {/* 导航左侧 */}
          <div className="flex">
            {/* logo */}
            <Logo
            logoName={logoName}
            logoIcon={logoIcon}
            isFront
            />
            {/* Menu */}
            <Switch>
              <Route
                path="/:menu/:subMenu"
                render={
                  props => (
                    <ResponsiveMenu subMenus={MENUS} {...this.props} {...props}/>
                  )
                }
              />
              <Route render={() => <Redirect to={initRoute} />} />
            </Switch>
          </div>
          {/* 导航右侧 */}
          <div className="flex-center">
            {/* search */}
            <HeaderSearch
              className={styles.search}
              placeholder="站内搜索"
              dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
              onSearch={(value) => {
                console.log('input', value); // eslint-disable-line
              }}
              onPressEnter={(value) => {
                console.log('enter', value); // eslint-disable-line
              }}
            />
            {/* info */}
            <Info infoNum={infoNum}></Info>
            <User 
            menu={UserMenu({
              history: this.props.history,
            })}
            />
          </div>
        </Header>
        {/* 内容 */}
        <Content />
        {/* 页脚 */}
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2016 Created by Ant UED
      </Footer>
      </Layout>
    );
  }
}
