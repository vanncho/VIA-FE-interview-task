import React from 'react';

import FrameList from '../frames/frameList/FrameList';

import contentStyles from './content.module.css';

const Content = () => {

  return (
    <article className={ contentStyles.article }>
      <FrameList></FrameList>
    </article>
  );
};

export default (Content);