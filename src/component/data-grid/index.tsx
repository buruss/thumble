import * as React from 'react';
import { Button, Col, notification, Pagination, Space } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import { CellValueChangedEvent, ColumnApi, GridApi, GridReadyEvent, RowClassParams, RowNode } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useState } from 'react';
import { PostType } from '../../common/constants';
import {
  CheckboxCellEditor,
  DateTimeCellEditor,
  MultiSelectCellEditor,
  NumericCellEditor,
  SelectCellEditor,
} from '../cell-editor';
import { CheckboxCellRenderer, HeaderCellRenderer } from '../cell-renderer';
import { FilterForm } from './filter-form';
import {
  BaseEntity,
  ColDefEx,
  OrderByWithRelationInput,
  SelectOption,
  WhereInput,
  WhereUniqueInput,
} from './interface';
import { Enumerable, SortOrder } from '../../common/prisma';

export interface DataGridProps {
  data: { items: []; totalItems: number };
  colDefsEx: ColDefEx[];
  query: string;
  mutate: string;
  editFocusColId: string;
}

/**
 * findMany
 */
export type FindManyArgs<T> = {
  select?: SelectOption<T> | null;
  where?: WhereInput<T>;
  orderBy?: Enumerable<OrderByWithRelationInput<T>>;
  cursor?: WhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: any; // Prisma.Enumerable<Prisma.VPostTempScalarFieldEnum>
};

export const DataGrid = <T extends BaseEntity>({ data, colDefsEx, query, mutate, editFocusColId }: DataGridProps) => {
  //#region //! 그리드 설정 시작
  // Pagination 페이지 번호
  const [pageNumber, setPageNumber] = React.useState(1);
  // Pagination 페이지 당 표시 행수
  const [pageSize, setPageSize] = React.useState(10);
  // 정렬 컬럼 및 방향
  const [orderBy, setOrderBy] = React.useState<Record<string, SortOrder>[]>([]);
  // 내려받은 카테고리에서 카테고리명을 빠르게 검색하기 위해서 사용하는 Map
  // const categoriesMapRef = React.useRef<Map<number, string>>();
  // Ag-grid API
  const [gridApi, setGridApi] = useState<GridApi>();
  const [columnApi, setColumnApi] = useState<ColumnApi>();
  // 변경된 행 노드 Id 목록
  const upsertMapRef = React.useRef<Map<string, Partial<T>>>(new Map<string, Partial<T>>());
  //#endregion //! 그리드 설정 끝

  //#region //! 필터 설정 시작
  const [filterInputs, setFilterInputs] = React.useState<WhereInput<T>>({});

  const queryOptions = {};

  // 검색 조건 전달하여 검색
  function onSubmit(values: WhereInput<T>) {
    console.log('onSubmit', values);
    setFilterInputs(values);
  }
  //#endregion //! 필터 설정 끝

  // 쿼리가 달라지면 편집된 데이터 초기화
  React.useEffect(() => {
    upsertMapRef.current.clear();
  }, [JSON.stringify(queryOptions)]);
  //#endregion //! 쿼리 설정 끝

  //#region //! 그리드 이벤트 핸들러 시작

  const onGridReady = (event: GridReadyEvent) => {
    setGridApi(event.api);
    setColumnApi(event.columnApi);
  };

  // 수정된 후 아직 저장되지 않은 행 노랑색 배경 적용
  // 셀단위로 표시하려면 colDef에 getCellStyle 콜백을 다 달아줘야 하기 때문에 피곤해서 행 단위로 표시함.
  function getRowStyle(params: RowClassParams) {
    // 수정된 후 아직 저장되지 않은 행
    // const dbRow = posts?.items?.find(item => item?.id === params.data.id);
    // console.log('getRowStyle, dbRow = ', dbRow);
    return { backgroundColor: upsertMapRef.current.has(params.node?.id || '') ? '#ffffbb' : 'initial' };
  }

  // 변경된 셀의 Node Id 값을 Set에 저장해 놓음
  const onCellValueChanged = (event: CellValueChangedEvent) => {
    const key = event.colDef.field as keyof T;

    console.log(`onCellValueChanged: ${event.node.id}행 ${key}열 =  ${event.newValue}`);

    if (!event.node.id || !key) {
      return;
    }

    // 이 행의 DB 값 객체 구하기
    const oldData: Partial<T> = upsertMapRef.current.get(event.node.id) || {};

    // 새 값이 DB 값과 동일해지면 제거
    if (oldData[key] === event.newValue) {
      delete oldData[key];
      // 새 값이 DB 값과 다르면 DB 값을 기억. 여기서 oldValue는 수정할 때마다 달라지므로 없을 때만 사용
    } else if (!(key in oldData)) {
      oldData[key] = event.oldValue;
    }

    // 달라진 필드가 하나라도 있을 때만 변경 목록에 기억
    if (Object.keys(oldData).length) {
      upsertMapRef.current.set(event.node.id, oldData);
      // 달라진게 없어지면 변경 목록에서 제거
    } else {
      upsertMapRef.current.delete(event.node.id);
    }

    // 셀 편집 후 포커스를 잃을 때 onCellValueChanged 보다 getRowStyle이 먼저 호출되는 문제 있어서
    // 직접 셀을 다시 그려줌. refreshCells force = true 해도 안되어서 redrawRows 호출함
    gridApi?.redrawRows({ rowNodes: [event.node] });
  };

  // 페이지 이동
  function onPageChange(pageNumber: number) {
    setPageNumber(pageNumber);
  }

  // 페이지당 행 수 변경
  function onShowSizeChange(current: number, pageSize: number) {
    setPageSize(pageSize);
  }

  // Ag-grid는 컬럼 헤더 클릭 이벤트를 제공하지 않으므로, 컨테이너의 click 신호에서
  // 헤더 클릭 이벤트를 식별하여 컬럼을 정렬한다.
  function onGridContainerClick(e: any) {
    if (!e.target) {
      return;
    }
    if (e.target.tagName === 'INPUT') {
      return;
    }

    // ag-grid 헤더 셀 클래스명을 이용하여 클릭한 요소의 부모 헤더 셀을 찾은 후
    const colId = e.target.closest('.ag-header-cell')?.getAttribute('col-id') as string;

    if (colId) {
      const colDef = columnApi?.getColumn(colId)?.getColDef();
      console.log({ colDef });
      if (!colDef?.sortable) {
        return;
      }
      const colStates = columnApi?.getColumnState();
      // "col-id" 속성에서 colId를 찾아서 columnState를 조작한다.
      // 그런데, applyColumnState로 state를 변경해도 헤더 셀에 정렬 아이콘이 표시되지는 않고 있음.
      const colState = colStates?.find(state => state.colId === colId);
      if (colState) {
        const sort: SortOrder | null = colState.sort === 'asc' ? 'desc' : colState.sort === 'desc' ? null : 'asc';
        const newOrderBy = Object.entries(sort ? { [colId]: sort } : {})
          .filter(([_, sort]) => !!sort)
          .map(([colId, sort]) => ({ [colId]: sort }));
        setOrderBy(newOrderBy);

        const newState = colStates?.map(state => ({ colId: state.colId, sort: state.colId === colId ? sort : null }));
        console.log({ newState });
        columnApi?.applyColumnState({
          state: newState,
        });
      }
    }
  }
  //#region //! 그리드 이벤트 핸들러 끝

  return (
    <div className="v-grid-hm">
      <Space align="start">
        <Col>
          {/* 검색 필터 입력 폼 */}
          <FilterForm<T> columns={colDefsEx.filter(col => col.useFilter)} onSubmit={onSubmit} />
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
          columnDefs={colDefsEx.map(({ useFilter, filterType, ...colDef }) => colDef)}
          getRowStyle={getRowStyle}
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
          rowData={data?.items || []}
          onGridReady={onGridReady}
          onCellValueChanged={onCellValueChanged}
        />
        <Pagination
          showSizeChanger
          current={pageNumber}
          pageSize={pageSize}
          total={data?.totalItems || 0}
          onShowSizeChange={onShowSizeChange}
          onChange={onPageChange}
          style={{ textAlign: 'center', paddingTop: '10px' }}
        />
      </div>
    </div>
  );
};

export * from './interface';
