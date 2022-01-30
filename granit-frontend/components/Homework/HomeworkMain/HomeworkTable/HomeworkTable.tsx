import React from 'react';
import Mark from '../../../UI/Mark';
import styles from './HomeworkTable.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default function HomeworkTable() {
  const subjects = [
    { label: 'Математика', id: 1 },
    { label: 'Русский язык', id: 2 },
    { label: 'Литература', id: 3 },
  ];
  const puples = [
    {
      name: 'Иванов',
      surname: 'Иван',
      subjects: [
        { id: 1, mark: 'test' },
        { id: 2, mark: 'test4' },
        { id: 3, mark: 'test7' },
      ],
    },
    {
      name: 'Петров',
      surname: 'Пётр',
      subjects: [
        { id: 1, mark: 'test2' },
        { id: 2, mark: 'test5' },
        { id: 3, mark: 'test8' },
      ],
    },
    {
      name: 'Сидоров',
      surname: 'Сидор',
      subjects: [
        { id: 1, mark: 'test3' },
        { id: 2, mark: 'test6' },
        { id: 3, mark: 'test9' },
      ],
    },
  ];
  return (
    <div className={styles.table}>
      <div className={cx('table__row', 'table__row_title')}>
        <div className={cx('table__col', 'table__search')}>
          <input />
        </div>
        <div
          className={cx('table__col', 'table__date')}
          style={{ width: `${100 * 3}px` }}
        >
          21 января
        </div>
      </div>
      <div className={styles.table__row}>
        <div className={cx('table__col', 'table__subheader')}></div>
        {subjects.map((subject) => (
          <div className={cx('table__col', 'table__subheader')}>
            {subject.label}
          </div>
        ))}
      </div>

      {puples.map((kid) => (
        <div className={styles.table__row}>
          <div className={cx('table__col', 'table__kidName')}>
            {kid.name} {kid.surname}
          </div>
          {subjects.map((item) => (
            <div className={cx('table__col', 'table__mark')}>
              <Mark type="boolean" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
