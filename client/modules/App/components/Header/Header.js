import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// Import Style
import styles from './Header.css';

export function Header(props, context) {

  return (
    <div className={styles.header}>
    </div>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

export default Header;
