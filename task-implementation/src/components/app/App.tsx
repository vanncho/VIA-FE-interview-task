import React from 'react';

import Header from '../common/header/Header';
import Search from '../common/search/Search';
import Content from '../content/Content';

import appStyles from './app.module.css';

const App = () => {

  return (
    <div className={ appStyles.app }>
      <div className={ appStyles.headerWrapper }>
        <Header></Header>
        <Search></Search>
      </div>
      <Content></Content>
    </div>
  );
}

export default App;
