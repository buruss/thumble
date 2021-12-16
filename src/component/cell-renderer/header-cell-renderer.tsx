import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { ColumnApi } from 'ag-grid-community';
import React, { useRef, useState } from 'react';

export const HeaderCellRenderer = (props: { column: any; enableSorting: boolean; displayName: string }) => {
  const { column, enableSorting, displayName } = props;
  // const [ascSort, setAscSort] = useState('inactive');
  // const [descSort, setDescSort] = useState('inactive');
  // const [noSort, setNoSort] = useState('inactive');
  const [sort, setSort] = useState<'asc' | 'desc' | null>(null);
  // const refButton = useRef(null);

  // const onMenuClicked = () => {
  //   props.showColumnMenu(refButton.current);
  // };

  const onSortChanged = () => {
    const newSort = column.isSortAscending() ? 'asc' : column.isSortDescending() ? 'desc' : null;
    setSort(newSort);
  };

  // const onSortRequested = (order: any, event: any) => {
  //   console.log('onSortRequested', { order, event });
  // props.setSort(order, event.shiftKey);
  // };

  React.useEffect(() => {
    column.addEventListener('sortChanged', onSortChanged);
    onSortChanged();
  }, []);

  // let menu = null;
  // if (props.enableMenu) {
  //   menu = (
  //     <div ref={refButton} className="customHeaderMenuButton" onClick={() => onMenuClicked()}>
  //       <i className={`fa ${props.menuIcon}`}></i>
  //     </div>
  //   );
  // }

  // }

  return (
    <div>
      <div style={{ display: 'inline-block' }}>{displayName}</div>
      <div style={{ display: 'inline-block' }}>
        {sort === 'asc' ? <CaretUpOutlined /> : sort === 'desc' ? <CaretDownOutlined /> : null}
      </div>
    </div>
  );
};
