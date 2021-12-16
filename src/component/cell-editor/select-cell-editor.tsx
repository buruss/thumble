import { Select } from 'antd';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { OptionsType, OptionGroupData, OptionData } from 'rc-select/lib/interface';
const { Option } = Select;

export const SelectCellEditor = forwardRef(
  (props: { value: string; valueLabels: { value: string; label: string }[]; default: string }, ref: any) => {
    console.log('SelectCellEditor', { props });
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState<string>();

    function onChange(value: string, option: OptionsType | OptionData | OptionGroupData) {
      setValue(value);
    }

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

    return (
      <Select
        ref={inputRef}
        onChange={onChange}
        value={value}
        options={props.valueLabels}
        dropdownMatchSelectWidth={false}
        autoFocus
        defaultOpen
        style={{ width: '100%', height: '100%' }}
      ></Select>
    );
  },
);
