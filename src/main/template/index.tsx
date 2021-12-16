import { Tabs } from 'antd';
import * as React from 'react';
import { PostTemp } from './post-temp/index';

export const Template = () => {
  const { TabPane } = Tabs;

  return (
    <div className="v-grid tab-container">
      <Tabs type="card">
        <TabPane tab="게시글 관리" key="post-temp">
          <PostTemp />
        </TabPane>
        <TabPane tab="게시글 작성" key="post">
          <p>Content of Tab Pane 2</p>
          <p>Content of Tab Pane 2</p>
          <p>Content of Tab Pane 2</p>
        </TabPane>
      </Tabs>
    </div>
  );
};
