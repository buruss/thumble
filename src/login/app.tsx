import * as React from 'react';
import 'antd/dist/antd.css';
import { Button, Input, Form, Checkbox, Layout, Row, Col, Space, message } from 'antd';
import styles from './app.module.scss';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './app.css';

const App = () => {
  async function handleLoginClick(values: any) {
    console.log('handleLoginClick', values);
  }

  return (
    <Layout.Content className="main draggable">
      <div className={styles.loginForm}>
        <Form
          id="loginForm"
          size="small"
          labelCol={{ xs: { span: 14 } }}
          wrapperCol={{ xs: { span: 10 } }}
          onFinish={handleLoginClick}
        >
          <Row gutter={16} style={{ width: '100%' }}>
            <Col span={19}>
              <Form.Item label="아이디" name="loginId" rules={[{ required: true, message: '아이디를 입력해주세요.' }]}>
                <Input prefix={<UserOutlined className={styles.inputIcon} />} />
              </Form.Item>
              <Form.Item label="비밀번호" name="pwd" rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}>
                <Input.Password prefix={<LockOutlined className={styles.inputIcon} />} />
              </Form.Item>
            </Col>
            <Col span={5} style={{ textAlign: 'right' }}>
              <a href="main.html">
                <Button type="primary" htmlType="submit" form="loginForm" style={{ width: '100px', height: '62px' }}>
                  로그인
                </Button>
              </a>
            </Col>
          </Row>
        </Form>
      </div>
      <Row
        id="loginBar"
        className={styles.loginBar}
        gutter={16}
        justify="space-between"
        style={{ width: '100%', paddingTop: '10px' }}
      >
        <Col style={{ padding: 0 }}>
          <Space>
            <Button>회원 가입</Button>
            <Button style={{ width: '150px' }}>아이디 / 비번 찾기</Button>
          </Space>
        </Col>
        <Col style={{ padding: 0 }}>
          <Space>
            <Form.Item name="idSave" valuePropName="checked">
              <Checkbox style={{ whiteSpace: 'nowrap' }}>아이디 저장</Checkbox>
            </Form.Item>
            <Form.Item name="idPwd" valuePropName="checked">
              <Checkbox style={{ whiteSpace: 'nowrap' }}>비밀번호 저장</Checkbox>
            </Form.Item>
          </Space>
        </Col>
      </Row>
    </Layout.Content>
  );
};

export default App;
