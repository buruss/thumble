import * as React from 'react';
import { ColDef, SelectCellEditor } from 'ag-grid-community';
import { PostType } from '../../../common/constants';
import dayjs from 'dayjs';
import {
  CheckboxCellEditor,
  CheckboxCellRenderer,
  DateTimeCellEditor,
  FilterType,
  HeaderCellRenderer,
  MultiSelectCellEditor,
  NumericCellEditor,
} from '../../../component';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { FilterForm } from '../../../component/data-grid/filter-form';
import { AgGridReact } from 'ag-grid-react';
import { Space, Col, Button, Pagination } from 'antd';

const categories = {
  items: [
    {
      id: 1,
      name: '마케팅',
      createdAt: new Date('2021-12-08T02:38:39.000Z'),
      updatedAt: new Date('2021-12-08T02:38:39.000Z'),
    },
    {
      id: 2,
      name: 'IT',
      createdAt: new Date('2021-12-08T02:38:55.000Z'),
      updatedAt: new Date('2021-12-08T02:38:55.000Z'),
    },
    {
      id: 3,
      name: '경영',
      createdAt: new Date('2021-12-08T02:39:10.000Z'),
      updatedAt: new Date('2021-12-08T02:39:10.000Z'),
    },
    {
      id: 4,
      name: '정치',
      createdAt: new Date('2021-12-08T02:39:16.000Z'),
      updatedAt: new Date('2021-12-08T02:39:16.000Z'),
    },
    {
      id: 5,
      name: '경제',
      createdAt: new Date('2021-12-08T02:39:23.000Z'),
      updatedAt: new Date('2021-12-08T02:39:23.000Z'),
    },
    {
      id: 6,
      name: '과학',
      createdAt: new Date('2021-12-08T02:39:29.000Z'),
      updatedAt: new Date('2021-12-08T02:39:29.000Z'),
    },
  ],
  totalItems: 6,
};

const postTypes = [
  { value: 'NOTICE', label: '공지' },
  { value: 'MANUAL', label: '매뉴얼' },
];

const posts = {
  items: [
    {
      id: 1,
      userId: 1,
      title: '제목1',
      type: 'NOTICE',
      viewCount: 1,
      hashtags: '성공,홍보전략',
      postedAt: new Date('2021-12-08T08:55:14.000Z'),
      isFixed: false,
      createdAt: new Date('2021-12-08T08:55:14.000Z'),
      updatedAt: new Date('2021-12-08T08:55:14.000Z'),
      userName: '갑돌',
      categoryIds: '2,4',
    },
    {
      id: 2,
      userId: 1,
      title: '제목2',
      type: 'MANUAL',
      viewCount: 32,
      hashtags: '템플릿',
      postedAt: new Date('2021-12-30T11:10:00.145Z'),
      isFixed: true,
      createdAt: new Date('2021-12-09T06:07:14.926Z'),
      updatedAt: new Date('2021-12-09T06:07:14.926Z'),
      userName: '갑돌',
      categoryIds: '3,6',
    },
    {
      id: 5,
      userId: 1,
      title: '제목5',
      type: 'MANUAL',
      viewCount: 3,
      hashtags: '과학',
      postedAt: null,
      isFixed: true,
      createdAt: new Date('2021-12-09T06:40:03.225Z'),
      updatedAt: new Date('2021-12-09T06:40:03.225Z'),
      userName: '갑돌',
      categoryIds: '6,3,2',
    },
    {
      id: 6,
      userId: 1,
      title: '제목61',
      type: 'MANUAL',
      viewCount: 4,
      hashtags: '맛집,토마토,파스타',
      postedAt: new Date('2021-12-09T17:00:00.807Z'),
      isFixed: true,
      createdAt: new Date('2021-12-09T06:40:03.226Z'),
      updatedAt: new Date('2021-12-09T06:40:03.226Z'),
      userName: '갑돌',
      categoryIds: '1,6',
    },
    {
      id: 7,
      userId: 1,
      title: '제목7',
      type: 'MANUAL',
      viewCount: 55,
      hashtags: '인스타',
      postedAt: null,
      isFixed: true,
      createdAt: new Date('2021-12-09T06:40:03.226Z'),
      updatedAt: new Date('2021-12-09T06:40:03.226Z'),
      userName: '갑돌',
      categoryIds: '5,3',
    },
    {
      id: 9,
      userId: 1,
      title: '제목9',
      type: 'MANUAL',
      viewCount: 7,
      hashtags: '블로거,체험단',
      postedAt: null,
      isFixed: true,
      createdAt: new Date('2021-12-09T06:40:03.226Z'),
      updatedAt: new Date('2021-12-09T06:40:03.226Z'),
      userName: '갑돌',
      categoryIds: '2,4',
    },
    {
      id: 10,
      userId: 1,
      title: '제목10',
      type: 'NOTICE',
      viewCount: 8,
      hashtags: '선거,방송',
      postedAt: null,
      isFixed: true,
      createdAt: new Date('2021-12-09T06:40:03.226Z'),
      updatedAt: new Date('2021-12-09T06:40:03.226Z'),
      userName: '갑돌',
      categoryIds: '2',
    },
    {
      id: 11,
      userId: 1,
      title: '제목11',
      type: 'MANUAL',
      viewCount: 9,
      hashtags: '공익,광고',
      postedAt: null,
      isFixed: false,
      createdAt: new Date('2021-12-09T06:40:03.226Z'),
      updatedAt: new Date('2021-12-09T06:40:03.226Z'),
      userName: '갑돌',
      categoryIds: '5,6',
    },
    {
      id: 13,
      userId: 1,
      title: '제목1333',
      type: 'MANUAL',
      viewCount: 1134,
      hashtags: '마바사,ak',
      postedAt: new Date('2021-12-09T06:36:57.686Z'),
      isFixed: false,
      createdAt: new Date('2021-12-09T06:40:03.226Z'),
      updatedAt: new Date('2021-12-09T06:40:03.226Z'),
      userName: '갑돌',
      categoryIds: '5,6,4',
    },
    {
      id: 14,
      userId: 1,
      title: '제목144',
      type: 'NOTICE',
      viewCount: 12,
      hashtags: '핫클립',
      postedAt: new Date('2021-12-09T06:37:25.172Z'),
      isFixed: false,
      createdAt: new Date('2021-12-09T06:40:03.226Z'),
      updatedAt: new Date('2021-12-09T06:40:03.227Z'),
      userName: '갑돌',
      categoryIds: '4,3,2',
    },
  ],
  totalItems: 54,
};

export const PostTemp = () => {
  //#region //! 그리드 설정 시작
  // 내려받은 카테고리에서 카테고리명을 빠르게 검색하기 위해서 사용하는 Map
  const categoriesMapRef = React.useRef<Map<number, string>>(
    new Map(categories?.items?.map(item => [item.id, item.name])),
  );
  // Pagination 페이지 번호
  const [pageNumber, setPageNumber] = React.useState(1);
  // Pagination 페이지 당 표시 행수
  const [pageSize, setPageSize] = React.useState(10);

  // Ag-grid Column 정의
  const colDefs: (ColDef & { useFilter?: boolean; filterType?: FilterType })[] = [
    {
      field: 'id',
      headerName: 'ID',
      editable: false,
      pinned: 'left',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      useFilter: true,
      filterType: FilterType.number,
      sortable: true,
    },

    { field: 'userName', headerName: '사용자명', useFilter: true, filterType: FilterType.string, sortable: true },
    {
      field: 'categoryIds',
      headerName: '분류',
      editable: true,
      cellEditor: 'MultiSelectCellEditor',
      useFilter: true,
      filterType: FilterType.string,
      sortable: true,
      // MultiSelectCellEditor에 전달할 추가 파라미터. 분류 목록
      cellEditorParams: {
        valueLabels: categories?.items.map(item => ({ value: item.id.toString(), label: item.name })),
      },
      valueFormatter: ({ value }: { value: string }) => {
        if (value?.length && categoriesMapRef.current) {
          return value
            .split(',')
            .map(id => categoriesMapRef.current?.get(parseInt(id)))
            .join(',');
        }
        return '';
      },
    },
    {
      field: 'title',
      headerName: '제목',
      editable: true,
      useFilter: true,
      filterType: FilterType.string,
      sortable: true,
    },
    // 계산된 셀. field 대신 valueGetter 콜백을 전달함
    // field 속성이 없으면 colId가 컬럼 식별자로 사용된다.
    { colId: 'titleLen', headerName: '제목 길이', valueGetter: params => params.data.title?.length.toLocaleString() },
    {
      field: 'type',
      headerName: '종류',
      editable: true,
      cellEditor: 'SelectCellEditor',
      useFilter: true,
      // SelectCellEditor에 전달할 추가 파라미터. 게시글 종류 코드와 캡션 모음
      cellEditorParams: {
        // value, label 외의 필드를 전달하면 Select 에서 오류가 발생하므로 주의
        valueLabels: postTypes.map(({ value, label }) => ({ value, label })),
        default: PostType.NOTICE,
      },
      // refData를 이용하여 셀 포맷하기
      // https://www.ag-grid.com/react-data-grid/reference-data/#using-the-refdata-property
      refData: Object.fromEntries(postTypes.map(item => [item.value, item.label || '']) || []),
      filterType: FilterType.string,
      sortable: true,
    },
    {
      field: 'viewCount',
      headerName: '조회수',
      editable: true,
      cellEditor: 'NumericCellEditor',
      useFilter: true,
      filterType: FilterType.number,
      sortable: true,
    },
    {
      field: 'hashtags',
      headerName: '해시태그',
      editable: true,
      cellEditor: 'MultiSelectCellEditor',
      useFilter: true,
      filterType: FilterType.string,
      sortable: true,
    },
    {
      field: 'postedAt',
      headerName: '게시일시',
      editable: true,
      // dayjs로 날짜 포맷
      valueFormatter: ({ value }) => {
        const dt = dayjs(value);
        if (dt.isValid()) {
          return dt.format('YYYY-MM-DD HH:mm');
        }
        return '';
      },
      cellEditor: 'DateTimeCellEditor',
      useFilter: true,
      filterType: FilterType.date,
      sortable: true,
    },
    {
      field: 'isFixed',
      headerName: '상단고정',
      editable: true,
      cellRenderer: 'CheckboxCellRenderer',
      cellEditor: 'CheckboxCellEditor',
      useFilter: true,
      filterType: FilterType.boolean,
      sortable: true,
    },
  ];
  //#endregion //! 그리드 설정 끝

  // 검색 조건 전달하여 검색
  function onSubmit() {
    console.log('onSubmit');
  }

  return (
    <div className="v-grid-hm">
      <Space align="start">
        <Col>
          {/* 검색 필터 입력 폼 */}
          <FilterForm columns={colDefs.filter(col => col.useFilter)} onSubmit={onSubmit} />
        </Col>
        <Button type="default">추가</Button>
        <Button>저장</Button>
        <Button danger>삭제</Button>
      </Space>

      <div className="ag-theme-alpine v-grid-mf">
        <AgGridReact
          defaultColDef={{
            flex: 1,
            resizable: true,
          }}
          columnDefs={colDefs.map(({ useFilter, filterType, ...colDef }) => colDef)}
          rowSelection="multiple"
          frameworkComponents={{
            CheckboxCellRenderer,
            NumericCellEditor,
            CheckboxCellEditor,
            SelectCellEditor,
            DateTimeCellEditor,
            MultiSelectCellEditor,
            agColumnHeader: HeaderCellRenderer,
          }}
          singleClickEdit={true}
          enterMovesDownAfterEdit={true}
          stopEditingWhenCellsLoseFocus={true}
          rowData={posts.items}
        />
        <Pagination
          showSizeChanger
          current={pageNumber}
          pageSize={pageSize}
          total={posts?.totalItems || 0}
          style={{ textAlign: 'center', paddingTop: '10px' }}
        />
      </div>
    </div>
  );
};
