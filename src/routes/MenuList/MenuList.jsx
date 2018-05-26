import { Icon, Menu } from 'antd';
import { Link } from 'dva/router';
import PropTypes from 'prop-types';
import React from 'react';

const SubMenu = Menu.SubMenu;

class MenuList extends React.Component {
  static propTypes = {
    isCloseWhenOpenOther: PropTypes.bool, /** 当打开其他一级菜单时是否关闭当前菜单 */
    subMenus: PropTypes.array.isRequired, /** 菜单配置信息 */
    openKeys: PropTypes.array.isRequired, /** 控制菜单打开 */
    onMenuOpenChange: PropTypes.func.isRequired, /** 打开菜单时回调 */
  }

  constructor(props) {
    super(props);

    const { menu, subMenu } = this.props.match.params;
    const sub = this.props.subMenus.filter(subMenu => subMenu.link === menu)[0];
    const title = sub.menus && sub.menus.length ? sub.menus.filter((menu, i) => sub.links[i].includes(subMenu))[0] : sub.name;

    this.state = {
      selectedKeys: [title],
      collapsed: false,
    };

    this.rootSubmenuKeys = this.props.subMenus.map(subMenu => subMenu.name);
    this.props.onMenuOpenChange([sub.name], this.rootSubmenuKeys);
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
    const title = sub.menus && sub.menus.length ? sub.menus.filter((menu, i) => sub.links[i].includes(subMenu))[0] : sub.name;

    if (this.props.isCloseWhenOpenOther) {
      this.setState({
        selectedKeys: [title],
      });

      this.props.onMenuOpenChange([sub.name], this.rootSubmenuKeys);
    } else {
      this.setState({
        selectedKeys: [title],
      });
    }


    this.rootSubmenuKeys = props.subMenus.map(subMenu => subMenu.name);
    /* document.title = title || sub.name; */
  }

  onOpenChange = (openKeys) => {
    this.props.onMenuOpenChange(openKeys, this.rootSubmenuKeys);
  }

  render() {
    const { subMenus } = this.props;

    return (
      <Menu
        selectedKeys={this.state.selectedKeys}
        openKeys={this.props.openKeys}
        onOpenChange={this.onOpenChange}
        mode="inline"
        theme="dark"
      >
        {
          subMenus.map((subMenu) => {
            if (subMenu.menus && subMenu.menus.length) {
              return (
                <SubMenu
                  key={subMenu.name}
                  title={<span><Icon type={subMenu.icon} /><span>{subMenu.name}</span></span>}
                >
                  {
                    subMenu.menus.map((menu, menuIndex) =>
                      (<Menu.Item key={menu}>
                        <Link to={`/${subMenu.link}/${subMenu.links[menuIndex]}`}>{menu}</Link>
                      </Menu.Item>))
                  }
                </SubMenu>
              );
            }
              
return (
                <Menu.Item key={subMenu.name}>
                  <Link to={`/${subMenu.link}/default`}>
                    <Icon type={subMenu.icon} />
                    <span>{subMenu.name}</span>
                  </Link>
                </Menu.Item>
              );
          })
        }
      </Menu>
    );
  }
}


export default MenuList;
