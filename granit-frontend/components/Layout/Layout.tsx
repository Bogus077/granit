import React, { ReactElement, useState } from 'react';
import SidebarMenu from './SidebarMenu';
import styles from './Layout.module.scss';
import classNames from 'classnames/bind';
import Icon from '../UI/Icon';
const cx = classNames.bind(styles);

export type layoutProps = {
  children: ReactElement,
};

export default function Layout(props: layoutProps) {
  const { children } = props;
  const [shortView, setShortView] = useState(false);
  return (
    <div className={styles.layout}>
      <div className={cx('sidebar', { sidebar_short: shortView })}>
        <div
          className={cx('sidebar__viewSwitcher', {
            sidebar__viewSwitcher_mirrored: shortView,
          })}
          onClick={() => setShortView(!shortView)}
        >
          <Icon symbol="arrow" />
        </div>
        {shortView ? <Icon symbol="logo-short" /> : <Icon symbol="logo-full" />}
        <div className={styles.sidebar__hr} />
        <div className={styles.sidebar__menu}>
          <SidebarMenu shortView={shortView} />
        </div>
      </div>
      <div className={styles.main}>{children}</div>
    </div>
  );
}
