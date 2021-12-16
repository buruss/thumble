import * as React from 'react';
import { Button, Form, Input, Space } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useState } from 'react';
import { CheckboxCellEditor, NumericCellEditor } from '../../../component/cell-editor';

const data = {
  items: [
    {
      id: 21,
      userId: 'bagvl',
      isMain: true,
      nickName: 'rszpe1',
      state: 'ok',
      checkedAt: new Date('2021-12-04T01:10:00.000Z'),
      lastIp: '192.168.0.1',
      memo: '',
      createdAt: new Date('2021-12-06T07:49:34.551Z'),
      updatedAt: new Date('2021-12-06T07:49:34.551Z'),
    },
    {
      id: 25,
      userId: 'uaqbfn',
      isMain: true,
      nickName: 'ubu',
      state: 'ok',
      checkedAt: new Date('2021-12-04T01:10:00.000Z'),
      lastIp: '192.168.0.1',
      memo: '',
      createdAt: new Date('2021-12-06T07:49:34.775Z'),
      updatedAt: new Date('2021-12-06T07:49:34.775Z'),
    },
    {
      id: 27,
      userId: 'ybq',
      isMain: true,
      nickName: 'chmpk2',
      state: 'ok',
      checkedAt: new Date('2021-12-04T01:10:00.000Z'),
      lastIp: '192.168.0.1',
      memo: '',
      createdAt: new Date('2021-12-06T07:49:34.851Z'),
      updatedAt: new Date('2021-12-06T07:49:34.851Z'),
    },
    {
      id: 28,
      userId: 'shjgb',
      isMain: true,
      nickName: 'wsa',
      state: 'ok',
      checkedAt: new Date('2021-12-04T01:10:00.000Z'),
      lastIp: '192.168.0.1',
      memo: '',
      createdAt: new Date('2021-12-06T07:49:34.887Z'),
      updatedAt: new Date('2021-12-06T07:49:34.887Z'),
    },
    {
      id: 29,
      userId: 'admr',
      isMain: true,
      nickName: 'gzhicd2',
      state: 'ok',
      checkedAt: new Date('2021-12-04T01:10:00.000Z'),
      lastIp: '192.168.0.1',
      memo: '',
      createdAt: new Date('2021-12-06T07:49:34.943Z'),
      updatedAt: new Date('2021-12-06T07:49:34.943Z'),
    },
    {
      id: 30,
      userId: 'ftjqym',
      isMain: true,
      nickName: 'ltkji',
      state: 'ok',
      checkedAt: new Date('2021-12-04T01:10:00.000Z'),
      lastIp: '192.168.0.1',
      memo: '',
      createdAt: new Date('2021-12-06T07:49:34.979Z'),
      updatedAt: new Date('2021-12-06T07:49:34.979Z'),
    },
    {
      id: 31,
      userId: 'ydjzr',
      isMain: true,
      nickName: 'vze',
      state: 'ok',
      checkedAt: new Date('2021-12-04T01:10:00.000Z'),
      lastIp: '192.168.0.1',
      memo: '',
      createdAt: new Date('2021-12-06T07:49:35.017Z'),
      updatedAt: new Date('2021-12-06T07:49:35.017Z'),
    },
    {
      id: 32,
      userId: 'gajh',
      isMain: true,
      nickName: 'hru',
      state: 'ok',
      checkedAt: new Date('2021-12-04T01:10:00.000Z'),
      lastIp: '192.168.0.1',
      memo: '',
      createdAt: new Date('2021-12-06T07:49:35.054Z'),
      updatedAt: new Date('2021-12-06T07:49:35.054Z'),
    },
    {
      id: 33,
      userId: 'wbmn',
      isMain: false,
      nickName: 'wda',
      state: 'ok',
      checkedAt: new Date('2021-12-04T01:10:00.000Z'),
      lastIp: '192.168.0.1',
      memo: '',
      createdAt: new Date('2021-12-06T07:49:35.091Z'),
      updatedAt: new Date('2021-12-06T07:49:35.091Z'),
    },
    {
      id: 34,
      userId: 'dazuz',
      isMain: true,
      nickName: 'yojgez',
      state: 'ok',
      checkedAt: new Date('2021-12-04T01:10:00.000Z'),
      lastIp: '192.168.0.1',
      memo: '',
      createdAt: new Date('2021-12-06T07:49:35.134Z'),
      updatedAt: new Date('2021-12-06T07:49:35.134Z'),
    },
    {
      id: 35,
      userId: 'lnqsmb',
      isMain: true,
      nickName: 'nyt',
      state: 'ok',
      checkedAt: new Date('2021-12-04T01:10:00.000Z'),
      lastIp: '192.168.0.1',
      memo: '',
      createdAt: new Date('2021-12-06T07:49:35.193Z'),
      updatedAt: new Date('2021-12-06T07:49:35.193Z'),
    },
    {
      id: 36,
      userId: 'qvs',
      isMain: false,
      nickName: 'phd',
      state: 'ok',
      checkedAt: new Date('2021-12-04T01:10:00.000Z'),
      lastIp: '192.168.0.1',
      memo: '',
      createdAt: new Date('2021-12-06T07:49:35.229Z'),
      updatedAt: new Date('2021-12-06T07:49:35.229Z'),
    },
    {
      id: 37,
      userId: 'yivceh',
      isMain: false,
      nickName: 'frpsk',
      state: 'ok',
      checkedAt: new Date('2021-12-04T01:10:00.000Z'),
      lastIp: '192.168.0.1',
      memo: '',
      createdAt: new Date('2021-12-06T07:49:35.267Z'),
      updatedAt: new Date('2021-12-06T07:49:35.267Z'),
    },
    {
      id: 38,
      userId: 'uimm',
      isMain: false,
      nickName: 'rllb',
      state: 'ok',
      checkedAt: new Date('2021-12-04T01:10:00.000Z'),
      lastIp: '192.168.0.1',
      memo: '',
      createdAt: new Date('2021-12-06T07:49:35.354Z'),
      updatedAt: new Date('2021-12-06T07:49:35.354Z'),
    },
    {
      id: 39,
      userId: 'qjoxht',
      isMain: false,
      nickName: 'lncmfm',
      state: 'ok',
      checkedAt: new Date('2021-12-04T01:10:00.000Z'),
      lastIp: '192.168.0.1',
      memo: '',
      createdAt: new Date('2021-12-06T07:49:35.417Z'),
      updatedAt: new Date('2021-12-06T07:49:35.417Z'),
    },
    {
      id: 40,
      userId: 'bdvsii',
      isMain: false,
      nickName: 'uwzvo',
      state: 'ok',
      checkedAt: new Date('2021-12-04T01:10:00.000Z'),
      lastIp: '192.168.0.1',
      memo: '',
      createdAt: new Date('2021-12-06T07:49:35.453Z'),
      updatedAt: new Date('2021-12-06T07:49:35.453Z'),
    },
    {
      id: 41,
      userId: 'ebwt',
      isMain: false,
      nickName: 'zkao',
      state: 'ok',
      checkedAt: new Date('2021-12-04T01:10:00.000Z'),
      lastIp: '192.168.0.1',
      memo: '',
      createdAt: new Date('2021-12-06T07:49:35.507Z'),
      updatedAt: new Date('2021-12-06T07:49:35.507Z'),
    },
    {
      id: 42,
      userId: 'odjfw',
      isMain: true,
      nickName: 'tbsec',
      state: 'ok',
      checkedAt: new Date('2021-12-04T01:10:00.000Z'),
      lastIp: '192.168.0.1',
      memo: '',
      createdAt: new Date('2021-12-06T07:49:35.546Z'),
      updatedAt: new Date('2021-12-06T07:49:35.546Z'),
    },
    {
      id: 43,
      userId: 'fibzcg',
      isMain: true,
      nickName: 'mis',
      state: 'ok',
      checkedAt: new Date('2021-12-04T01:10:00.000Z'),
      lastIp: '192.168.0.1',
      memo: '',
      createdAt: new Date('2021-12-06T07:49:35.584Z'),
      updatedAt: new Date('2021-12-06T07:49:35.584Z'),
    },
    {
      id: 44,
      userId: 'pzu',
      isMain: true,
      nickName: 'rbd',
      state: 'ok',
      checkedAt: new Date('2021-12-04T01:10:00.000Z'),
      lastIp: '192.168.0.1',
      memo: '',
      createdAt: new Date('2021-12-06T07:49:35.620Z'),
      updatedAt: new Date('2021-12-06T07:49:35.620Z'),
    },
  ],
  totalItems: 107,
};

export const AccountManage = () => {
  const [colDefs, setColDefs] = useState<ColDef[]>([
    { field: 'id', headerName: 'ID', editable: false, pinned: 'left', checkboxSelection: true },
    {
      field: 'isMain',
      headerName: '구분',
      editable: true,
      cellEditor: 'CheckboxCellEditor',
    },
    { field: 'nickName', headerName: '닉네임', editable: true },
    { field: 'state', headerName: '상태', editable: true },
    { field: 'checkedAt', headerName: '최종확인', editable: true },
    { field: 'lastIp', headerName: '적용 IP', editable: true },
    { field: 'memo', headerName: '메모', editable: true },
  ]);

  return (
    <div className="v-grid-hm">
      <Space>
        <Form.Item label="ID">
          <Input type="text" />
        </Form.Item>
        <Form.Item>
          <Button type="primary">등록 &amp; 로그인</Button>
        </Form.Item>
        <Form.Item>
          <Button>삭제</Button>
        </Form.Item>
        <Form.Item>
          <Button>새로 로그인</Button>
        </Form.Item>
        <Form.Item>
          <Button>저장</Button>
        </Form.Item>
        <Form.Item>
          <Button danger>삭제</Button>
        </Form.Item>
      </Space>

      <div
        id="myGrid"
        style={{
          height: '100%',
          width: '100%',
        }}
        className="ag-theme-alpine"
      >
        <AgGridReact
          defaultColDef={{
            flex: 1,
            editable: true,
            resizable: true,
          }}
          columnDefs={colDefs}
          rowSelection="multiple"
          frameworkComponents={{ NumericCellEditor: NumericCellEditor, CheckboxCellEditor: CheckboxCellEditor }}
          singleClickEdit={true}
          rowData={data?.items}
        ></AgGridReact>
      </div>
    </div>
  );
};
