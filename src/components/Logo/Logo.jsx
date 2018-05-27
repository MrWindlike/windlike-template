import { Link } from 'dva/router';
import styles from './Logo.less';

function Logo(props) {
  const { logoIcon, logoName, isFront, collapsed } = props;

  return (
    <Link 
    to="/" 
    className={
      isFront ? 
        `${styles['logo-front']}` :
        `${styles['logo-back']}`
    }
    >
      {
        logoName ? (
          <img
            className={collapsed ? styles['logo-icon'] : `${styles['logo-icon']} margin-right-sm`}
            src={logoIcon}
          />
        ) : (
          <img
            className={collapsed ? styles['logo-pure'] : `${styles['logo-pure']} margin-right-sm`}
            src={logoIcon}
          />
        )
      }
      <span
        style={{ lineHeight: '32px', width: collapsed ? '0' : 'auto' }}
        className={isFront ? styles['logo-name'] : `${styles['logo-name']} ${styles['logo-name-back']}`}
      >{logoName}</span>
    </Link>
  );
}

export default Logo;
