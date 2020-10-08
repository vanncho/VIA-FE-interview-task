import React from 'react';

import headerStyles from './header.module.css';

import { APPLICATION_HEADER_TITLE } from '../../../constants/constants';

const Header = () => {

  return (
    <header className={ headerStyles.header }>
      <p className={ headerStyles.headerText }>{ APPLICATION_HEADER_TITLE }</p>
    </header>
  );
};

export default (Header);