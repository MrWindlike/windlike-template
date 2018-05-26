const MENUS = [
  {
    name: '一级菜单',
    icon: 'profile',
    link: 'default-menu',
  },
  {
    name: '有子菜单的一级菜单',
    icon: 'profile',
    link: 'menu',
    menus: ['二级菜单'],
    titles: ['二级菜单'],
    links: ['submenu'],
  },
];

export default MENUS;
