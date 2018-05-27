import { Icon, Menu } from 'antd';
import { Link } from 'dva/router';
import PropTypes from 'prop-types';
import React from 'react';
import MenuCreator from './MenuCreator';

const SubMenu = Menu.SubMenu;

class VerticalMenu extends React.Component {
  static propTypes = {
    isCloseWhenOpenOther: PropTypes.bool, /** 当打开其他一级菜单时是否关闭当前菜单 */
    subMenus: PropTypes.array.isRequired, /** 菜单列表信息 */
    openKeys: PropTypes.array, /** 控制菜单打开 */
    onMenuOpenChange: PropTypes.func, /** 打开菜单时回调 */
    mode: PropTypes.string.isRequired,  /** 菜单的模式 */
    theme: PropTypes.string,  /** 菜单主题 */
  }

  static defaultProps = {
    mode: 'inline',
    theme: 'dark',
  }

  constructor(props) {
    super(props);

    const { menu, subMenu } = this.props.match.params;
    const sub = this.props.subMenus.filter(subMenu => subMenu.link === menu)[0];
    const title = sub ? 
      (sub.menus && sub.menus.length ? 
        sub.menus.filter((menu, i) => sub.links[i].includes(subMenu))[0] :
        sub.name) :
      '404';

    this.state = {
      selectedKeys: [title],
      collapsed: false,
    };

    this.rootSubmenuKeys = this.props.subMenus.map(subMenu => subMenu.name);

    if(this.props.mode === 'inline' && this.props.onMenuOpenChange) {
      this.props.onMenuOpenChange([sub ? sub.name : '404'], this.rootSubmenuKeys);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    /** 如果URL改变，根据URL匹配相应菜单 */
    if (nextProps.location !== this.props.location) {
      this.setMenu(nextProps);
    }
  }

  setMenu(props) {
    const { menu, subMenu } = props.match.params;
    const sub = props.subMenus.filter(subMenu => subMenu.link === menu)[0];
    const title = sub ? 
      (sub.menus && sub.menus.length ? 
        sub.menus.filter((menu, i) => sub.links[i].includes(subMenu))[0] :
        sub.name) :
      '404';

    if (this.props.isCloseWhenOpenOther) {
      this.setState({
        selectedKeys: [title],
      });

      if(this.props.mode === 'inline' && this.props.onMenuOpenChange) {
        this.props.onMenuOpenChange([sub ? sub.name : '404'], this.rootSubmenuKeys);
      }
    } else {
      this.setState({
        selectedKeys: [title],
      });
    }


    this.rootSubmenuKeys = props.subMenus.map(subMenu => subMenu.name);
    /* document.title = title || sub.name; */
  }

  onOpenChange = (openKeys) => {
    if(this.props.mode === 'inline' && this.props.onMenuOpenChange) {
      this.props.onMenuOpenChange(openKeys, this.rootSubmenuKeys);
    }
  }

  render() {
    const { subMenus, mode, theme, style, className, id } = this.props;
    const MENU_CONFIG = mode === 'inline' ? {
      mode,
      className,
      id,
      theme,
      style,
      selectedKeys: this.state.selectedKeys,
      openKeys: this.props.openKeys,
      onOpenChange: this.onOpenChange,
    } : {
      mode,
      className,
      id,
      theme,
      style,
      selectedKeys: this.state.selectedKeys,
    };

    return MenuCreator(subMenus, MENU_CONFIG);
  }
}


export default VerticalMenu;
