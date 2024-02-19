import React, { Component, useCallback, useEffect, useMemo } from "react";
import { IconButton, MenuItem, ButtonBase } from "@material-ui/core";
import { useSelector } from "react-redux";
import { ArrowBackIos, Edit, InfoOutlined } from "@material-ui/icons";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import StatusPill from "../../../components/Status/StatusPill.component";
import useCategoryList from "./List.hook";
// import AppUserCreateView from "../AppUserCreate/AppUserCreate.view";
import { Link } from "react-router-dom";
import RouteName from "../../../routes/Route.name";
import { Add } from "@material-ui/icons";
import historyUtils from "../../../libs/history.utils";

const CategoryList = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleSideToggle,
    handleViewDetails,
    editData,
    isSidePanel,
    handleCreate,
    isCalling,
    configFilter,
    warehouses,
    handleToggleSidePannel,
    handleCreatecategory,
  } = useCategoryList({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.category_reducer);

  //   const UpperInfo = useCallback((obj) => {
  //     if (obj) {
  //       return (
  //         <div className={styles.InfoWrap}>
  //           <div>Add Admin Users</div>
  //           <div className={styles.newLine}></div>
  //         </div>
  //       );
  //     }
  //     return null;
  //   }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "category_name",
        label: "Category Name",
        sortable: false,
        render: (value, all) => <div>{all?.name}</div>,
      },

      {
        key: "priority",
        label: "priority",
        sortable: false,
        render: (temp, all) => <div>{all.priority}</div>,
      },
      {
        key: "status",
        label: "status",
        sortable: false,
        render: (temp, all) => <div>{<StatusPill status={all.status} />}</div>,
      },
      {
        key: "action",
        label: "Action",
        render: (temp, all) => (
          <div>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              onClick={() =>
                historyUtils.push(`${RouteName.CATEGORY_EVENT_ADD}` + all?.id)
              }
            >
              <Edit fontSize={"small"} />
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
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <div >
            <div className={styles.title}><ArrowBackIos fontSize={"small"} onClick={()=>historyUtils.goBack()} />Category List</div>
            <div className={styles.newLine} />
          </div>
          <div></div>
          <ButtonBase
            onClick={handleCreatecategory}
            className={styles.createBtn}
          >
            <b>Create</b>
            <Add fontSize={"small"} className={"plusIcon"}></Add>
          </ButtonBase>{" "}
        </div>
        <div>
          {/* <FilterComponent
            is_progress={isFetching}
            filters={configFilter}
            handleSearchValueChange={handleSearchValueChange}
            handleFilterDataChange={handleFilterDataChange}
          /> */}
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
        {/* <SidePanelComponent
          handleToggle={handleToggleSidePannel}
          title={<UpperInfo />}
          open={isSidePanel}
          side={"right"}
        >
          <AppUserCreateView
            handleToggleSidePannel={handleToggleSidePannel}
            isSidePanel={isSidePanel}
            empId={editData}
          />
        </SidePanelComponent> */}
      </PageBox>
    </div>
  );
};

export default CategoryList;
