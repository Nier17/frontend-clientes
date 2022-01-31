import React, { useEffect, useImperativeHandle } from "react";
import styled, { css } from "styled-components";
import {
  useTable,
  useSortBy,
  usePagination,
  useRowSelect,
  useFlexLayout,
} from "react-table";
import ButtonImage from "../components/ButtonImage";
import { ReactComponent as ArrowLeftSVG } from "../assets/arrowLeft.svg";
import { ReactComponent as ArrowRightSVG } from "../assets/arrowRight.svg";
import { ReactComponent as ArrowUpSVG } from "../assets/arrowUp.svg";
import { ReactComponent as ArrowDownSVG } from "../assets/arrowDown.svg";
import Spinner from "../components/Spinner";

const Table = ({
  columns,
  data,
  isLoading,
  getRowProps,
  onSelected,
  innerRef,
  className,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    selectedFlatRows,
    toggleRowSelected,
    dispatch,
    state: { pageIndex, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      getRowId: (row, index) => row.id,
      autoResetSelectedRows: false,
      autoResetSortBy: false,
      stateReducer: reducer,
    },
    useSortBy,
    usePagination,
    useFlexLayout,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        ...columns,
        {
          id: "selection",

          width: 1,

          Cell: ({ row }) => <WrapperCheckbox></WrapperCheckbox>,
        },
      ]);
    }
  );

  useEffect(() => {
    onSelected(selectedRowIds);
  }, [selectedRowIds]);

  useImperativeHandle(
    innerRef,
    () => ({
      clearSelectedRowIds: () => {
        dispatch({ type: "deselectAllRows" });
      },
    }),
    [dispatch]
  );

  return (
    <Styles className={className}>
      <div className="tableWrap">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  // Add the sorting props to control sorting. For this example
                  // we can add them into the header props
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <SortedTagSVG as={ArrowDownSVG} />
                      ) : (
                        <SortedTagSVG as={ArrowUpSVG} />
                      )
                    ) : (
                      ""
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {isLoading && (
              <TableRowLoading isPageEmpty={page.length === 0}>
                <td>
                  <WrapperSpinner>
                    <Spinner />
                  </WrapperSpinner>
                </td>
              </TableRowLoading>
            )}
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps(getRowProps(page[i].index))}
                  className={row.isSelected ? "rowSelected" : ""}
                  onClick={() => {
                    row.toggleRowSelected();
                  }}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination>
        <PaginationButton
          type="secondary"
          iconSVG={ArrowLeftSVG}
          onClick={() => {
            previousPage();
          }}
          disabled={!canPreviousPage || isLoading}
        />
        <PageNumber>
          <strong>{pageIndex + 1}</strong> de {pageOptions.length}
        </PageNumber>
        <PaginationButton
          type="secondary"
          iconSVG={ArrowRightSVG}
          onClick={() => {
            nextPage();
          }}
          disabled={!canNextPage || isLoading}
        />
      </Pagination>
    </Styles>
  );
};

Table.defaultProps = {
  columns: [],
  data: [],
  autoResetPage: false,
  isLoading: false,
  onSelected: () => {},
  className: undefined,
  getRowProps: () => {},
};

const reducer = (newState, action) => {
  if (action.type === "deselectAllRows") {
    return { ...newState, selectedRowIds: {} };
  }

  return newState;
};

const Styles = styled.div`
  /* This is required to make the table full-width */
  display: block;
  max-width: 100%;
  outline: 0;

  /* This will make the table scrollable when it gets too small */
  .tableWrap {
    display: block;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    border-bottom: 1px solid #b8b8c5;
  }

  table {
    /* Make sure the inner table is always as wide as needed */
    width: 100%;
    border-spacing: 0;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }

      cursor: pointer;
    }

    tbody {
      position: relative;
    }

    tbody > tr:hover {
      background-color: rgb(40, 75, 99, 0.2);

      color: black;
    }

    tbody > .rowSelected {
      background-color: #284b63 !important;
      color: white !important;
    }

    th {
      font-size: 0.9em;
      font-weight: 700;
      border-right: 0 !important;

      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;

      word-break: break-word;

      :hover {
        background-color: #eceff1;
      }
    }

    th,
    td {
      margin: 0;
      padding: 10px;
      border-bottom: 1px solid #b8b8c5;
      border-right: 1px solid #b8b8c5;

      overflow-wrap: break-word;

      :last-child {
        border-right: 0;
      }

      .toRight {
        text-align: right;
      }
    }
  }
`;

const SortedTagSVG = styled.div`
  width: 10px;
  height: 10px;

  fill: #284b63;

  margin: 5px;
`;

const PaginationButton = styled(ButtonImage)`
  margin: 5px;
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 15px 0px 30px 0px;
`;

const PageNumber = styled.div`
  font-size: 0.9em;
  margin: 0px 20px;
`;

const WrapperCheckbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WrapperSpinner = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;

  cursor: not-allowed;

  background-color: rgba(255, 255, 255, 0.8);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const TableRowLoading = styled.tr`
  && > td {
    padding: 0;
    height: 0;
    max-height: 0;
    border: 0;
  }

  ${(props) =>
    props.isPageEmpty &&
    css`
      height: 80px;
    `}
`;

export default React.forwardRef((props, ref) => (
  <Table innerRef={ref} {...props} />
));
