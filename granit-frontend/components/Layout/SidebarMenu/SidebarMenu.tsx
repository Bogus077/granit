import React from 'react';
import MenuItem from './MenuItem';
import styles from './SidebarMenu.module.scss';

type SidebarMenuProps = {
  shortView: boolean,
};

export default function SidebarMenu(props: SidebarMenuProps) {
  const { shortView } = props;
  return (
    <div className={styles.menu}>
      <MenuItem icon="home" text="Главная" shortView={shortView} />
      <MenuItem icon="learn" text="Учеба" shortView={shortView} />
      <MenuItem
        icon="homework"
        text="Домашняя работа"
        shortView={shortView}
        active={true}
      />
    </div>
  );
}
