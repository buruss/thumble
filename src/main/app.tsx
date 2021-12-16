import * as React from 'react';
import { Layout, Col, Menu, Row } from 'antd';
import { Link, Route, Routes } from 'react-router-dom';
import { Account } from './account';
import { Neighbor } from './neighbor';
import { Posting } from './posting';
import { MyPost } from './my-post';
import { Schedule } from './schedule';
import { NeighborPost } from './neighbor-post';
import { Activity as Activity } from './activity';
import { Interact } from './interact';
import { Setting } from './setting';
import { Template } from './template';
import 'antd/dist/antd.css';
import styles from './app.module.scss';

const App = () => {
  const { Header, Footer, Content } = Layout;

  return (
    <Layout className="v-grid-hmf" style={{ height: '100vh' }}>
      <Header className="header" style={{ backgroundColor: 'white' }}>
        <Row style={{ flexWrap: 'nowrap' }}>
          <Col flex="auto">
            <Menu theme="light" mode="horizontal" defaultSelectedKeys={['activity']}>
              <Menu.Item key="activity">
                <Link to="/">활동</Link>
              </Menu.Item>

              <Menu.Item key="account">
                <Link to="account">계정</Link>
              </Menu.Item>

              <Menu.Item key="neighbor">
                <Link to="neighbor">이웃 관리</Link>
              </Menu.Item>

              <Menu.Item key="interact">
                <Link to="interact">방문 교류</Link>
              </Menu.Item>

              <Menu.Item key="posting">
                <Link to="posting">포스팅</Link>
              </Menu.Item>

              <Menu.Item key="my-post">
                <Link to="my-post">새글 관리</Link>
              </Menu.Item>

              <Menu.Item key="schedule">
                <Link to="schedule">예약 관리</Link>
              </Menu.Item>

              <Menu.Item key="neightbor-post">
                <Link to="neightbor-post">이웃 새글</Link>
              </Menu.Item>

              <Menu.Item key="setting">
                <Link to="setting">네트워크</Link>
              </Menu.Item>

              <Menu.Item key="template">
                <Link to="template">템플릿</Link>
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Header>

      <Content className={`${styles.main} v-grid`}>
        <Routes>
          <Route path="" element={<Activity />} />
          <Route path="account" element={<Account />} />
          <Route path="neighbor" element={<Neighbor />} />
          <Route path="interact" element={<Interact />} />
          <Route path="posting" element={<Posting />} />
          <Route path="my-post" element={<MyPost />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="neightbor-post" element={<NeighborPost />} />
          <Route path="setting" element={<Setting />} />
          <Route path="template" element={<Template />} />
        </Routes>
      </Content>

      <Footer
        className="footer"
        style={{
          padding: '5px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        썸블 상태바
      </Footer>
    </Layout>
  );
};

export default App;
