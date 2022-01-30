import React from 'react';
import styles from './Mark.module.scss';
import Icon from '../Icon';
import { getFontDefinitionFromManifest } from 'next/dist/server/font-utils';

type MarkPropTypes = {
  type: 'boolean' | 'number',
  value?: string,
};

export default function Mark(props: MarkPropTypes) {
  const { type, value } = props;
  return (
    <div className={styles.mark}>
      {(type === 'boolean' && value === 'true' && <Icon symbol="check" />) ||
        (type === 'boolean' && value === 'false' && <Icon symbol="cross" />) ||
        (type === 'boolean' && <></>)}
    </div>
  );
}
