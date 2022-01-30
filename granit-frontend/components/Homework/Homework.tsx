import React from 'react';
import HomeworkMenu from './HomeworkMenu';
import HomeworkMain from './HomeworkMain';
import styles from './Homework.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default function Homework() {
  return (
    <div className={styles.homework}>
      <div className={styles.homework__menu}>
        <HomeworkMenu />
      </div>
      <div className={styles.homework__main}>
        <HomeworkMain />
      </div>
    </div>
  );
}
