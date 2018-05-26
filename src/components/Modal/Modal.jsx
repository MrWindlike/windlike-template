/// <reference types="Modal" />
import React, { Component } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

export default class WindlikeModal extends Component {
  static propTypes = {
    /** 模态框打开处理函数 */
    handleOpen: PropTypes.func,
    /** 模态框关闭处理函数 */
    handleClose: PropTypes.func,
  }

  componentDidMount() {
    this.handleVisibleChange();
  }

  UNSAFE_componentWillUpdate(nextProps) {
    if (nextProps.visible !== this.props.visible) {
      this.handleVisibleChange();
    }
  }

  handleVisibleChange = ()=> {
    if (this.props.visible) {
      this.props.handleOpen();
    } else {
      this.props.handleClose();
    }
  }

  render() {
    return (
      <Modal
      {...this.props}
      >
        {this.props.children}
      </Modal>
    );
  }
}
