import { Tabs } from 'antd';
import * as React from 'react';
import { AccountManage } from './account-manage/index';

export const Account = () => {
  const { TabPane } = Tabs;

  return (
    <div className="v-grid" style={{ padding: '20px 20px 0 20px' }}>
      <div className="v-grid tab-container">
        <Tabs type="card">
          <TabPane tab="계정" key="account">
            <AccountManage />
          </TabPane>
          <TabPane tab="일일활동" key="dailyActivity">
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
          </TabPane>
          <TabPane tab="이웃관리" key="neighbor">
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
          </TabPane>
          <TabPane tab="이웃관리" key="mutualNeighbor">
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
          </TabPane>
          <TabPane tab="공유게시판" key="shareBulletin">
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
          </TabPane>
          <TabPane tab="공유카페" key="shareCafe">
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
