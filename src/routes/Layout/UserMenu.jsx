import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';


const styles = {
  menuItem: {
    minWidth: '160px',
    display: 'block',
  }
};

const menus = [
  {
    name: '设置',
    icon: 'setting',
    href: '/setting/default',
  },
  {
    name: '注销',
    icon: 'logout',
    href: '/logout/default',
  },
];

function handleClick(history, href, onClick) {
  if(href && history && history.push) {
    history.push(href);
  }

  if(typeof onClick === 'function') {
    onClick();
  }
}

const UserMenu = (props = { history: {} })=> (
  <Menu>
    {
      menus.map((menu)=> (
        <Menu.Item key={menu.name}>
          <a 
          style={styles.menuItem} 
          onClick={()=> handleClick(props.history, menu.href, props[menu.onClick])}>
            {menu.icon ? <Icon type={menu.icon} className="margin-right-sm" /> : null}
            {menu.name}
          </a>
        </Menu.Item>
      ))
    }
  </Menu>
);

export default UserMenu;
