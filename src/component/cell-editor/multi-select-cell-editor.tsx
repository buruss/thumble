import { Select } from 'antd';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { OptionsType, OptionGroupData, OptionData } from 'rc-select/lib/interface';

export const MultiSelectCellEditor = forwardRef(
  (props: { value: string; valueLabels?: { value: string; label: string }[] }, ref: any) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [tags, setTags] = useState<string[]>([]);

    function onChange(tags: string[], option?: OptionsType | OptionData | OptionGroupData) {
      setTags(Array.from(new Set(tags)));
    }

    useImperativeHandle(ref, () => {
      return {
        getValue: () => {
          return tags.join(',').trimEx(',').replaceAll(',,', ',');
        },
        afterGuiAttached: () => {
          setTags(
            Array.from(
              new Set(
                props.value
                  ?.trimEx(',')
                  .replaceAll(',,', ',')
                  .split(',')
                  .map(v => v.trim()),
              ),
            ),
          );
          inputRef?.current?.focus();
        },
      };
    });

    // 타이핑 중 포커스 잃을 때 태그 추가하려고 onBlur를 아래와 같이 만들어 봤으나
    // 실제로는 ag-grid 에 전달되지는 않아서 무의미함.
    const onBlur = (elem: React.FocusEvent<HTMLInputElement>) => {
      const { value } = elem.target;
      if (value) {
        setTags(Array.from(new Set([...tags, value])));
      }
    };

    return (
      <Select
        ref={inputRef}
        mode={props.valueLabels ? 'multiple' : 'tags'}
        onChange={onChange}
        onBlur={onBlur}
        tokenSeparators={[' ', ',']}
        value={tags}
        options={props.valueLabels}
        dropdownMatchSelectWidth={false}
        autoFocus
        defaultOpen
        style={{ width: '100%', height: '100%' }}
      ></Select>
    );
  },
);
