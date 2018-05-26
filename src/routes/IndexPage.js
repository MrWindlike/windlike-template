import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import styles from './IndexPage.css';

function IndexPage(props) {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>{props.oneState.get('value')}</h1>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
      </ul>
    </div>
  );
}

IndexPage.propTypes = {
  oneState: PropTypes.object.isRequired,
};

export default connect(_ => ({ oneState: _.demo.oneState }))(IndexPage);
