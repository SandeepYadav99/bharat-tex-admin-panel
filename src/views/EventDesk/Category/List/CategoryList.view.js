import React, { useCallback, useEffect, useMemo } from "react";
import { IconButton, ButtonBase } from "@material-ui/core";
import { connect, useSelector } from "react-redux";
import PageBox from "../../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../../Datatables/Datatable.table";
import Constants from "../../../../config/constants";
import FilterComponent from "../../../../components/Filter/Filter.component";
import StatusPill from "../../../../components/Status/StatusPill.component";
import useCategoryList from "./CategoryList.hook";
import { Add, Edit, InfoOutlined } from "@material-ui/icons";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../../../libs/history.utils";

const CategoryList = ({ location }) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    isCalling,
    configFilter,
    handleCreateFed,
    handleUpdate,
  } = useCategoryList({ location });

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.event_category);

  const Name = location?.state?.name;

  const tableStructure = useMemo(() => {
    return [
      {
        key: "name",
        label: "name",
        sortable: false,
        render: (temp, all) => <div>{all?.name}</div>,
      },
      {
        key: "phone",
        label: "phone",
        sortable: false,
        render: (temp, all) => <div>{all?.full_contact}</div>,
      },
      {
        key: "priority",
        label: "priority",
        sortable: false,
        render: (temp, all) => <div>{all?.priority}</div>,
      },

      {
        key: "status",
        label: "STATUS",
        sortable: false,
        render: (temp, all) => <div>{<StatusPill status={all?.status} />}</div>,
      },
      {
        key: "action",
        label: "Action",
        style: { width: "15%" },
        render: (temp, all) => (
          <div>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleUpdate(all);
              }}
            >
              <Edit fontSize={"small"} />
              {/* <PeopleOutlineOutlinedIcon fontSize={"small"} /> */}
            </IconButton>
          </div>
        ),
      },
    ];
  }, [handleViewDetails, handleEdit, isCalling]);

  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      onRowSizeChange: handleRowSize,
    };

    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: data,
      count: allData.length,
      page: currentPage,
    };

    return { datatableFunctions, datatable };
  }, [
    allData,
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    data,
    currentPage,
  ]);

  return (
    <>
      <PageBox>
        <div className={styles.headerContainer}>
          <div className={styles.outerFlex}>
            <div>
              <ButtonBase onClick={() => history.goBack()}>
                <ArrowBackIosIcon fontSize={"small"} />
                <span className={"capitalize"}>
                  <b>{Name} Users</b>
                </span>
              </ButtonBase>
              <div className={styles.newLine} />
            </div>
          </div>

          <div className={styles.BtnWrapper}>
            <ButtonBase onClick={handleCreateFed} className={"createBtn"}>
              ADD New
              <Add fontSize={"small"} className={"plusIcon"}></Add>
            </ButtonBase>
          </div>
        </div>

        <div>
          <FilterComponent
            is_progress={isFetching}
            filters={configFilter}
            handleSearchValueChange={handleSearchValueChange}
            handleFilterDataChange={handleFilterDataChange}
          />
          <div>
            <br />
            <div style={{ width: "100%" }}>
              <DataTables
                {...tableData.datatable}
                {...tableData.datatableFunctions}
              />
            </div>
          </div>
        </div>
      </PageBox>
    </>
  );
};

export default CategoryList;
