import { InputNumber } from 'antd';
import React, { forwardRef, useState, useRef, useEffect, useCallback, useImperativeHandle, KeyboardEvent } from 'react';

export const NumericCellEditor = forwardRef((props: any, ref) => {
  const [value, setValue] = useState(parseInt(props.value));
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => {
    return {
      getValue() {
        return value;
      },
      afterGuiAttached: () => {
        setValue(props.value);
        inputRef?.current?.focus();
      },
    };
  });

  const onChange = useCallback(val => {
    setValue(val);
  }, []);

  useEffect(() => inputRef?.current?.focus(), []);

  return <InputNumber value={value} onChange={onChange} ref={inputRef} style={{ width: '100%', height: '100%' }} />;
});
