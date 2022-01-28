import React, { ReactElement } from 'react';
import Icon from '../../../UI/Icon';
import classNames from 'classnames/bind';
import styles from './MenuItem.module.scss';
const cx = classNames.bind(styles);

type MenuItemProps = {
  icon: string,
  text: string,
  active?: boolean,
  shortView: boolean,
};

export default function MenuItem({
  icon,
  text,
  active = false,
  shortView = false,
}: MenuItemProps): ReactElement {
  return (
    <div className={cx('item', { item_active: active, item_short: shortView })}>
      <div className={styles.item__icon}>
        <Icon symbol={icon} />
      </div>
      {shortView || <div className={styles.item__text}>{text}</div>}
    </div>
  );
}
