import { Avatar, Dropdown } from 'antd';
import { Link } from 'dva/router';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './User.less';

export default class User extends Component {
  static propTypes = {
    menu: PropTypes.element.isRequired,
    username: PropTypes.string,
    icon: PropTypes.string,
  }

  static defaultProps = {
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
  }

  render() {
    const { menu, username, icon } = this.props;

    return (
      <Dropdown
        overlay={menu}
      >
        <Link to="/" className="flex-center" style={{ minHeight: '100%' }}>
          <Avatar 
          style={{ marginRight: username ? '8px' : '0' }}
          src={icon}
          className={styles.avatar}
          />
          <span className={styles.username}>{username}</span>
        </Link>
      </Dropdown>
    );
  }
}
