import React from 'react';
import Icon from '../../UI/Icon';
import HomeworkTable from './HomeworkTable';
import styles from './HomeworkMain.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default function HomeworkMain() {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.header__text}>5 взвод</div>
        <div className={styles.header__edit}>
          <div className={styles.header__icon}>
            <Icon symbol="edit" />
          </div>
          Редактировать
        </div>
      </div>
      <HomeworkTable />
    </div>
  );
}
