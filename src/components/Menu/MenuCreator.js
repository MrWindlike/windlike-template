import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';

const { SubMenu } = Menu;

function MenuCreator(subMenus, menuConfig) {
  return (
    <Menu {...menuConfig}>
      {
        subMenus.map((subMenu) => {
          if (subMenu.menus && subMenu.menus.length) {
            return (
              <SubMenu
                key={subMenu.name}
                title={<span><Icon className="margin-right-sm" type={subMenu.icon} /><span>{subMenu.name}</span></span>}
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
                  <Icon type={subMenu.icon} className="margin-right-sm" />
                  <span>{subMenu.name}</span>
                </Link>
              </Menu.Item>
          );
        })
      }
    </Menu>
  );
}

export default MenuCreator;
