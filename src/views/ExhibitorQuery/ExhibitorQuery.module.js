import React, { Component, useCallback, useEffect, useMemo } from "react";
import { IconButton, MenuItem, ButtonBase } from "@material-ui/core";
import { useSelector } from "react-redux";
import { ArrowBackIos, Edit, InfoOutlined } from "@material-ui/icons";
import PageBox from "../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../Datatables/Datatable.table";
import Constants from "../../config/constants";
// import FilterComponent from "../../../components/Filter/Filter.component";
// import StatusPill from "../../../components/Status/StatusPill.component";
import useExhibitorQuery from "./ExhiboitorQuery.hook";
// import AppUserCreateView from "../AppUserCreate/AppUserCreate.view";
import { Link } from "react-router-dom";
import RouteName from "../../routes/Route.name";
import { Add } from "@material-ui/icons";
import historyUtils from "../../libs/history.utils";

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
  } = useExhibitorQuery({});

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
        key: "query_from",
        label: "Query From",
        sortable: false,
        render: (value, all) => <div>--</div>,
      },

      {
        key: "email",
        label: "email",
        sortable: false,
        render: (temp, all) => <div>--</div>,
      },
      {
        key: "query_to",
        label: "Query to",
        sortable: false,
        render: (value, all) => <div>--</div>,
      },

      {
        key: "query_on",
        label: "Query On",
        sortable: false,
        render: (temp, all) => <div>--</div>,
      },
      {
        key: "action",
        label: "Action",
        render: (temp, all) => (
          <div>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
            >
              <InfoOutlined fontSize={"small"} />
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
          <div>
            <div className={styles.title}>
            <ArrowBackIos fontSize={"small"} onClick={()=>historyUtils.goBack()} />Exhibitor Query
              </div>
            <div className={styles.newLine} />
          </div>
          <div></div>
        </div>
        <div>      
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
    </div>
  );
};

export default CategoryList;
