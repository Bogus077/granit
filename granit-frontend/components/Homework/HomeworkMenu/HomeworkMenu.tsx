import React, { useState } from 'react';
import styles from './HomeworkMenu.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default function HomeworkMenu() {
  const [active, setActive] = useState(0);
  const items = ['День', 'Неделя', 'Месяц', 'Четверть'];
  return (
    <div className={styles.menu}>
      <span className={styles.menu__header}>Домашняя работа</span>
      <div className={styles.menu__container}>
        <span className={styles.menu__title}>Учебный период</span>
        <div className={styles.hr}></div>
        {items.map((item, i) => (
          <div
            className={cx('menu__item', {
              menu__item_active: active === i,
            })}
            onClick={() => setActive(i)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
