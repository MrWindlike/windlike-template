const MENUS = [
  {
    name: '会议管理',
    icon: 'profile',
    link: 'meeting-management',
    menus: ['会议列表', '会议统计'],
    values: ['会议列表', '会议统计'],
    links: ['list', 'count']
  },
  {
    name: '群组管理',
    icon: 'team',
    link: 'groups-management',
    menus: ['群组列表'],
    values: ['群组列表'],
    links: ['list']
  },
  {
    name: '场地管理',
    icon: 'table',
    link: 'site-management',
    menus: ['场地列表'],
    values: ['场地列表'],
    links: ['list']
  },
{
  name: '设备管理',
  icon: 'table',
  link: 'equ-management',
  menus: ['终端列表'],
  values: ['终端列表'],
  links: ['list']
},
  {
    name: '权限管理',
    type: 1,
    icon:'warning',
    link: 'permissions-management',
    menus: ['操作员列表'],
    values: ['操作员列表'],
    links: ['operator-list']
  }
];

export default MENUS;
