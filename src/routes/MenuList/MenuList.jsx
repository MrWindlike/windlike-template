import { Icon, Menu } from 'antd';
import { Link } from 'dva/router';
import React from 'react';
const SubMenu = Menu.SubMenu;

class MenuList extends React.Component {
  constructor(props) {
    super(props);

    const { menu, subMenu } = this.props.match.params;
    const sub = this.props.subMenus.filter((subMenu) => subMenu.link === menu)[ 0 ];
    const title = sub.menus.length ? sub.menus.filter((menu, i) => sub.links[ i ].includes(subMenu))[ 0 ] : sub.name;

    this.state = {
      openKeys: [ sub.name ],
      selectedKeys: [ title ]
    }

    this.rootSubmenuKeys = this.props.subMenus.map((subMenu) => subMenu.name);
  }

  componentWillReceiveProps(nextProps) {
    /** 如果URL改变，根据URL匹配相应菜单 */
    if (nextProps.location !== this.props.location) {
      this.setMenu(nextProps);
    }
  }

  setMenu(props) {
    const { menu, subMenu } = props.match.params;
    const sub = props.subMenus.filter((subMenu) => subMenu.link === menu)[ 0 ];
    const title = sub.menus.length ? sub.menus.filter((menu, i) => sub.links[ i ].includes(subMenu))[ 0 ] : sub.name;

    this.setState({
      openKeys: [ sub.name ],
      selectedKeys: [ title ]
    });

    this.rootSubmenuKeys = props.subMenus.map((subMenu) => subMenu.name);
    document.title = title || sub.name;
  }

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [ latestOpenKey ] : [],
      });
    }
  }

  render() {
    const { subMenus } = this.props;

    return (
      <Menu
        selectedKeys={ this.state.selectedKeys }
        openKeys={ this.state.openKeys }
        onOpenChange={ this.onOpenChange }
        mode="inline"
        theme="dark"
      >
        {
          subMenus.map((subMenu) => {
            if (subMenu.menus.length) {
              return (
                <SubMenu key={ subMenu.name } title={ <span><Icon type={ subMenu.icon } /><span>{ subMenu.name }</span></span> }>
                  {
                    subMenu.menus.map((menu, menuIndex) =>
                      <Menu.Item key={ menu }>
                        <Link to={ `/${subMenu.link}/${subMenu.links[ menuIndex ]}` }>{ menu }</Link>
                      </Menu.Item>)
                  }
                </SubMenu>
              );
            } else {
              return (
                <Menu.Item key={ subMenu.name }>
                  <Link to={ `/${subMenu.link}/default` }><Icon type={ subMenu.icon } />{ subMenu.name }</Link>
                </Menu.Item>
              );
            }
          })
        }
      </Menu>
    );
  }
}


export default MenuList;
