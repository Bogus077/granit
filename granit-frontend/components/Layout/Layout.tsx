import React, { ReactElement } from 'react';
import styles from './Layout.module.scss';

export type layoutProps = {
  children: ReactElement,
};

export default function Layout(props: layoutProps) {
  const { children } = props;
  return (
    <>
      <div className={styles.sidebar}>Sidebar</div>
      <div className={styles.main}>{children}</div>
    </>
  );
}
