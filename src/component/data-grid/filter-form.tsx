import React from 'react';
import { Button, Checkbox, Col, DatePicker, Form, Input, InputNumber, Row, Select, Space } from 'antd';
import { PlusCircleTwoTone, MinusCircleTwoTone, SearchOutlined } from '@ant-design/icons';
import { DeepRequired } from '../../common/shared-types';
import dayjs from 'dayjs';
import { BaseEntity, FilterType, WhereInput } from './interface';
import { FilterOperators } from './const';

// 선택한 컬럼의 데이터 타입에 맞는 입력 위젯 반환
function getTypedInputs(filterType: FilterType, operator?: string, valueLabels?: { value: string; label: string }[]) {
  const style = { minWidth: '100px' };

  // in, notIn 인 경우 다중 선택 입력 사용
  if (['in', 'notIn'].includes(operator || '')) {
    return (
      <Select
        mode={valueLabels ? 'multiple' : 'tags'}
        allowClear
        options={valueLabels}
        dropdownMatchSelectWidth={false}
        tokenSeparators={[' ', ',']}
        style={style}
      />
    );
  }
  // 다중 선택인 경우 Select 입력을 사용
  else if (['string', 'number'].includes(filterType) && valueLabels?.length) {
    return <Select allowClear options={valueLabels} dropdownMatchSelectWidth={false} style={style} />;
  }
  // 그 외는 데이터 타입별 단순 입력란 사용
  else {
    return {
      string: <Input placeholder="검색할 값을 입력하세요." style={style} />,
      number: <InputNumber placeholder="검색할 값을 입력하세요." style={style} />,
      date: <DatePicker allowClear format="YYYY-MM-DD" style={style} />,
      boolean: <Checkbox style={style} />,
    }[filterType];
  }
}

export type FilterInput<T> = {
  field?: keyof T;
  operator?: string;
  value?: string | number | boolean | dayjs.Dayjs;
};

interface Props<T> {
  columns: {
    field?: string;
    headerName?: string;
    filterType?: FilterType;
    cellEditorParams?: { valueLabels: { value: string; label: string }[] };
  }[];
  // filterInputs: FilterInput[];
  onSubmit: (values: WhereInput<T>) => void;
}

type FilterFormInput<T> = { filters: FilterInput<T>[] };

export const FilterForm = <T extends BaseEntity>({ /* filterInputs,  */ columns, onSubmit }: Props<T>) => {
  const colValueLabels = columns.map(({ field, headerName }) => ({ value: field || '', label: headerName || '' }));
  const columnsMap = new Map(columns.map(column => [column.field || '', column]));

  const [form] = Form.useForm();
  const [formValues, setFormValues] = React.useState<FilterFormInput<T>>({ filters: [{}] });

  // 필
  // 검색 제출
  function onFinish(values: FilterFormInput<T>) {
    console.log('onFinish', values);
    // prisma where 조건으로 변환하기 위해 유효한 조건들만 추려서 가공
    const validFilters = values.filters
      .filter(filter => filter.field && filter.operator)
      .map(filter => ({ ...filter, value: filter.value ?? '' })) as DeepRequired<FilterInput<T>>[];

    for (const f of values.filters) {
      console.log('field value = dayjs ', dayjs.isDayjs(f.value));
    }
    // prisma 검색 조건 포맷으로 변환하여 전달
    // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#filter-conditions-and-operators
    // 필드명을 객체의 키로 사용하는 방식이므로 동일한 필드에 두 개 이상의 조건을 주려면 반드시 AND 조건으로 연결한 배열로 전달해야 한다.
    onSubmit({
      AND: validFilters.map(({ field, operator, value }) => ({
        [field]: {
          // DatePicker는 dayjs 값을 반환하므로 Date 형식으로 변환시켜서 사용해야 함
          [operator]: dayjs.isDayjs(value) ? dayjs(value).toDate() : value,
        },
      })) as any,
    });
  }

  // 폼 데이터 변경 시 입력 체크, 자동 변환
  function onValuesChange(v: FilterFormInput<T>, values: FilterFormInput<T>) {
    console.log('onValuesChange', v, values);
    // 연산자가 변경된 필드 타입에 허용되지 않으면 지우기
    for (const [idx, filter] of v.filters.entries()) {
      // 변경된 필드
      const field = filter?.field?.toString() || '';
      // 기존 필드
      const oldField = formValues.filters[idx]?.field;
      // 새 필드가 선택된 경우
      if (field && field !== oldField) {
        // 변경된 필드의 데이터 타입
        const colType = columnsMap.get(field)?.filterType || 'string';
        // 해당 데이터 타입이 지원하는 연산자 목록
        const opList = Object.keys(FilterOperators[colType]);
        // 기존 선택되어 있는 연산자
        const currentOperator = values.filters[idx].operator;

        // 기존 선택되어 있는 연산자가 새 데이터 타입에서 지원하지 않으면 초기화
        if (!currentOperator || !opList.includes(currentOperator)) {
          values.filters[idx].operator = opList[0];
        }

        // 필드가 달라진 경우 기존 입력된 값은 초기화시킨다.
        values.filters[idx].value = colType === 'boolean' ? false : undefined;
      }
    }
    setFormValues(values);
  }

  return (
    <Form form={form} name="filterForm" initialValues={formValues} onValuesChange={onValuesChange} onFinish={onFinish}>
      <Space size={8} align="start">
        <Form.List name="filters">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name: index, fieldKey, ...restField }) => {
                // 선택된 필드
                const field = formValues.filters[index]?.field?.toString() || '';
                const column = columnsMap.get(field);
                // 선택된 필드의 데이터 타입
                const filterType = column?.filterType || FilterType.string;

                return (
                  <Row key={key} gutter={8} style={{ marginBottom: '5px' }}>
                    {/* 필드 목록 드롭다운 */}
                    <Col>
                      <Form.Item
                        {...restField}
                        name={[index, 'field']}
                        fieldKey={[fieldKey, 'field']}
                        style={{ marginBottom: 0 }}
                      >
                        <Select
                          allowClear
                          options={colValueLabels}
                          dropdownMatchSelectWidth={false}
                          data-name={index} /* 행 번호 */
                          style={{ width: '100%' }}
                          placeholder="검색 항목 선택"
                        />
                      </Form.Item>
                    </Col>

                    {/* 연산자 목록 드롭다운 */}
                    <Col>
                      <Form.Item
                        {...restField}
                        name={[index, 'operator']}
                        fieldKey={[fieldKey, 'operator']}
                        style={{ marginBottom: 0 }}
                      >
                        {
                          <Select
                            allowClear
                            options={Object.entries(FilterOperators[filterType]).map(([value, label]) => ({
                              value,
                              label,
                            }))}
                            dropdownMatchSelectWidth={false}
                            style={{ width: '100%' }}
                          />
                        }
                      </Form.Item>
                    </Col>

                    {/* 조건 값 입력란 */}
                    <Col flex={1}>
                      <Form.Item
                        {...restField}
                        name={[index, 'value']}
                        fieldKey={[fieldKey, 'value']}
                        valuePropName={filterType === 'boolean' ? 'checked' : 'value'}
                        style={{ marginBottom: 0 }}
                      >
                        {getTypedInputs(
                          filterType,
                          formValues.filters[index]?.operator,
                          column?.cellEditorParams?.valueLabels,
                        )}
                      </Form.Item>
                    </Col>

                    {/* 조건 추가 또는 삭제 */}
                    <Col>
                      <Form.Item style={{ fontSize: '1.5em', marginBottom: 0 }}>
                        {index < fields.length - 1 ? (
                          <MinusCircleTwoTone onClick={() => remove(index)} />
                        ) : (
                          // onClick={add} 이런 식으로 전달하면 onFinish의 values 에 react.event 객체가 전달되는 오류 발생함
                          <PlusCircleTwoTone onClick={() => add()} />
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                );
              })}
            </>
          )}
        </Form.List>
        <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
          검색
        </Button>
      </Space>
    </Form>
  );
};
