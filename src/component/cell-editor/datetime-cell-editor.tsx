import { DatePicker } from 'antd';
import React, { forwardRef, useState, useRef, useImperativeHandle } from 'react';
import dayjs from 'dayjs';

export const DateTimeCellEditor = forwardRef((props: any, ref) => {
  const [value, setValue] = useState<dayjs.Dayjs | null>();
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      getValue() {
        return value?.isValid()
          ? // 날짜가 변경되지 않은 경우 전달받은 Date 객체를 그대로 반환해야
            // Ag-grid에서 불필요한 onCellValueChanged 이벤트가 발생하지 않음.
            value.toDate().toString() === props.value?.toString()
            ? props.value
            : value.toDate()
          : null;
      },
      afterGuiAttached: () => {
        console.log('DateTimeCellEditor afterGuiAttached: ', props.value);
        const dt = dayjs(props.value);
        // 빈 값 또는 잘못된 값을 넣을 때는 null로 입력해야 달력에 'invalid date' 와 NaN이 표시되는 문제를 방지할 수 있다.
        setValue(dt.isValid() ? dt : null);
        (inputRef?.current as any)?.focus();
      },
    };
  });

  const onSelect = (val: any) => {
    console.log('datetime onSelect value', val);
    setValue(val);
  };

  const onChange = (val: any) => {
    console.log('datetime onChange value', val);
    // x 버튼으로 지운 경우
    setValue(val);
  };

  return (
    <DatePicker
      allowClear
      showTime
      autoFocus
      open
      showSecond={false}
      onChange={onChange}
      onSelect={onSelect}
      ref={inputRef}
      format="YYYY-MM-DD HH:mm"
      value={value as any}
      style={{ width: '100%', height: '100%' }}
    />
  );
});
