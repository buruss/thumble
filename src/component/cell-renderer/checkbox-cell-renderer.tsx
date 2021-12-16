import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';

export const CheckboxCellRenderer = (props: { value: boolean }) => {
  // const inputRef = useRef<HTMLInputElement>(null);
  // const [value, setValue] = useState(false);

  // useImperativeHandle(ref, () => {
  //   return {
  //     getValue: () => {
  //       return props.value;
  //     },
  //     afterGuiAttached: () => {
  //       setValue(props.value);
  //       inputRef?.current?.focus();
  //     },
  //   };
  // });

  // function onChange(e: CheckboxChangeEvent) {
  //   setValue(e.target.checked);
  // }

  return (
    <Checkbox
      // ref={inputRef}
      defaultChecked={props.value}
      /* onChange={onChange} */ style={{ width: '100%', height: '100%' }}
    />
  );
};
