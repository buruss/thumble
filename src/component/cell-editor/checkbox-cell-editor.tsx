import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';

export const CheckboxCellEditor = forwardRef((props: { value: boolean }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      getValue: () => {
        return value;
      },
      afterGuiAttached: () => {
        setValue(props.value);
        inputRef?.current?.focus();
      },
    };
  });

  function onChange(e: CheckboxChangeEvent) {
    setValue(e.target.checked);
  }

  return (
    <Checkbox
      autoFocus
      ref={inputRef}
      onChange={onChange}
      checked={value}
      style={{ width: '100%', height: '100%', marginLeft: '18px' }}
    />
  );
});
