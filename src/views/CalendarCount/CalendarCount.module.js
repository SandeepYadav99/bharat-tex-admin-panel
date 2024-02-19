import React, { Component, useCallback, useEffect, useMemo } from "react";
import { IconButton, MenuItem, ButtonBase } from "@material-ui/core";
import { useSelector } from "react-redux";
import PageBox from "../../components/PageBox/PageBox.component";
import { Add, Edit, InfoOutlined } from "@material-ui/icons";
import styles from "./Style.module.css";
import DataTables from "../../Datatables/Datatable.table";
import Constants from "../../config/constants";
import FilterComponent from "../../components/Filter/Filter.component";
// import StatusPill from "../../../components/Status/StatusPill.component";
import StatusPill from "../../components/Status/StatusPill.component";
import { Link } from "react-router-dom";
import useCalendarCount from "./CalendarCount.hook.js";
import RouteName from "../../routes/Route.name";
import historyUtils from "../../libs/history.utils.js";
import { capitalizeFirstLetter } from "../../hooks/CapsLetter.js";
import { ArrowBackIos } from "@material-ui/icons";

const CalendarCount = ({}) => {
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
    handleCreateFed,
  } = useCalendarCount({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.Exhibitor);

  const UpperInfo = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.InfoWrap}>
          <div>Exhibitor List</div>
          <div className={styles.newLine}></div>
        </div>
      );
    }
    return null;
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "session_name",
        label: "Session Name",
        sortable: true,
        render: (value, all) => <div>{all?.eve_name ? all?.eve_name :"--"}</div>,
      },
      {
        key: "session_category",
        label: "Session Category",
        sortable: false,
        render: (temp, all) => <div>{all?.category ? all?.category : "--"}</div>,
      },

      {
        key: "user_count",
        label: "User Count",
        sortable: false,
        render: (temp, all) => <div>{all?.userCount ? all?.userCount : "--"}</div>,
      },
      {
        key: "session_time",
        label: "Session Time",
        sortable: false,
        render: (temp, all) => <div>{all?.date_text ? all?.date_text :"--"}<br/>
        {all?.start_time_text ? all?.start_time_text :"--"}{" "}-{" "}{all?.end_time_text ? all?.end_time_text :"--"}
        </div>,
      },
    ];
  }, [handleViewDetails, handleEdit, isCalling, capitalizeFirstLetter]);

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

  const { user } = useSelector((state) => state?.auth);

  return (
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <ButtonBase
            // onClick={() => historyUtils.goBack()}
            style={{ marginBottom: "20px" }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className={styles.title}>
                  <b>Calendar Count</b>
                </span>
              </div>
              <div className={styles.newLine}></div>
            </div>
          </ButtonBase>
        </div>
        <div>
          <div style={{ width: "80%" }}>
            <FilterComponent
              is_progress={isFetching}
              filters={[]}
              handleSearchValueChange={handleSearchValueChange}
              handleFilterDataChange={handleFilterDataChange}
            />
          </div>
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

export default CalendarCount;
