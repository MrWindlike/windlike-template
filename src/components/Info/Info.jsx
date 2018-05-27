import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';

export default class Info extends Component {
  static propTypes = {
    infoNum: PropTypes.number.isRequired,
    infoList: PropTypes.array.isRequired,
    messageList: PropTypes.array.isRequired,
  }

  static defaultProps = {
    infoNum: 0,
    infoList: [],
    messageList: [],
  }

  render() {
    const { infoNum, infoList, messageList } = this.props;

    return (
      <NoticeIcon count={infoNum} className="margin-right-md" >
          <NoticeIcon.Tab
          list={infoList}
          title="通知"
          emptyText="没有新的通知"
          emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
        />
        <NoticeIcon.Tab
          list={messageList}
          title="消息"
          emptyText="没有新的消息"
          emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
        />
      </NoticeIcon>
    );
  }
}
