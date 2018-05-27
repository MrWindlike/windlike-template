/// <reference types="react" />
import * as React from 'react';

interface UserProps {
  /** 用户展开菜单 */
  menus: JSX.Element,
  /** 用户名 */
  username?: string,
  /** 头像 */
  icon: string,
}

export default class User extends React.Component<UserProps, {}> {
  static defaultProps: {
    icon: string,
  }

  static propTypes: {
    handleOpen: () => void,
    handleClose: () => void,
  };

  componentDidMount: ()=> void;
  render(): JSX.Element;
}