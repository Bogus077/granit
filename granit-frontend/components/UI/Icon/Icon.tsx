import React, { ReactElement } from 'react';
import fullLogoIconSvg from './icons/fullLogo';
import homeIconSvg from './icons/home';
import learnIconSvg from './icons/learn';
import homeworkIconSvg from './icons/homework';
import shortLogoIconSvg from './icons/shortLogo';
import arrowIconSvg from './icons/arrow';
import editIconSvg from './icons/edit';
import crossIconSvg from './icons/cross';
import checkIconSvg from './icons/check';

type IconProps = {
  symbol: string,
};

export default function Icon({ symbol }: IconProps): ReactElement {
  switch (symbol) {
    case 'logo-full':
      return fullLogoIconSvg;
      break;
    case 'logo-short':
      return shortLogoIconSvg;
      break;
    case 'home':
      return homeIconSvg;
      break;
    case 'learn':
      return learnIconSvg;
      break;
    case 'homework':
      return homeworkIconSvg;
      break;
    case 'arrow':
      return arrowIconSvg;
      break;
    case 'edit':
      return editIconSvg;
      break;
    case 'check':
      return checkIconSvg;
      break;
    case 'cross':
      return crossIconSvg;
      break;
    default:
      return <></>;
  }
}
