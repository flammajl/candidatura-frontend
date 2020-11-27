import React, { useCallback, useRef, useState } from 'react';
import {
  Column,
  useSortBy,
  useTable,
  useGlobalFilter,
  usePagination,
  Row,
} from 'react-table';
import { DataProps } from '../App';
import GlobalFilter from './GlobalFilter';
import Modal, { ModalHandles } from './Modal';
import styles from '../style/Table.module.css';

interface TableProps {
  data: DataProps[];
  columns: Column<DataProps>[];
}

interface newRow extends Row<DataProps> {
  values: DataProps;
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  const [modalData, setModalData] = useState<DataProps>({} as DataProps);
  const modalRef = useRef<ModalHandles>(null);

  const handleOpenModal = useCallback((value: DataProps) => {
    modalRef.current?.openModal();
    setModalData(value);
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    page,
    pageOptions,
    gotoPage,
    setGlobalFilter,
  } = useTable(
    { columns, data, initialState: { pageSize: 20 } },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  const { globalFilter } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? '▼' : '▲') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {
            // eslint-disable-next-line
            // @ts-ignore }
            page.map((row: newRow) => {
              prepareRow(row);
              return (
                <tr
                  onClick={() => {
                    handleOpenModal(row.values);
                  }}
                  {...row.getRowProps()}
                >
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })
          }
        </tbody>
      </table>
      {pageOptions.map(pages => (
        <button
          type="button"
          key={pages}
          onClick={() => {
            gotoPage(pages);
          }}
          className={styles.button}
        >
          {pages + 1}
        </button>
      ))}

      <Modal data={modalData} ref={modalRef} />
    </>
  );
};

export default Table;
