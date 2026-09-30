import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link to="/" className={styles.brandLink}>
          SMDStore
        </Link>
        <Nav />
      </div>
    </header>
  );
}